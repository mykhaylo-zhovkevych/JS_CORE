import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Testling importieren
import Gamerules from "./pages/gamerules";

test("game jxs korrekt", () => {
  // Arrage testvorbedigungen erstellen
  render(<Gamerules />);

  // Act potentielle user actions

  // ASSERT - prüfe nachbedigungen

  expect(
    screen.queryByText("Some Gamerules about the page")
  ).toBeInTheDocument();
});
