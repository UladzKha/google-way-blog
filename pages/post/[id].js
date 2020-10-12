import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default function Post({ post }) {
  const myPost = JSON.parse(post);

  const { title, description, date } = myPost;
  return (
    <>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <h3>{date}</h3>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  const post = await db
    .collection("posts")
    .findOne({ _id: ObjectId(params.id) });

  return {
    props: { post: JSON.stringify(post) },
  };
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("posts")
    .find({})
    .sort({ date: -1 })
    // .limit(20)
    .toArray();

  const paths = [];
  posts.map((post) => {
    paths.push({
      params: {
        id: post._id.toString(),
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
}