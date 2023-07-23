const assert = require("assert");
const { convertEquals, convertVarToConst } = require("../../extension");
const vscode = require("vscode");

suite("Equilix Extension Tests", () => {
  test("Convert equals (==) to strict equals (===)", () => {
    const originalCode =
      "const a = 5;\nconst b = '5';\nif (a == b) {\n  console.log('Equal');\n}";
    const expectedCode =
      "const a = 5;\nconst b = '5';\nif (a === b) {\n  console.log('Equal');\n}";

    const convertedCode = convertEquals(originalCode);
    assert.equal(convertedCode, expectedCode);
  });

  test("Convert var to const", () => {
    const originalCode =
      "function calculateArea(radius) {\n  var pi = 3.14159;\n  var area = pi * radius * radius;\n  return area;\n}";
    const expectedCode =
      "function calculateArea(radius) {\n  const pi = 3.14159;\n  const area = pi * radius * radius;\n  return area;\n}";

    const convertedCode = convertVarToConst(originalCode);
    assert.equal(convertedCode, expectedCode);
  });
});
