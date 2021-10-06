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
import NumberFormat from "react-number-format";
import { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategories } from "~/providers/CategoriesProvider";
import { TRANSACTION_TYPES } from "~/constants";

export const TransactionAddDrawer = ({ addTransaction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useCategories();
  const schema = yup
    .object({
      value: yup.string().required(),
      date: yup
        .string()
        .matches(/\d{4}-\d{2}-\d{2}/)
        .required(),
      time: yup
        .string()
        .matches(/\d{2}:\d{2}/)
        .required(),
      category: yup
        .mixed()
        .oneOf(categories.map((item) => item.id))
        .required(),
      type: yup.mixed().oneOf(Object.values(TRANSACTION_TYPES)).required(),
    })
    .required();
  const { register, reset, getValues, control, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSubmit = () => {
    if (!formState.isValid) return;
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
          <DrawerHeader>Add a transaction</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4}>
              <FormControl id="value">
                <FormLabel>Value</FormLabel>
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <NumberFormat
                      {...field}
                      prefix="R$"
                      thousandSeparator=" "
                      customInput={Input}
                      decimalSeparator=","
                      decimalScale={2}
                    />
                  )}
                />
              </FormControl>
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input type="date" {...register("date")} />
              </FormControl>
              <FormControl id="time">
                <FormLabel>Time</FormLabel>
                <Input type="time" {...register("time")} />
              </FormControl>
              <FormControl id="category">
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select a category"
                  {...register("category")}
                >
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="type">
                <FormLabel>Type</FormLabel>
                <Select
                  placeholder="Selecione o tipo de transação"
                  {...register("type")}
                >
                  {Object.values(TRANSACTION_TYPES).map((value) => (
                    <option key={value} id={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
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
            <Button
              onClick={onSubmit}
              colorScheme="green"
              disabled={!formState.isValid}
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
