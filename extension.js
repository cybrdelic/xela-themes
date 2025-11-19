// XELA Themes - Theme-only extension

/**
 * Extension activation
 * @param {import('vscode').ExtensionContext} context
 */
function activate(context) {
  // Extension provides themes only - no commands or actions
  console.log('XELA Themes activated');
}

/**
 * Extension deactivation
 */
function deactivate() {
  console.log('XELA Themes deactivated');
}

module.exports = {
  activate,
  deactivate
};
