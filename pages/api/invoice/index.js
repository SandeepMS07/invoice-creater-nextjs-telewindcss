import dbConnect from "../../../util/mongo";
import invoice from "../models/invoice";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();
  if (method === "GET") {
    try {
      const detail = await invoice.find();
      res.status(200).json(detail);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else if (method === "POST") {
    try {
        const detail = await invoice.create(req.body);
        res.status(201).json(detail);
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
  }
};
export default handler;
