import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("posts")
    .find({})
    .sort({ metacritics: -1 })
    // .limit(20)
    .toArray();

  res.json(posts);
  // res.statusCode = 200;
  // res.json({ name: "John Doe" });
};
