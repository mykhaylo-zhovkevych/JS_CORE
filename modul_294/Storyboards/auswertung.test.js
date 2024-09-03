import { render, screen } from "@testing-library/react";
import Auswertung from "./src/components/Auswertung";

test("zeigt die richtige Punktzahl und Gesamtzahl an", () => {
  render(<Auswertung score={1} total={2} />);

  const resultText = screen.getByText(
    /Du hast 1 von 2 Fragen richtig beantwortet./i
  );
  expect(resultText).toBeTruthy();
});
