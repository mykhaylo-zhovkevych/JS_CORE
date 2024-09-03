import demo from "./demo";

/* const demo = require("./demo"); */
// diese test ist dür die Erklärung von was die Test macht
test("teste korrekte summe in demo functuion", () => {
  // wird geprüft, ob die erwartete Ergebniss ist richtig.
    expect(demo(1, 2)).toBe(3);
    expect(demo(10,-20)).toBe(-10)
});

// absichtlich falsche Ergebniss
test("teste etwas, was immer falsch ist", () => {
    expect(true).toBe(true)
});