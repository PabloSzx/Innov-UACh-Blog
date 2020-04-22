import { NextApiHandler } from "next";

const RebuildNext: NextApiHandler = (req, res) => {
  const rebuildHookUrl = process.env.REBUILD_HOOK_URL;
  if (!rebuildHookUrl) {
    res.end("No rebuild hook available");
    return;
  }

  const secretToken = process.env.SECRET_TOKEN;

  const userAuthorizationToken = req.query.secret || req.headers.authorization;

  if (!secretToken || userAuthorizationToken !== secretToken) {
    res.status(403);
    res.end("Unauthorized");
    return;
  }

  res.writeHead(307, {
    Location: rebuildHookUrl,
  });
  res.end();
};

export default RebuildNext;
