const vscode = require("vscode");

function activate(context) {
  vscode.window.showInformationMessage("Equilix is now active!");

  const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
    const document = event.document;
    const text = document.getText();
    const unusedVariables = detectUnusedVariables(text);
    const convertedText = convertEquals(text, unusedVariables);
    if (text !== convertedText) {
      const edit = new vscode.TextEdit(
        new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        ),
        convertedText
      );
      event.waitUntil(Promise.resolve([edit]));
      const lineNumbers = getConvertedLineNumbers(text, convertedText);

      vscode.window.showInformationMessage(
        `Equilix fixed line no: ${lineNumbers.join(", ")}`
      );
      if (unusedVariables.length > 0) {
        vscode.window.showWarningMessage(
          `Detected ${
            unusedVariables.length
          } unused variables: ${unusedVariables.join(", ")}.`
        );
      }
    }
  });

  context.subscriptions.push(disposable);
}

function detectUnusedVariables(text) {
  // Regular expression to detect variable declarations and usages
  const variableRegex = /\b(?:let|const|var)\s+([A-Za-z_]\w*)\b/g;

  const declaredVariables = new Set();
  const usedVariables = new Set();

  // Find all declared variables
  text.replace(variableRegex, (_, variableName) => {
    declaredVariables.add(variableName);
    return "";
  });

  // Find all used variables
  text.replace(/([A-Za-z_]\w*)/g, (_, variableName) => {
    usedVariables.add(variableName);
    return "";
  });

  // Filter out the unused variables
  return [...declaredVariables].filter(
    (variable) => !usedVariables.has(variable)
  );
}

function convertForLoops(text) {
  // Convert 'for' loops to 'forEach' or 'map' methods
  const convertedText = text.replace(
    /for\s*\(\s*(?:let|var|const)?\s*(\w+)\s*=\s*(\w+)\s*;\s*(\1\s*(<|<=|>|>=|===|!==)\s*\w+)\s*;\s*(\1\s*(\+\+|--|\+=|-=|\*=|\/=|%=)\s*)\)/g,
    "($2).forEach(($1) =>"
  );
  return convertedText;
}

function convertVarToConst(text) {
  // Convert 'var' to 'const'
  const convertedText = text.replace(/\bvar\b/g, "const");
  return convertedText;
}

function convertEquals(text) {
  // Convert 'var' to 'const'
  const constConvertedText = convertVarToConst(text);

  const forLoopsConvertedText = convertForLoops(constConvertedText);

  // Convert equality and inequality operators
  const convertedEquals = forLoopsConvertedText.replace(/ == /g, " === ");
  return convertedEquals.replace(/ != /g, " !== ");
}

function getConvertedLineNumbers(originalText, convertedText) {
  const originalLines = originalText.split("\n");
  const convertedLines = convertedText.split("\n");

  const lineNumbers = [];
  for (let i = 0; i < originalLines.length; i++) {
    if (originalLines[i] !== convertedLines[i]) {
      lineNumbers.push(i + 1); // Add 1 to adjust for zero-based index
    }
  }

  return lineNumbers;
}

function deactivate() {}

module.exports = {
  convertEquals,
  convertVarToConst,
  activate,
  deactivate,
};
