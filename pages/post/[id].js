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

export async function getServerSideProps({ params, query }) {
  console.log(query);
  const { db } = await connectToDatabase();

  const post = await db
    .collection("posts")
    .findOne({ _id: ObjectId(query.id) });

  return {
    props: { post: JSON.stringify(post) },
  };
}
