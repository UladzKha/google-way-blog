import { Container, Image } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";

export default function About({ text }: { text: string }) {
  const about = JSON.parse(text);
  const {
    0: { body, facebook, github, linkedin, stackoverflow },
  } = about;

  return (
    <Container>
      <div style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>
        About me
      </div>
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
      <Image src="./uladz_about.jpg" fluid />
      <h2 style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        You can find me on social networks:
      </h2>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <a href={linkedin} target="blank">
          <Image
            src="./linkedin.png"
            alt="linkedin"
            style={{ width: 40, marginRight: 10, cursor: "pointer" }}
          />
        </a>
        <a href={facebook} target="blank">
          <Image
            src="./facebook.png"
            alt="facebook"
            style={{ width: 40, marginRight: 10, cursor: "pointer" }}
          />
        </a>
        <a href={github} target="blank">
          <Image
            src="./github.png"
            alt="github"
            style={{ width: 40, marginRight: 10, cursor: "pointer" }}
          />
        </a>
        <a href={stackoverflow} target="blank">
          <Image
            src="./stack-overflow.png"
            alt="linkedin"
            style={{ width: 40, cursor: "pointer" }}
          />
        </a>
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
