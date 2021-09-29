import {
  Flex,
  Heading,
  Icon,
  useColorMode,
  IconButton,
  Box,
  Button,
} from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const currentIcon = colorMode === "light" ? FiMoon : FiSun;
  return (
    <header>
      <Flex justifyContent="center" p={4}>
        <Box flex="1">
          <Heading>Finance App</Heading>
        </Box>
        <Box>
          <IconButton
            icon={<Icon as={currentIcon} />}
            onClick={toggleColorMode}
            aria-label="toggle color mode"
          />
        </Box>
      </Flex>
    </header>
  );
};
