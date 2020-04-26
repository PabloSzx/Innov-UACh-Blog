import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

import { useMutation, useQuery } from "../graphql";

declare global {
  interface gqlessHooksPool {
    currentUser: {
      data: boolean;
    };
  }
}

let redirectPath: string | undefined;

let NProgressStarted = false;

export const useAdminAuth = ({
  requireAdmin,
  redirectOnSuccess,
}: { requireAdmin?: boolean; redirectOnSuccess?: boolean } = {}) => {
  const { asPath, push } = useRouter();

  const [{ data: isAdmin, fetchState: currentUserState }] = useQuery(
    ({ currentUser }) => currentUser,
    {
      sharedCacheId: "currentUser",
      hookId: "currentUser",
    }
  );

  const isCurrentUserLoading =
    (redirectOnSuccess && isAdmin) || (requireAdmin && !isAdmin)
      ? true
      : currentUserState === "loading";

  useEffect(() => {
    if (isCurrentUserLoading) {
      NProgressStarted = true;
      NProgress.start();
    } else {
      if (NProgressStarted) {
        NProgress.done();
        NProgressStarted = false;
      }
    }
  }, [isCurrentUserLoading]);

  useIsomorphicLayoutEffect(() => {
    if (currentUserState === "done") {
      if (!isAdmin && requireAdmin) {
        redirectPath = asPath;
        push("/admin/login");
      } else if (isAdmin && redirectOnSuccess) {
        push(redirectPath || "/admin");
      }
    }
  }, [currentUserState, isAdmin, requireAdmin, redirectOnSuccess]);

  const [logout] = useMutation(({ logout }) => logout, {
    onCompleted(_, hooksPool) {
      hooksPool.currentUser?.refetch?.();
    },
  });

  return {
    isAdmin,
    isCurrentUserLoading,
    logout,
  };
};
