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
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

export const CategoriesAddDrawer = ({ onSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, reset, getValues } = useForm();
  const btnRef = useRef();

  useEffect(() => {
    reset({
      name: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOnSubmit = () => {
    const formData = getValues();
    onSubmit(formData);
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
          <DrawerHeader>Add a category</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" {...register("name")} />
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
            <Button onClick={handleOnSubmit} colorScheme="green">
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
