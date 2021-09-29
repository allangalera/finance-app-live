import { Flex, Text } from "@chakra-ui/react";

export const Footer = () => {
  const currentDate = new Date();
  return (
    <footer>
      <Flex justifyContent="center" p={4}>
        <Text>@{currentDate.getFullYear()} Allan Galera</Text>
      </Flex>
    </footer>
  );
};
