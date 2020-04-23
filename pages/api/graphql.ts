import { ApolloServer } from "apollo-server-micro";
import { sign, verify } from "jsonwebtoken";

import { schema } from "../../api-lib/schema";
import { IS_PRODUCTION, ONE_WEEK_SECONDS } from "../../constants";
import GraphiQLHTML from "../../constants/graphiql.html";
import { ADMIN_TOKEN, SECRET_TOKEN } from "../../constants/tokens";

import type {
  PageConfig,
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from "next";

const jwtPayload = { token: ADMIN_TOKEN };

const noTokens = !ADMIN_TOKEN || !SECRET_TOKEN;

if (noTokens) {
  console.warn(
    'PLEASE SPECIFY "ADMIN_TOKEN" AND "SECRET_TOKEN" ENVIRONMENT VARIABLES!'
  );
}

const ipWrongTries: Record<string, number> = {};
const blockedIps = new Set<string>();

const buildContext = ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const checkToken = (token: string) => {
    if (noTokens) return false;

    let ip =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress;

    if (typeof ip !== "string") return false;

    if (blockedIps.has(ip)) {
      return false;
    }

    const isValid = token === ADMIN_TOKEN;

    if (!isValid) {
      let n: number;
      if (ip in ipWrongTries) {
        n = ipWrongTries[ip] += 1;
      } else {
        n = ipWrongTries[ip] = 1;
      }
      if (n > 100) {
        blockedIps.add(ip);
      }
      console.log({
        ipWrongTries,
      });
    }
    return isValid;
  };

  const isAdmin = () => {
    if (noTokens) return false;

    try {
      const userJWTToken =
        req.headers.authorization || req.cookies.authorization;

      if (!userJWTToken) return false;

      const userToken = verify(userJWTToken, SECRET_TOKEN, {
        ignoreExpiration: !IS_PRODUCTION,
      }) as typeof jwtPayload;

      return userToken.token === ADMIN_TOKEN;
    } catch (err) {
      return false;
    }
  };

  const loginOrRefresh = () => {
    if (noTokens) return;

    res.setHeader(
      "Set-Cookie",
      `authorization=${sign(jwtPayload, SECRET_TOKEN, {
        expiresIn: "7d",
      })}; HttpOnly; ${
        IS_PRODUCTION ? "Secure;" : ""
      } SameSite=Strict; Max-Age=${ONE_WEEK_SECONDS}`
    );
  };
  const logout = () => {
    res.setHeader("Set-Cookie", "authorization=; Max-Age=-1");
  };
  return { loginOrRefresh, logout, isAdmin, checkToken };
};

declare global {
  interface NexusGen {
    context: ReturnType<typeof buildContext>;
  }
}

const graphiql = false;

const server = new ApolloServer({
  schema,
  introspection: !IS_PRODUCTION,
  playground: !IS_PRODUCTION && {
    settings: {
      "request.credentials": "same-origin",
      "editor.theme": "dark",
    },
  },
  tracing: !IS_PRODUCTION,
  context: buildContext,
});

const apolloServerHandler = server.createHandler({
  path: "/api/graphql",
});

const apiHandler: NextApiHandler = (req, res) => {
  if (!IS_PRODUCTION && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.end(GraphiQLHTML);
  } else {
    return apolloServerHandler(req, res);
  }
};

export default graphiql ? apiHandler : apolloServerHandler;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
