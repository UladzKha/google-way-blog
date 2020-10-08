import { Container } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";

export default function About({ text }) {
  const aaa = JSON.parse(text);
  console.log(aaa[0].body);
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: aaa[0].body }} />
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
