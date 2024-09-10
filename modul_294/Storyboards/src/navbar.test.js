import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import SpielAnsicht from "./pages/SpielAnsicht";
import Impressum from "./pages/Impressum";

describe("Navbar", () => {
  test("navigiert zu den richtigen Routen bei Klick auf Links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
        <Routes>
          <Route path="/" element={<SpielAnsicht />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
      </MemoryRouter>
    );

    // Finde den Link zur Impressum-Seite
    const impressumLink = screen.getByText("Impressum");

    // Simuliere einen Klick auf den Link
    fireEvent.click(impressumLink);

    // Überprüfe, ob der Inhalt der Impressum-Seite angezeigt wird
    expect(screen.getByText("Impressum")).toBeInTheDocument();
  });
});
