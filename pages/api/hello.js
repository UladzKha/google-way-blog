// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initDb from "../../helpers/initDb";
import Product from "../../models/product";
import Posts from '../../models/post';

initDb();

export default (req, res) => {
  Posts.find().then((products) => {
    res.status(200).json(products);
  });
};
