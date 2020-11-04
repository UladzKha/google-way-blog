import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";
import Post from "../models/Post";
import Link from "next/link";

function renderLatestPosts(laterPosts: Array<Post>) {
  console.log(laterPosts, "POSTS");
  return laterPosts.map(({ _id, title }) => (
    <div key={_id} style={{ marginTop: 20 }}>
      <Link href="/post/[id]" as={`/post/${_id}`}>
        <a style={{ color: "green", fontSize: 20, fontWeight: "bolder" }}>
          {title}
        </a>
      </Link>
    </div>
  ));
}

export default function Home({ posts }) {
  const latestPosts: Array<Post> = JSON.parse(posts);

  return (
    <Container>
      <h1>Hello</h1>
      <Row style={{ marginTop: 50 }}>
        <Col xs={2}>
          <Image style={{ width: "100%" }} src="./uladz.png" />
        </Col>
        <Col xs={10}>
          <div style={{ fontSize: 30, fontWeight: "bold" }}>
            Hello! I'm Uladz.
          </div>
          <div style={{ fontSize: 20 }}>
            I'm a software engineer. This website is my digital sandbox - a
            compedium of the tutorials, articles, and other things I want to
            share to world.
          </div>
        </Col>
      </Row>
      <hr />
      <div style={{ display: "flex", marginTop: 50 }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Latest Articles</div>
        <div style={{ marginLeft: 50, marginTop: 5 }}>
          <Link href="/blog">
            <Button variant="success">View all</Button>
          </Link>
        </div>
      </div>
      {renderLatestPosts(latestPosts)}
      <hr />
      <div style={{ fontSize: 30, fontWeight: "bold", marginTop: 50 }}>
        Projects
      </div>
      {/* {renderProjects(latestPosts)} */}
      <hr />
    </Container>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const posts: Array<Post> = await db
    .collection("posts")
    .find({})
    .sort({ date: -1 })
    .limit(10)
    .toArray();
  return { props: { posts: JSON.stringify(posts) } };
}
