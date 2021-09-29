import { Flex, Heading } from "@chakra-ui/react";
import { CategoriesTable } from "../components/CategoriesTable";
import { CategoriesAddDrawer } from "../components/CategoriesAddDrawer";
import { useCategories } from "../providers/CategoriesProvider";

import { Layout } from "../components/Layout";

export default function Categories() {
  const { add, categories } = useCategories();

  const handleAddCategory = (data) => {
    add({
      name: data.name,
    });
  };

  return (
    <Layout>
      <Flex>
        <Heading flex="1">Categories</Heading>
        <CategoriesAddDrawer onSubmit={(data) => handleAddCategory(data)} />
      </Flex>
      <CategoriesTable categories={categories} />
    </Layout>
  );
}
