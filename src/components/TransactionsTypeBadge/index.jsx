import { Badge } from "@chakra-ui/react";
import { TRANSACTION_TYPES } from "src/constants";
export const TransactionsTypeBadge = ({ type }) => {
  if (type === TRANSACTION_TYPES.INCOME)
    return <Badge colorScheme="green">{TRANSACTION_TYPES.INCOME}</Badge>;
  if (type === TRANSACTION_TYPES.EXPENSE)
    return <Badge colorScheme="red">{TRANSACTION_TYPES.EXPENSE}</Badge>;

  return <Badge>{type}</Badge>;
};
