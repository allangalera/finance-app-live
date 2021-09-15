import {
  Input,
  Switch,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  Button,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const CATEGORIES = [
  {
    id: "housing",
    name: "Housing",
  },
  {
    id: "transportation",
    name: "Transportation",
  },
  {
    id: "food",
    name: "Food",
  },
  {
    id: "utilities",
    name: "Utilities",
  },
];

export default function Home() {
  const [currentDate, currentTime] = new Date().toLocaleString().split(" ");
  const [currentDay, currentMonth, currentYear] = currentDate.split("/");
  const [currentHour, currentMinutes, currentSeconds] = currentTime.split(":");

  const defaultDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const defaultTime = `${currentHour}:${currentMinutes}`;

  const selectRef = useRef();

  const [transactionValue, setTransactionValue] = useState();
  const [transactionType, setTransactionType] = useState();
  const [transactionCategory, setTransactionCategory] = useState();
  const [transactionDate, setTransactionDate] = useState(defaultDate);
  const [transactionTime, setTransactionTime] = useState(defaultTime);
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = () => {
    console.log("handleAddTransaction");
    const selectedCategory = CATEGORIES.find(
      (item) => item.id === transactionCategory
    );

    const selectedDatetime = new Date(
      `${transactionDate}T${transactionTime}:00`
    );

    setTransactions((oldState) => [
      ...oldState,
      {
        value: transactionValue,
        type: transactionType ? "income" : "expense",
        category: selectedCategory,
        date: selectedDatetime.toISOString(),
      },
    ]);
    setTransactionType(false);
    setTransactionValue("");
    setTransactionDate(defaultDate);
    setTransactionTime(defaultTime);
    selectRef.current.value = "";
  };

  return (
    <div>
      <VStack spacing={4}>
        <FormControl id="value">
          <FormLabel>Value</FormLabel>
          <Input
            type="text"
            onChange={(e) => setTransactionValue(e.target.value)}
            value={transactionValue}
          />
          <FormHelperText>Type the value of your transaction.</FormHelperText>
        </FormControl>
        <FormControl id="date">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            onChange={(e) => setTransactionDate(e.target.value)}
            value={transactionDate}
          />
        </FormControl>
        <FormControl id="time">
          <FormLabel>Time</FormLabel>
          <Input
            type="time"
            onChange={(e) => setTransactionTime(e.target.value)}
            value={transactionTime}
          />
        </FormControl>
        <Select
          ref={selectRef}
          placeholder="Select a category"
          onChange={(e) => setTransactionCategory(e.target.value)}
        >
          {CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="type" mb="0">
            é entrada?
          </FormLabel>
          <Switch
            id="type"
            size="lg"
            isChecked={transactionType}
            onChange={(e) => setTransactionType(e.target.checked)}
          />
        </FormControl>
        <Button onClick={handleAddTransaction}>Add</Button>
      </VStack>
      {transactions.map((item, index) => (
        <div key={index}>
          {item.value} - {item.type} - {item.category.name} -{" "}
          {new Date(item.date).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
