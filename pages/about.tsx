import { Container } from "react-bootstrap";
import Posts from "../models/post";
import initDb from "../helpers/initDb";

export default function About({ posts }) {
  console.log(posts, "posts");
  return (
    <Container>
      <h1>About</h1>
    </Container>
  );
}

export async function getServerSideProps(context) {
  initDb();
  const br = await Posts.find()
    .catch(console.error)
    .then((data) => {
      return JSON.stringify(data);
    });

  return { props: { posts: br } };
}
