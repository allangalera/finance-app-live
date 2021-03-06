import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

const CategoriesContext = createContext();

const LOCAL_STORAGE_KEY = "categories";

const categoriesInitialValue = [
  {
    id: "housing",
    name: "Housing",
    fixed: true,
  },
  {
    id: "transportation",
    name: "Transportation",
    fixed: true,
  },
  {
    id: "food",
    name: "Food",
    fixed: true,
  },
  {
    id: "utilities",
    name: "Utilities",
    fixed: true,
  },
];

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(categoriesInitialValue);

  useEffect(() => {
    try {
      const localStorageCategories = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
      );
      if (localStorageCategories) setCategories(localStorageCategories);
    } catch (err) {
      console.log("failed to parse local storage value");
    }
  }, []);

  const add = (newCategory) => {
    const newCategories = [
      ...categories,
      {
        ...newCategory,
        id: nanoid(),
        fixed: false,
      },
    ];
    setCategories(newCategories);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCategories));
  };

  const remove = (categoryId) => {
    const filteredCategories = categories.filter((category) => {
      return !(category.id === categoryId);
    });

    if (filteredCategories.length === categories.length) return false;

    setCategories(filteredCategories);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredCategories));
  };
  return (
    <CategoriesContext.Provider
      value={{
        categories,
        add,
        remove,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }

  return context;
};
