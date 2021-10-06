import { renderWithProviders } from "~/__tests__";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TransactionAddDrawer } from ".";

const addTransactionMocked = jest.fn();

describe("<TransactionAddDrawer />", () => {
  it("should open drawer", async () => {
    renderWithProviders(
      <TransactionAddDrawer addTransaction={addTransactionMocked} />
    );

    const btn = screen.getByRole("button", {
      name: /add/i,
    });

    userEvent.click(btn);

    const drawer = await screen.findByRole("dialog", {
      name: /add a transaction/i,
    });

    expect(drawer).toBeInTheDocument();
  });

  describe("transaction add form", () => {
    jest.setTimeout(10 * 1000);
    beforeEach(async () => {
      renderWithProviders(
        <TransactionAddDrawer addTransaction={addTransactionMocked} />
      );

      const btn = screen.getByRole("button", {
        name: /add/i,
      });

      userEvent.click(btn);

      await screen.findByRole("dialog", {
        name: /add a transaction/i,
      });
    });

    it("should not render with enabled submit button", async () => {
      const btn = screen.getByRole("button", {
        name: /salvar/i,
      });

      expect(btn).toBeDisabled();
    });

    it("should enable button after valid input", async () => {
      const btn = screen.getByRole("button", {
        name: /salvar/i,
      });

      const valueField = screen.getByRole("textbox", {
        name: /value/i,
      });

      userEvent.type(valueField, "123");

      expect(valueField).toHaveValue("R$123");

      expect(btn).toBeDisabled();

      const dateField = screen.getByLabelText(/date/i);

      userEvent.type(dateField, "2021-05-10");

      expect(dateField).toHaveValue();

      const timeField = screen.getByLabelText(/time/i);

      userEvent.type(timeField, "22:23");

      expect(timeField).toHaveValue();

      const categoryField = screen.getByRole("combobox", {
        name: /category/i,
      });

      userEvent.selectOptions(categoryField, "housing");

      expect(screen.getByText("Housing").selected).toBeTruthy();

      expect(btn).toBeDisabled();

      const typeField = screen.getByRole("combobox", {
        name: /type/i,
      });

      userEvent.selectOptions(typeField, "Income");

      expect(screen.getByText("Income").selected).toBeTruthy();

      await waitFor(() => expect(btn).not.toBeDisabled(), {
        timeout: 5 * 1000,
      });

      userEvent.click(btn);

      expect(addTransactionMocked).toHaveBeenCalledTimes(1);
    });
  });
});
