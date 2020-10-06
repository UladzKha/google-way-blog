import { Container } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";

export default function About({ text }) {
  console.log(text, "posts");
  return (
    <Container>
      <h1>About</h1>
    </Container>
  );
}


export async function getStaticProps(context) {
  const { db } = await connectToDatabase();

  const text = await db
    .collection("about")
    .find({})
    .sort({ metacritics: -1 })
    // .limit(20)
    .toArray();

  return { props: { text: JSON.stringify(text) } };
}
