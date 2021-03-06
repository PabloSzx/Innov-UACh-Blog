import { FC, memo, useEffect, useState } from "react";
import ProgressiveImage from "react-progressive-image";
import useWindowScroll from "react-use/lib/useWindowScroll";
import useWindowSize from "react-use/lib/useWindowSize";

import {
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/core";

const ScrollToTop: FC = () => {
  const { height } = useWindowSize(undefined, 1000);
  const { y } = useWindowScroll();
  const scrollYHalfWindow = y > height / 2;

  const [show, setShow] = useState(scrollYHalfWindow);

  useEffect(() => {
    if (scrollYHalfWindow) {
      setShow(true);
    } else {
      const hideTimeout = setTimeout(() => {
        setShow(false);
      }, 5000);
      return () => {
        clearTimeout(hideTimeout);
      };
    }
  }, [scrollYHalfWindow]);

  return (
    <Box
      zIndex={1000}
      borderTopLeftRadius="15px"
      borderTopRightRadius="15px"
      background="#666"
      position="fixed"
      bottom={0}
      right={0}
      opacity={scrollYHalfWindow ? 1 : 0}
      hidden={!show}
      transition="opacity 0.5s"
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
};

const LogoImage: FC<{
  src: string;
  alt: string;
  width: string;
  height: string;
}> = ({ src, alt, width, height }) => {
  return (
    <ProgressiveImage src={src} placeholder="">
      {(_src: string, loading: boolean) => {
        return (
          <Skeleton
            borderRadius="15px"
            height={height}
            width={width}
            isLoaded={!loading}
          >
            <Image
              padding="7px"
              background="white"
              borderRadius="10px"
              objectFit="contain"
              maxWidth={width}
              alt={alt}
              src={src}
            />
          </Skeleton>
        );
      }}
    </ProgressiveImage>
  );
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
        pos="relative"
        bottom={0}
        alignItems="center"
        paddingTop="20px"
      >
        <Flex wrap="wrap" paddingBottom="5px" justify="center" align="center">
          <LogoImage
            src="/logos/logo_ingenieria.png"
            alt="Logo Ingeniería"
            width="180px"
            height="80px"
          />

          <LogoImage
            src="/logos/logo_info.png"
            alt="Logo Informática"
            width="210px"
            height="100px"
          />
          <LogoImage
            src="/logos/logo_uach.jpg"
            alt="Logo UACh"
            height="75px"
            width="300px"
          />
          <LogoImage
            src="/logos/logo_dacic.png"
            alt="Logo DACIC"
            height="110px"
            width="140px"
          />

          <LogoImage
            src="/logos/logo_innoving.png"
            alt="Logo InnovING:2030"
            height="110px"
            width="160px"
          />
        </Flex>

        <Text
          maxWidth={["300px", "350px", "400px", "450px"]}
          textAlign="justify"
        >
          <b>Proyecto PIDU:</b> Comunidades de práctica como fomento del
          aprendizaje colaborativo y la vinculación con la sociedad de los
          estudiantes de Ingeniería Civil en Informática
        </Text>
        <Stack
          marginTop="20px"
          marginBottom="10px"
          id="contact_us"
          background="#777"
          borderRadius="25px"
          paddingTop="10px"
          paddingLeft="20px"
          paddingRight="20px"
          paddingBottom="10px"
          color="white"
          alignItems="center"
          textAlign="center"
        >
          <Text fontWeight="bold" fontSize="1.2em">
            Contacto
          </Text>
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
