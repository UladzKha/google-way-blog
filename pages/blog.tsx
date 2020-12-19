import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";
import Post from "../models/Post";

interface BlogProps {
  posts: string;
}

function renderPosts(posts: Array<Post>) {
  const options: Object = {
    // weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return (
    <div className="container">
      <div className="blog__title">Articles</div>
      {posts.map(({ _id, title, date }) => (
        <div key={_id} className="blog__item">
          <div className="blog__publish_date">
            {new Date(date).toLocaleDateString("En-en", options)}
          </div>
          <div>
            <div className="blog__article__container">
              <Link href="/post/[id]" as={`/post/${_id}`}>
                <a>
                  <div className="blog__article__title">{title}</div></a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function About({ posts }: BlogProps) {
  const myPosts: Array<Post> = JSON.parse(posts);

  return <div className="container">{renderPosts(myPosts)}</div>;
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
