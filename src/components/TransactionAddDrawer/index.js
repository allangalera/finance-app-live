import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "../../providers/CategoriesProvider";

export const TransactionAddDrawer = ({ addTransaction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useCategories();
  const { register, reset, getValues } = useForm();
  const btnRef = useRef();

  useEffect(() => {
    const [currentDate, currentTime] = new Date().toLocaleString().split(" ");
    const [currentDay, currentMonth, currentYear] = currentDate.split("/");
    const [currentHour, currentMinutes, currentSeconds] =
      currentTime.split(":");
    reset({
      value: "",
      date: `${currentYear}-${currentMonth}-${currentDay}`,
      time: `${currentHour}:${currentMinutes}`,
      category: "",
      type: "",
    });
  }, [isOpen]);

  const onSubmit = () => {
    const formData = getValues();
    addTransaction(formData);
    onClose();
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        add
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4}>
              <FormControl id="value">
                <FormLabel>Value</FormLabel>
                <Input type="text" {...register("value")} />
                <FormHelperText>
                  Type the value of your transaction.
                </FormHelperText>
              </FormControl>
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input type="date" {...register("date")} />
              </FormControl>
              <FormControl id="time">
                <FormLabel>Time</FormLabel>
                <Input type="time" {...register("time")} />
              </FormControl>
              <Select placeholder="Select a category" {...register("category")}>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Selecione o tipo de transação"
                {...register("type")}
              >
                <option value="income">income</option>
                <option value="expense">expense</option>
              </Select>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} colorScheme="green">
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
