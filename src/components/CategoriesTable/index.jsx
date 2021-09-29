import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { useCategories } from "../../providers/CategoriesProvider";
import { FiTrash } from "react-icons/fi";

const CategoriesTableItem = ({ id, name, fixed }) => {
  const { remove } = useCategories();

  const handleRemove = () => {
    remove(id);
  };

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        {fixed ? null : (
          <Tooltip label="Remove category">
            <IconButton
              icon={<Icon as={FiTrash} />}
              onClick={handleRemove}
              aria-label="remove category"
            />
          </Tooltip>
        )}
      </Td>
    </Tr>
  );
};

export const CategoriesTable = ({ categories }) => {
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th w="full">Name</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.length === 0 ? (
            <Tr>
              <Td colSpan="2" textAlign="center">
                Nenhum item por aqui
              </Td>
            </Tr>
          ) : (
            categories.map((category) => (
              <CategoriesTableItem key={category.id} {...category} />
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};
