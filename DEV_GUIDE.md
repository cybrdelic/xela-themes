# XELA Themes - Development Guide

## 🚀 Amazing Development Experience

This repository now provides a **fast, clean, and isolated** development experience for theme development. No more slow package-and-install cycles!

## ⚡ Quick Start

1. **Clone and setup:**
   ```bash
   git clone https://github.com/cybrdelic/xela-themes.git
   cd xela-themes
   npm install
   ```

2. **Start developing:**
   - **Press F5** in VS Code to launch Extension Development Host
   - Edit any theme file in `themes/` folder
   - In the test window: **Ctrl+Shift+P** → **Developer: Reload Window**
   - Your changes appear instantly!

## 🎯 Key Benefits

### ✅ Before (Painful)
- Edit theme → `npm run package-and-install` → Wait → Test → Repeat
- Uses your personal VS Code (contaminated with your settings/extensions)
- Slow feedback loop

### ✅ After (Amazing)
- Edit theme → **Developer: Reload Window** → Test instantly!
- Clean, isolated test environment
- Fast feedback loop
- Multiple launch configurations for different testing scenarios

## 🛠️ Launch Configurations

Choose the right configuration for your needs:

### `Run Extension` (Default - F5)
- Clean temporary profile
- Fast startup
- Good for most development

### `Run Extension (Clean Profile)`
- Completely isolated user data
- Separate settings/extensions
- Perfect for testing themes without interference

### `Debug Extension (Isolated)`
- Full debugging capabilities
- All extensions disabled
- Console output for troubleshooting

## 📝 Development Workflow

1. **Start Extension Development Host:**
   - Press **F5** (or use Run and Debug panel)
   - New VS Code window opens with your extension loaded

2. **Test themes:**
   - In test window: **Ctrl+Shift+P** → **Preferences: Color Theme**
   - Select any XELA theme
   - See your theme in action!

3. **Make changes:**
   - Edit theme files in `themes/` folder
   - Auto-save is enabled for faster iteration

4. **See changes instantly:**
   - In test window: **Ctrl+Shift+P** → **Developer: Reload Window**
   - Your changes appear immediately!

5. **Debug if needed:**
   - Use "Debug Extension (Isolated)" launch config
   - Check Output panel → XELA for logs
   - Use browser dev tools (Help → Toggle Developer Tools)

## 🧹 Clean Environment Features

- **Isolated test data:** Uses `.vscode-test-data/` (gitignored)
- **Clean profiles:** No interference from your personal VS Code
- **Auto-save enabled:** See changes as you type
- **JSON schema validation:** Autocomplete for theme properties
- **Optimized settings:** Perfect for theme development

## 🎨 Adding New Themes

1. Create new JSON file in `themes/` folder:
   ```bash
   cp themes/xela-dark-color-theme.json themes/xela-mytheme-color-theme.json
   ```

2. Edit the theme properties

3. Add to `package.json` under `contributes.themes`:
   ```json
   {
     "label": "XELA MyTheme",
     "uiTheme": "vs-dark",
     "path": "./themes/xela-mytheme-color-theme.json"
   }
   ```

4. **F5** → **Developer: Reload Window** → Test!

## 🔧 Troubleshooting

### Extension not loading?
- Check Output panel → XELA for errors
- Try "Debug Extension (Isolated)" configuration
- Use **Developer: Reload Window** in test instance

### Changes not appearing?
- Make sure you're editing files in the main VS Code window
- Use **Developer: Reload Window** in the test window (not main window)
- Check that auto-save is working

### Need fresh start?
```bash
npm run dev:clean  # Cleans test environment
```

## 📦 Final Testing & Distribution

Only use package-and-install for final testing:
```bash
npm run package-and-install
```

This installs the extension in your main VS Code for final testing before publishing.

## 🚀 Helpful Scripts

```bash
npm run dev           # Quick start guide
npm run dev:help      # Detailed workflow
npm run dev:clean     # Clean test environment
npm run test:themes   # Theme testing guide
```

## 💡 Pro Tips

- Keep the test window open and just reload it for each change
- Use multiple launch configs for different testing scenarios
- The development environment is optimized for theme work
- Auto-save means you see changes as you type
- Check the XELA output channel for detailed logs

---

**Happy theme development!** 🎨✨