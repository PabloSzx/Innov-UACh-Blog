import { NextPage } from "next";
import Head from "next/head";

import { Heading, Stack, Text } from "@chakra-ui/core";

const CommunityPage: NextPage = () => {
  return (
    <>
      <Head key={1}>
        <title>Community</title>
      </Head>

      <Stack
        margin="15px"
        shouldWrapChildren
        spacing={{ padding: "40px" }}
        fontSize="1.5rem"
        padding="25px"
      >
        <Heading as="h1">Community</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
          lectus mollis, cursus ligula sit amet, varius nibh. Donec posuere
          neque lectus, non tempus dolor sodales a. Nulla facilisi. Fusce quis
          metus sed velit dictum ornare. Curabitur imperdiet, libero sit amet
          vehicula viverra, nulla ex imperdiet lacus, nec pharetra est leo eget
          diam. Vivamus tincidunt blandit ligula non laoreet. Vestibulum a
          fermentum dui. Sed imperdiet tempus nunc a rutrum. Nulla condimentum
          ante vitae accumsan iaculis. In dictum mollis nunc vitae tristique.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text>
          Vivamus lacus libero, viverra ac elementum nec, pharetra ac nulla.
          Donec ac est et ligula tristique varius. Aliquam sed dapibus orci, eu
          accumsan purus. In purus nulla, euismod et nibh eget, viverra aliquam
          eros. Donec facilisis sapien vel ultricies auctor. Donec auctor odio
          ac ultrices semper. Nunc dui ex, sodales eget fermentum ac, lobortis
          in mi. Proin sollicitudin nisi sit amet tortor tristique, ac
          consectetur neque feugiat. Fusce tempor lacinia nisi, non pellentesque
          leo. Nulla finibus dui in quam sodales lobortis. Cras varius
          vestibulum ultrices.
        </Text>
        <Text>
          Nullam ac odio lectus. Nullam sodales a leo non condimentum. Quisque
          non lobortis justo. Aenean lobortis pulvinar tortor id laoreet. Mauris
          in enim ut dui luctus faucibus id ut nisl. Quisque ultricies sodales
          ex, eu tincidunt elit mattis vitae. Vestibulum pulvinar nibh id metus
          iaculis, tempus mollis nulla vehicula. Vivamus tellus nisl, rutrum eu
          rutrum ultrices, tincidunt id nulla. Nulla tincidunt congue elementum.
          Nullam magna magna, tincidunt eget urna ut, sodales semper elit. Fusce
          sed fringilla orci. Etiam pulvinar, turpis et volutpat imperdiet, arcu
          diam posuere enim, sit amet ornare eros ipsum eu arcu.
        </Text>
        <Text>
          Duis semper, diam vitae ultricies tempor, magna felis fermentum leo,
          ac pulvinar libero lectus non nibh. Mauris rutrum turpis sit amet
          venenatis fermentum. Curabitur lacus urna, rhoncus vitae nisi maximus,
          pellentesque tincidunt orci. Mauris condimentum tincidunt aliquam.
          Duis vulputate vitae velit id fringilla. In ut elit turpis. Vestibulum
          interdum commodo turpis, at porta est accumsan id. Vivamus eu ultrices
          lectus. Maecenas pharetra, sapien id elementum bibendum, nunc ligula
          pretium est, a gravida tortor diam id eros. Morbi hendrerit justo
          magna, in bibendum tellus mattis id. Nulla auctor ipsum et congue
          pretium. Quisque convallis elementum eleifend. Maecenas tortor nisl,
          efficitur at aliquet sit amet, tempus ac est.
        </Text>
        <Text>
          In at dui lorem. In neque metus, pretium vitae sodales non, varius sit
          amet neque. Nullam non purus eu mi rhoncus convallis. Vestibulum non
          ipsum vel velit porttitor ultrices. Aenean suscipit vel risus
          elementum euismod. Aliquam tincidunt ac mi fringilla interdum. Integer
          mattis massa ac lacus pharetra, et convallis tellus eleifend. Donec ex
          magna, tincidunt sit amet dui a, ullamcorper maximus purus. Integer
          malesuada augue nulla, ac tincidunt enim egestas sit amet.
        </Text>
      </Stack>
    </>
  );
};

export default CommunityPage;
