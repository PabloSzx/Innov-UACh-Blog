import { NextPage } from "next";
import { useQuery, useMutation } from "../src/graphql";
import { useState } from "react";

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
