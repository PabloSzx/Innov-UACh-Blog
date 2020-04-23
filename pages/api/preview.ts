import { NextApiHandler } from "next";

import { PREVIEW_TOKEN } from "../../constants/tokens";

const PreviewRoute: NextApiHandler = (req, res) => {
  const userAuthorizationToken = req.query.secret || req.headers.authorization;

  if (!PREVIEW_TOKEN) {
    res.end("No PREVIEW_TOKEN specified!");
    return;
  }

  if (userAuthorizationToken !== PREVIEW_TOKEN) {
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
