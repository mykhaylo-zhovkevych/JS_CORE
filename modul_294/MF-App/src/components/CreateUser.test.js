import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateUser from "./CreateUser";


test("should create a user and display success message", async () => {
  // Arrange
  render(<CreateUser />);

  // Act
  fireEvent.change(screen.getByPlaceholderText("Geben Sie den Vorname"), {
    target: { value: "Max" },
  });
  fireEvent.change(screen.getByPlaceholderText("Geben Sie den Nachname"), {
    target: { value: "Mustermann" },
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "admin" },
  });
  fireEvent.click(screen.getByText("Benutzer erstellen"));

  // Assert
  await waitFor(() => {
    expect(
      screen.getByText("Benutzer Max Mustermann erfolgreich erstellt")
    ).toBeInTheDocument();
  });
});