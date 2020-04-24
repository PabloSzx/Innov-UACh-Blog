import { NextPage } from "next";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "../src/graphql";

declare global {
  interface gqlessHooksPool {
    currentUser: {
      data: boolean;
    };
  }
}

const AdminPage: NextPage = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const [{ data: isAdmin, fetchState: currentUserState }] = useQuery(
    ({ currentUser }) => currentUser,
    {
      hookId: "currentUser",
    }
  );

  const [logout] = useMutation(({ logout }) => logout, {
    onCompleted(_, hooksPool) {
      hooksPool.currentUser?.refetch?.();
    },
  });

  const [blogsPaginated, { callback, fetchMore }] = useQuery(
    ({ blogList }, { skip, limit }) => {
      const {
        nodes,
        pageInfo: { hasNextPage },
      } = blogList({
        pagination: {
          skip,
          limit,
        },
      });

      return {
        nodes: nodes.map(({ _id, title, urlSlug, createdAt, updatedAt }) => {
          return {
            _id,
            title,
            urlSlug,
            createdAt,
            updatedAt,
          };
        }),
        hasNextPage,
      };
    },
    {
      variables: {
        skip: 0,
        limit: 1,
      },
      lazy: true,
      pollInterval: 0,
    }
  );

  useEffect(() => {
    if (blogsPaginated.data?.hasNextPage) {
      fetchMore({
        notifyLoading: false,
        variables: {
          skip: blogsPaginated?.data?.nodes.length,
        },
        updateQuery(previousResult, fetchMoreResult) {
          if (!fetchMoreResult) return previousResult;
          return {
            hasNextPage: fetchMoreResult.hasNextPage,
            nodes: [
              ...(previousResult?.nodes ?? []),
              ...fetchMoreResult.nodes,
            ].sort((a, b) => {
              return a.createdAt > b.createdAt ? 1 : -1;
            }),
          };
        },
      });
    }
  }, [blogsPaginated.data]);

  useEffect(() => {
    if (isAdmin) {
      callback();
    }
  }, [isAdmin]);

  const [login, { fetchState: loginState }] = useMutation(
    ({ login }, { token }) => {
      return login({
        token,
      });
    },
    {
      variables: {
        token,
      },

      onCompleted(goodLogin, hooksPool) {
        if (goodLogin) {
          hooksPool.currentUser?.refetch?.();
          setMessage("");
        } else {
          setMessage("Wrong token");
          setToken("");
        }
      },
    }
  );

  if (currentUserState === "loading") return <p>Loading...</p>;

  if (isAdmin) {
    return (
      <div>
        <p style={{ whiteSpace: "pre" }}>
          {JSON.stringify(blogsPaginated, null, 4)}
        </p>
        hello admin
        <br />
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="password"
        onChange={({ target: { value } }) => {
          setMessage("");
          setToken(value);
        }}
        value={token}
      />

      <button disabled={token.length < 20} onClick={() => login()}>
        Check token
      </button>

      {loginState === "loading" ? <p>Authenticating...</p> : null}

      {message ? <p>{message}</p> : null}
    </div>
  );
};

export default AdminPage;
