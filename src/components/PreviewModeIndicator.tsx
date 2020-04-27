import { Icon, Text, Flex } from "@chakra-ui/core";

export default () => {
  return (
    <Flex
      pos="absolute"
      right="5px"
      top="5px"
      direction="column"
      align="center"
      border="1px solid black"
      borderRadius="10px"
      padding="5px"
      userSelect="none"
      background="white"
      zIndex={100}
      title="Click to stop Preview Mode"
      cursor="pointer"
      onClick={() => {
        fetch("/api/preview?clear=1").then(() => {
          location.reload();
        });
      }}
    >
      <Icon name="view" size="30px" />
      <Text fontSize="10px">Preview Mode</Text>
    </Flex>
  );
};
