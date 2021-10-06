import { ChakraProvider } from "@chakra-ui/react";
import { TransactionsProvider } from "~/providers/TransactionsProvider";
import { CategoriesProvider } from "~/providers/CategoriesProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TransactionsProvider>
        <CategoriesProvider>
          <Component {...pageProps} />
        </CategoriesProvider>
      </TransactionsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
