import { Container, Image } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";

export default function About({ text }) {
  const about = JSON.parse(text);
  const {
    0: { body },
  } = about;

  return (
    <Container>
      <div style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>
        About me
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: aaa[0].body }} /> */}
      <div
        style={{
          marginTop: 15,
          fontWeight: "bolder",
          fontSize: 25,
          color: "grey",
          marginBottom: 10,
        }}
      >
        {body}
      </div>
      <Image src="./uladz_about.jpg" />
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <Image
          src="./linkedin.png"
          alt="linkedin"
          style={{ width: 50, marginRight: 10 }}
        />
        <Image
          src="./facebook.png"
          alt="facebook"
          style={{ width: 50, marginRight: 10 }}
        />
        <Image
          src="./github.png"
          alt="github"
          style={{ width: 50, marginRight: 10 }}
        />
        <Image
          src="./stack-overflow.png"
          alt="linkedin"
          style={{ width: 50 }}
        />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const text = await db
    .collection("about")
    .find({})
    .sort({ metacritics: -1 })
    // .limit(20)
    .toArray();

  return { props: { text: JSON.stringify(text) } };
}
