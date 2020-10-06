import { Container } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";

export default function About({ posts }) {
  console.log(posts, "posts");
  return (
    <Container>
      <h1>BLOG</h1>
    </Container>
  );
}

export async function getStaticProps(context) {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("posts")
    .find({})
    .sort({ metacritics: -1 })
    // .limit(20)
    .toArray();

  return { props: { posts: JSON.stringify(posts) } };
}
