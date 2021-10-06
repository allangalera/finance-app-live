import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { TransactionsProvider } from "../providers/TransactionsProvider";
import { CategoriesProvider } from "../providers/CategoriesProvider";

const Providers = ({ children }) => {
  return (
    <ChakraProvider>
      <TransactionsProvider>
        <CategoriesProvider>{children}</CategoriesProvider>
      </TransactionsProvider>
    </ChakraProvider>
  );
};

export const renderWithProviders = (component) => {
  return render(component, { wrapper: Providers });
};
