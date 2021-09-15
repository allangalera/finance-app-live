import { Flex, Box } from "@chakra-ui/react";

import { Header } from "../Header";
import { Footer } from "../Footer";

export const Layout = ({ children }) => {
  return (
    <Flex flexDir="column" height="100vh">
      <Header />
      <Box flex="1" p={4}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};
