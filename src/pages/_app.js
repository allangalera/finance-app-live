import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { TransactionsProvider } from "../providers/TransactionsProvider";
import { CategoriesProvider } from "../providers/CategoriesProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TransactionsProvider>
        <CategoriesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CategoriesProvider>
      </TransactionsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
