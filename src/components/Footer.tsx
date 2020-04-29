import { FC, memo, useMemo } from "react";
import { useWindowScroll, useWindowSize } from "react-use";

import { Box, Divider, Flex, Icon, Image, Stack, Text } from "@chakra-ui/core";

const ScrollToTop: FC = () => {
  const { height } = useWindowSize(undefined, 1000);
  const { y } = useWindowScroll();

  const scrollYHalfWindow = y > height / 2;

  const arrowBox = useMemo(() => {
    return (
      <Box
        zIndex={1000}
        borderTopLeftRadius="15px"
        borderTopRightRadius="15px"
        background="#666"
        position="fixed"
        bottom={0}
        right={0}
        cursor="pointer"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <Icon size="40px" color="white" name="arrow-up" />
      </Box>
    );
  }, []);

  return scrollYHalfWindow ? arrowBox : null;
};

export const Footer: FC = memo(() => {
  return (
    <>
      <ScrollToTop />
      <div id="preFooter" />
      <Divider />
      <Stack
        alignSelf="flex-end"
        justifySelf="flex-end"
        marginTop="auto"
        pos="relative"
        bottom={0}
        alignItems="center"
        paddingTop="20px"
      >
        <Flex wrap="wrap" align="center" justify="center">
          <Image
            background="white"
            borderRadius="10px"
            objectFit="contain"
            maxWidth="250px"
            alt="logo_uach"
            src="/logos/logo_uach.jpg"
          />
          <Image
            background="white"
            borderRadius="10px"
            objectFit="contain"
            maxWidth="250px"
            alt="logo_uach"
            src="/logos/logo_info.png"
          />
        </Flex>
        <Flex>
          <Image
            background="white"
            borderRadius="10px"
            objectFit="contain"
            maxWidth="200px"
            alt="logo_uach"
            src="/logos/logo_dacic.png"
          />
          <Image
            background="white"
            borderRadius="10px"
            objectFit="contain"
            maxWidth="200px"
            alt="logo_uach"
            src="/logos/logo_innoving.png"
          />
        </Flex>

        <Stack
          marginTop="20px"
          id="contact_us"
          background="#777"
          borderTopLeftRadius="25px"
          borderTopRightRadius="25px"
          paddingTop="20px"
          paddingLeft="20px"
          paddingRight="20px"
          paddingBottom="5px"
          color="white"
          alignItems="center"
        >
          <Text
            maxWidth={["300px", "350px", "400px", "450px"]}
            textAlign="justify"
          >
            <b>Proyecto PIDU:</b> "Comunidades de práctica como fomento del
            aprendizaje colaborativo y la vinculación con la sociedad de los
            estudiantes de Ingeniería Civil en Informática"
          </Text>
          <Text fontWeight="bold">Contacto</Text>
          <Text>Dr. Cristian Olivares</Text>
          <Flex alignItems="center">
            <Icon name="email" marginRight="10px" />
            <Text fontWeight="bold">
              <a href="mailto: colivares@inf.uach.cl">colivares@inf.uach.cl</a>
            </Text>
          </Flex>

          <Text>Instituto de Informática</Text>
          <Text fontWeight="bold">Universidad Austral de Chile</Text>
        </Stack>
      </Stack>
    </>
  );
});
