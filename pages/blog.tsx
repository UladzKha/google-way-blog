import Link from "next/link";
import { Container } from "react-bootstrap";
import { connectToDatabase } from "../util/mongodb";

function renderPosts(posts) {
  console.log(posts, "POSTS");

  return posts.map(({ _id, title, description, date }) => (
    <div key={_id}>
      <Link href="/post/[id]" as={`/post/${_id}`}>
        <a>{title}</a>
      </Link>
      <h2>{description}</h2>
      <h3>{date}</h3>
    </div>
  ));
}

export default function About({ posts }) {
  const myPosts = JSON.parse(posts);

  // console.log(myPosts, "posts");
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
