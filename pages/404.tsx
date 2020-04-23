import { useRouter } from "next/router";
import { useEffect } from "react";

export default () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/");
  }, []);

  return null;
};
