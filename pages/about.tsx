import { Container } from "react-bootstrap";
import Posts from '../models/post';

export default function About({ posts }) {
  console.log(posts, "posts");
  return (
    <Container>
      <h1>About</h1>
    </Container>
  );
}

export async function getStaticProps() {
  let br = await Posts.find().then(data => {
    return JSON.stringify(data)
  });

  return{
    props:{
      posts: br
    }
  }
}
