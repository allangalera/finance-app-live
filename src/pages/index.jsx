import { Heading, Flex } from "@chakra-ui/react";
import { TransactionsTable } from "../components/TransactionsTable";
import { TransactionAddDrawer } from "../components/TransactionAddDrawer";
import { Layout } from "../components/Layout";
import { useTransactions } from "../providers/TransactionsProvider";
import { useCategories } from "../providers/CategoriesProvider";

export default function Home() {
  const { transactions, add } = useTransactions();
  const { categories } = useCategories();

  const handleAddTransaction = (data) => {
    const selectedCategory = categories.find(
      (item) => item.id === data.category
    );

    const selectedDatetime = new Date(`${data.date}T${data.time}:00`);

    const parsedValue = parseFloat(
      data.value.replace("R$", "").replace(/\s/g, "").replace(",", "."),
      10
    );

    add({
      value: parsedValue,
      type: data.type,
      category: selectedCategory,
      date: selectedDatetime.toISOString(),
    });
  };

  return (
    <Layout>
      <Flex>
        <Heading flex="1">Transactions</Heading>
        <TransactionAddDrawer
          addTransaction={(data) => handleAddTransaction(data)}
        />
      </Flex>
      <TransactionsTable transactions={transactions} />
    </Layout>
  );
}
