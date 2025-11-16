// Individual toggle commands for each XELA preset setting
const vscode = require('vscode');

class ToggleCommands {
  constructor(configManager) {
    this.config = configManager;
    this.commands = [];
  }

  /**
   * Register all toggle commands
   */
  register(context) {
    // Editor toggles
    this.addToggle(context, 'formatOnSave', 'editor.formatOnSave',
      'Toggle Format on Save', 'boolean');

    this.addToggle(context, 'stickyScroll', 'editor.stickyScroll.enabled',
      'Toggle Sticky Scroll', 'boolean');

    this.addToggle(context, 'bracketPairs', 'editor.guides.bracketPairs',
      'Toggle Bracket Pair Guides', 'boolean');

    this.addToggle(context, 'minimap', 'editor.minimap.enabled',
      'Toggle Minimap', 'boolean');

    this.addToggle(context, 'smoothScrolling', 'editor.smoothScrolling',
      'Toggle Smooth Scrolling', 'boolean');

    this.addToggle(context, 'cursorAnimation', 'editor.cursorSmoothCaretAnimation',
      'Toggle Cursor Animation', 'enum', ['on', 'off', 'explicit']);

    this.addToggle(context, 'semanticHighlighting', 'editor.semanticHighlighting.enabled',
      'Toggle Semantic Highlighting', 'boolean');

    this.addToggle(context, 'inlayHints', 'editor.inlayHints.enabled',
      'Toggle Inlay Hints', 'enum', ['on', 'off', 'offUnlessPressed', 'onUnlessPressed']);

    // Workbench toggles
    this.addToggle(context, 'preview', 'workbench.editor.enablePreview',
      'Toggle Preview Editors', 'boolean');

    this.addToggle(context, 'wrapTabs', 'workbench.editor.wrapTabs',
      'Toggle Wrap Tabs', 'boolean');

    this.addToggle(context, 'breadcrumbs', 'breadcrumbs.enabled',
      'Toggle Breadcrumbs', 'boolean');

    // Code actions
    this.addCodeActionToggle(context, 'organizeImports',
      'editor.codeActionsOnSave', 'source.organizeImports',
      'Toggle Auto Organize Imports');

    this.addCodeActionToggle(context, 'fixAll',
      'editor.codeActionsOnSave', 'source.fixAll',
      'Toggle Auto Fix All');

    // TypeScript/JavaScript
    this.addToggle(context, 'updateImportsOnMove', 'typescript.updateImportsOnFileMove.enabled',
      'Toggle Auto Update Imports on File Move', 'enum', ['prompt', 'always', 'never']);

    // Show history command
    const historyCmd = vscode.commands.registerCommand('xela.showConfigHistory',
      () => this.config.showHistory());
    context.subscriptions.push(historyCmd);
    this.commands.push('xela.showConfigHistory');

    // Clear history command
    const clearHistoryCmd = vscode.commands.registerCommand('xela.clearConfigHistory',
      async () => {
        const confirm = await vscode.window.showWarningMessage(
          'Clear all configuration history?',
          'Clear',
          'Cancel'
        );
        if (confirm === 'Clear') {
          await this.config.history.clearHistory();
          vscode.window.showInformationMessage('Configuration history cleared');
        }
      });
    context.subscriptions.push(clearHistoryCmd);
    this.commands.push('xela.clearConfigHistory');

    return this.commands;
  }

  /**
   * Add a simple toggle command
   */
  addToggle(context, id, settingKey, title, type = 'boolean', options = []) {
    const commandId = `xela.toggle.${id}`;

    const command = vscode.commands.registerCommand(commandId, async () => {
      const config = vscode.workspace.getConfiguration();
      const currentValue = config.get(settingKey);

      let newValue;

      if (type === 'boolean') {
        newValue = !currentValue;
      } else if (type === 'enum') {
        // Cycle through enum options
        const currentIndex = options.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % options.length;
        newValue = options[nextIndex];
      }

      await this.config.toggleSetting(settingKey, newValue, {
        label: title
      });
    });

    context.subscriptions.push(command);
    this.commands.push(commandId);
  }

  /**
   * Add a code action toggle command
   */
  addCodeActionToggle(context, id, settingKey, actionKey, title) {
    const commandId = `xela.toggle.${id}`;

    const command = vscode.commands.registerCommand(commandId, async () => {
      const config = vscode.workspace.getConfiguration();
      const codeActions = config.get(settingKey, {});
      const currentValue = codeActions[actionKey];

      // Cycle through: explicit -> always -> never -> explicit
      const cycle = {
        'explicit': 'always',
        'always': 'never',
        'never': 'explicit',
        'true': 'never',
        'false': 'explicit'
      };

      const newValue = cycle[String(currentValue)] || 'explicit';
      const newCodeActions = { ...codeActions, [actionKey]: newValue };

      await this.config.toggleSetting(settingKey, newCodeActions, {
        label: `${title}: ${newValue}`
      });
    });

    context.subscriptions.push(command);
    this.commands.push(commandId);
  }
}

module.exports = { ToggleCommands };
