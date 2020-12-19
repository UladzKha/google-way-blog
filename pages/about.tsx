import { connectToDatabase } from "../util/mongodb";

interface AboutProps {
  text: string;
}

export default function About({ text }: AboutProps) {
  const about = JSON.parse(text);
  const {
    0: { body, facebook, github, linkedin, stackoverflow },
  } = about;

  return (
    <div className="container">
      <div className="about__title">About me</div>
      <div className="about__body">{body}</div>
      <img src="./uladz_about.jpg" className="about__image" />
      <div className="about__social-networks-text">
        You can find me on social networks:
      </div>
      <div className="about__social-networks-icons">
        <a href={linkedin} target="blank">
          <img
            src="./linkedin.png"
            alt="linkedin"
            className="about__social-networks-icon"
          />
        </a>
        <a href={facebook} target="blank">
          <img
            src="./facebook.png"
            alt="facebook"
            className="about__social-networks-icon"
          />
        </a>
        <a href={github} target="blank">
          <img
            src="./github.png"
            alt="github"
            className="about__social-networks-icon"
          />
        </a>
        <a href={stackoverflow} target="blank">
          <img
            src="./stack-overflow.png"
            alt="linkedin"
            className="about__social-networks-icon"
          />
        </a>
      </div>
    </div>
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
