import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";

function renderPosts(posts) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Container>
      {posts.map(({ _id, title, description, date }) => (
        <div key={_id}>
          <div dangerouslySetInnerHTML={{ __html: title }} />
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <h5>{new Date(date).toLocaleDateString("En-en", options)}</h5>
          <Link href="/post/[id]" as={`/post/${_id}`}>
            <Button variant="success">Read more ..</Button>
          </Link>
        </div>
      ))}
    </Container>
  );
}

export default function About({ posts }) {
  const myPosts = JSON.parse(posts);

  return <Container>{renderPosts(myPosts)}</Container>;
}

export async function getStaticProps(context) {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("posts")
    .find({})
    .sort({ date: -1 })
    // .limit(20)
    .toArray();

  return { props: { posts: JSON.stringify(posts) } };
}
