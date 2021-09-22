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
import { useTransactions } from "../../providers/TransactionsProvider";
import { FiTrash } from "react-icons/fi";

const TransactionsTableItem = ({ id, value, type, category, date }) => {
  const { remove } = useTransactions();

  const handleRemoveTransaction = () => {
    remove(id);
  };

  return (
    <Tr>
      <Td>{value}</Td>
      <Td>{type}</Td>
      <Td>{category.name}</Td>
      <Td>{new Date(date).toLocaleString()}</Td>
      <Td>
        <Tooltip label="Remove transaction">
          <IconButton
            icon={<Icon as={FiTrash} />}
            onClick={handleRemoveTransaction}
            aria-label="remove transaction"
          />
        </Tooltip>
      </Td>
    </Tr>
  );
};

export const TransactionsTable = ({ transactions }) => {
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Valor</Th>
            <Th>Tipo</Th>
            <Th>Categoria</Th>
            <Th>Data</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.length === 0 ? (
            <Tr>
              <Td colSpan="5" textAlign="center">
                Nenhum item por aqui
              </Td>
            </Tr>
          ) : (
            transactions.map((transaction) => (
              <TransactionsTableItem key={transaction.id} {...transaction} />
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};
