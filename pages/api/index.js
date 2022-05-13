const handler = async (req, res) => {
  const { method } = req;
  try {
    const detail = await req.query;
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default handler;
