import { useRouter } from "next/router";
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
    isCurrentUserLoading:
      (redirectOnSuccess && isAdmin) || (requireAdmin && !isAdmin)
        ? true
        : currentUserState === "loading",
    logout,
  };
};
