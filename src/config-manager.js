// Configuration manager with history tracking and granular toggles
const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');

class ConfigHistory {
  constructor(context) {
    this.context = context;
    this.historyKey = 'xela.configHistory';
    this.maxHistorySize = 50;
  }

  async saveState(label, config, scope = 'workspace') {
    const history = this.context.globalState.get(this.historyKey, []);
    const entry = {
      timestamp: Date.now(),
      label,
      config,
      scope,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    history.unshift(entry);

    // Keep only last N entries
    if (history.length > this.maxHistorySize) {
      history.splice(this.maxHistorySize);
    }

    await this.context.globalState.update(this.historyKey, history);
    return entry.id;
  }

  getHistory() {
    return this.context.globalState.get(this.historyKey, []);
  }

  async getEntry(id) {
    const history = this.getHistory();
    return history.find(entry => entry.id === id);
  }

  async clearHistory() {
    await this.context.globalState.update(this.historyKey, []);
  }
}

class ConfigManager {
  constructor(context) {
    this.context = context;
    this.history = new ConfigHistory(context);
    this.output = vscode.window.createOutputChannel('XELA Config');
  }

  log(msg, data) {
    const time = new Date().toISOString();
    this.output.appendLine(`[${time}] ${msg}`);
    if (data !== undefined) {
      try {
        this.output.appendLine(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      } catch {
        this.output.appendLine(String(data));
      }
    }
  }

  /**
   * Toggle a specific config setting with history tracking
   */
  async toggleSetting(key, value, options = {}) {
    const {
      scope = 'workspace',
      label = `Toggle ${key}`,
      showNotification = true
    } = options;

    try {
      const config = vscode.workspace.getConfiguration();
      const currentValue = config.get(key);

      // Save current state before changing
      await this.history.saveState(`Before: ${label}`, {
        [key]: currentValue
      }, scope);

      // Apply new value
      const target = scope === 'global'
        ? vscode.ConfigurationTarget.Global
        : vscode.ConfigurationTarget.Workspace;

      await config.update(key, value, target);

      this.log(`Toggled setting: ${key}`, { from: currentValue, to: value, scope });

      if (showNotification) {
        vscode.window.showInformationMessage(
          `${label}: ${this.formatValue(value)}`
        );
      }

      return true;
    } catch (err) {
      this.log(`Failed to toggle ${key}`, err);
      vscode.window.showErrorMessage(`Failed to toggle setting: ${err.message}`);
      return false;
    }
  }

  /**
   * Restore a previous configuration state
   */
  async restoreState(entryId) {
    const entry = await this.history.getEntry(entryId);
    if (!entry) {
      throw new Error('History entry not found');
    }

    const config = vscode.workspace.getConfiguration();
    const target = entry.scope === 'global'
      ? vscode.ConfigurationTarget.Global
      : vscode.ConfigurationTarget.Workspace;

    for (const [key, value] of Object.entries(entry.config)) {
      await config.update(key, value, target);
    }

    this.log('Restored configuration', entry);
    vscode.window.showInformationMessage(`Restored: ${entry.label}`);
  }

  /**
   * Show history and allow restore
   */
  async showHistory() {
    const history = this.history.getHistory();

    if (history.length === 0) {
      vscode.window.showInformationMessage('No configuration history available');
      return;
    }

    const items = history.map(entry => ({
      label: entry.label,
      description: new Date(entry.timestamp).toLocaleString(),
      detail: `Scope: ${entry.scope} | ${Object.keys(entry.config).length} settings`,
      entry
    }));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a configuration state to restore'
    });

    if (selected) {
      const confirm = await vscode.window.showWarningMessage(
        `Restore configuration from "${selected.label}"?`,
        'Restore',
        'Cancel'
      );

      if (confirm === 'Restore') {
        await this.restoreState(selected.entry.id);
      }
    }
  }

  formatValue(value) {
    if (typeof value === 'boolean') {
      return value ? '✓ Enabled' : '✗ Disabled';
    }
    if (typeof value === 'number') {
      return String(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  }
}

module.exports = { ConfigManager };
