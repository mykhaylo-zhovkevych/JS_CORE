import { render, screen } from "@testing-library/react";
import App from "./src/App";
import { MemoryRouter } from "react-router-dom";
import Gamefield from "./src/pages/gamefield";
import "@testing-library/jest-dom";
console.log(Gamefield);

jest.mock("./src/pages/gamefield", () => () => <div>DOC</div>);

test("App in default route contains Gamefield mock", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.queryByText("DOC")).toBeInTheDocument();
  /*asserts that the element with text "DOC" is present in the document.*/
});
