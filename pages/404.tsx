import { useRouter } from "next/router";
import { useEffect } from "react";

import { Spinner } from "@chakra-ui/core";

export default () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/");
  }, []);

  return <Spinner size="xl" margin="50px" />;
};
