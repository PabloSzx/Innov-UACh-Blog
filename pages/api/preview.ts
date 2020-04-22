import { NextApiHandler } from "next";

const PreviewRoute: NextApiHandler = (req, res) => {
  const secretToken = process.env.PREVIEW_TOKEN;

  const userAuthorizationToken = req.query.secret || req.headers.authorization;

  if (!secretToken || userAuthorizationToken !== secretToken) {
    res.status(403);
    res.end("Unauthorized");
    return;
  }

  if (req.cookies.__prerender_bypass) {
    res.setPreviewData("");
    res.end("Preview mode was already active!");
  } else {
    res.setPreviewData("");
    res.end("Preview mode activated!");
  }
};

export default PreviewRoute;
