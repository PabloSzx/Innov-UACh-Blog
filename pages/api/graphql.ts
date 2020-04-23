import { ApolloServer } from "apollo-server-micro";

import { schema } from "../../api-lib/schema";
import {
  ADMIN_TOKEN,
  IS_PRODUCTION,
  ONE_WEEK_SECONDS,
  SECRET_TOKEN,
} from "../../constants";
import { sign, verify } from "jsonwebtoken";
import type { PageConfig, NextApiRequest, NextApiResponse } from "next";

const jwtPayload = { token: ADMIN_TOKEN };

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
    res.setHeader("Set-Cookie", `authorization=; Max-Age=-1`);
  };
  return { loginOrRefresh, logout, isAdmin, checkToken };
};

declare global {
  interface NexusGen {
    context: ReturnType<typeof buildContext>;
  }
}

const server = new ApolloServer({
  schema,
  introspection: !IS_PRODUCTION,
  playground: IS_PRODUCTION
    ? false
    : {
        settings: {
          "request.credentials": "same-origin",
          "editor.theme": "dark",
        },
      },
  tracing: !IS_PRODUCTION,
  context: buildContext,
});

export default server.createHandler({
  path: "/api/graphql",
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
