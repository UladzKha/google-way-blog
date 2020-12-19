import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";
import Post from "../models/Post";
import Project from "../models/Project";
import Link from "next/link";

interface HomeProps {
  posts: string;
  projects: string;
}

function renderLatestPosts(laterPosts: Array<Post>): Array<JSX.Element> {
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

function renderProjects(projects: Array<Project>): Array<JSX.Element> {
  return projects.map(({ _id, name, url }) => (
    <div style={{ marginTop: 20 }} key={_id}>
      <Link href={url}>
        <a
          target="_blank"
          style={{ color: "brown", fontSize: 20, fontWeight: "bolder" }}
        >
          <div>{name}</div>
        </a>
      </Link>
    </div>
  ));
}

export default function Home({ posts, projects }: HomeProps) {
  const latestPosts: Array<Post> = JSON.parse(posts);
  const projectsArr: Array<Project> = JSON.parse(projects);

  return (
    <Container>
      <Row style={{ marginTop: 50 }}>
        <Col xs={2}>
          <Image style={{ width: "100%" }} src="./uladz.png" />
        </Col>
        <Col xs={10}>
          <div
            style={{ fontSize: 30, fontWeight: "bold" }}
            data-testid="hello-test"
          >
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
      {renderProjects(projectsArr)}
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

  const projects: Array<Project> = await db
    .collection("projects")
    .find({})
    .sort({ date: -1 })
    .limit(10)
    .toArray();

  return {
    props: {
      posts: JSON.stringify(posts),
      projects: JSON.stringify(projects),
    },
  };
}
