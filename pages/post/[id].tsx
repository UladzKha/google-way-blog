import { ObjectId } from "mongodb";
import { Container } from "react-bootstrap";
import { connectToDatabase } from "../../util/mongodb";
import POST from "../../models/Post";

export default function Post({ post }) {
  const myPost: POST = JSON.parse(post);
  const { title, description, date } = myPost;
  const options: Object = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <h5>{new Date(date).toLocaleDateString("En-en", options)}</h5>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  const post: POST = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(params.id) });

  return {
    props: { post: JSON.stringify(post) },
  };
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase();

  const ids: Array<string> = await db.collection("posts").distinct("_id", {});

  const paths: Array<Object> = [];
  ids.map((post) => {
    paths.push({
      params: {
        id: post.toString(),
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
}
