import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";
import Post from "../models/Post";

function renderPosts(posts: Array<Post>) {
  const options: Object = {
    // weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return (
    <Container>
      <div style={{ fontSize: 30, fontWeight: "bold", marginTop:20 }}>Articles</div>
      {posts.map(({ _id, title, description, date }) => (
        <Row key={_id}>
          <Col
            xs={1}
            style={{
              marginTop: 25,
              fontWeight: "bolder",
              fontSize: 15,
              color: "grey",
            }}
          >
            {new Date(date).toLocaleDateString("En-en", options)}
          </Col>
          <Col xs={10}>
            <div style={{ marginTop: 20 }}>
              <Link href="/post/[id]" as={`/post/${_id}`}>
                <a
                  style={{ color: "black", fontSize: 20, fontWeight: "bolder" }}
                >
                  {title}
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default function About({ posts }) {
  const myPosts: Array<Post> = JSON.parse(posts);

  return <Container>{renderPosts(myPosts)}</Container>;
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const posts: Array<Post> = await db
    .collection("posts")
    .find({})
    .sort({ date: -1 })
    // .limit(20)
    .toArray();

  return { props: { posts: JSON.stringify(posts) } };
}
