import { NextApiHandler } from "next";
import { REBUILD_HOOK_URL, ADMIN_TOKEN } from "../../constants/tokens";

const RebuildNext: NextApiHandler = (req, res) => {
  if (!REBUILD_HOOK_URL) {
    res.end("No rebuild hook available");
    return;
  }

  const userAuthorizationToken = req.query.secret || req.headers.authorization;

  if (!ADMIN_TOKEN) {
    res.end("No ADMIN_TOKEN specified!");
    return;
  }

  if (userAuthorizationToken !== ADMIN_TOKEN) {
    res.status(403);
    res.end("Unauthorized");
    return;
  }

  res.writeHead(307, {
    Location: REBUILD_HOOK_URL,
  });
  res.end();
};

export default RebuildNext;
