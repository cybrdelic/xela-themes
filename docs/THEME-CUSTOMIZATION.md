# Advanced Theme Customization System

## Overview
The XELA theme engine now supports multiple levels of customization for creating rich, detailed color schemes with precise control over every UI element.

## Customization Layers

### 1. Base Roles (Surface System)
Define foundational colors that are automatically mapped across UI elements:

```javascript
roles: {
  // Surfaces - Different background shades for depth
  surface0: '#1A1D2E',    // Primary editor background
  surface1: '#13151F',    // Sidebar/activity bar (usually darker or different)
  surface2: '#232842',    // Panels, elevated elements (usually lighter)
  surface3: '#2D3454',    // Highest elevation, popups
  panel: '#0F1118',       // Specific panel background (terminal, output)
  overlay: '#1A1D2EF2',   // Modal overlays
  backdrop: '#00000099',  // Backdrop dimming

  // Borders
  border: '#2D3454',      // Standard borders
  focus: withAlpha('#6C8EEF', 0.7),  // Focus indicators

  // Text hierarchy
  textPrimary: '#E5E9F0',     // Main text
  textSecondary: '#D8DEE9',   // Secondary text
  textMuted: '#81889F',       // Muted/disabled text
  textInverted: '#1A1D2E',    // Text on colored backgrounds

  // Accents - Semantic colors
  accentPrimary: '#6C8EEF',         // Primary actions, links
  accentPrimaryAlt: '#88C0D0',      // Primary variant
  accentInfo: '#5BA8D9',            // Info messages
  accentWarn: '#EBCB8B',            // Warnings
  accentError: '#D57780',           // Errors
  accentSuccess: '#A3BE8C',         // Success states
  accentSelection: withAlpha('#6C8EEF', 0.22),  // Selection backgrounds
  accentLink: '#88C0D0'             // Hyperlinks
}
```

### 2. Smart Surface Distribution
The engine automatically distributes surfaces intelligently:

- **surface0** → Editor background, active tabs
- **surface1** → Sidebar, activity bar, title bar, darker UI areas
- **surface2** → Panels, tab bar, elevated elements
- **surface3** → Dropdowns, widgets, highest elevation
- **panel** → Terminal, output panel, debug console

### 3. Color Overrides (Fine-Grained Control)
Override specific VS Code color keys for precise customization:

```javascript
colorOverrides: {
  // Tab Bar Customization
  'editorGroupHeader.tabsBackground': '#161923',
  'tab.inactiveBackground': '#13151F',
  'tab.activeBackground': '#1A1D2E',
  'tab.activeBorder': '#6C8EEF',
  'tab.hoverBackground': '#1E2233',

  // Status Bar
  'statusBar.background': '#0F1118',
  'statusBar.foreground': '#E5E9F0',
  'statusBar.noFolderBackground': '#13151F',

  // Title Bar
  'titleBar.activeBackground': '#0F1118',
  'titleBar.inactiveBackground': '#0F1118',

  // Activity Bar
  'activityBar.background': '#13151F',
  'activityBar.activeBorder': '#6C8EEF',

  // Sidebar
  'sideBar.background': '#13151F',
  'sideBar.border': '#2D3454',

  // Editor Elements
  'editor.lineHighlightBackground': '#1E2233',
  'editorLineNumber.activeForeground': '#E5E9F0',
  'editorGutter.background': '#1A1D2E',

  // Widgets & Dropdowns
  'editorWidget.background': '#161923',
  'editorWidget.border': '#2D3454',
  'dropdown.background': '#161923',
  'input.background': '#0F1118',

  // Lists & Trees
  'list.hoverBackground': '#1E2233',
  'list.activeSelectionBackground': '#232842',
  'list.inactiveSelectionBackground': '#1E2233',

  // Peek View
  'peekViewEditor.background': '#13151F',
  'peekViewResult.background': '#0F1118',
  'peekViewTitle.background': '#161923',

  // Minimap
  'minimap.background': '#0F1118',

  // Buttons
  'button.background': '#6C8EEF',
  'button.hoverBackground': '#88C0D0',
  'button.foreground': '#1A1D2E'
}
```

## Available VS Code Color Keys

### Editor Colors
- `editor.background`, `editor.foreground`
- `editor.lineHighlightBackground`
- `editor.selectionBackground`, `editor.selectionHighlightBackground`
- `editorLineNumber.foreground`, `editorLineNumber.activeForeground`
- `editorCursor.foreground`
- `editorGutter.background`, `editorGutter.addedBackground`, `editorGutter.modifiedBackground`

### Layout Areas
- `titleBar.activeBackground`, `titleBar.activeForeground`, `titleBar.border`
- `activityBar.background`, `activityBar.foreground`, `activityBar.border`
- `sideBar.background`, `sideBar.foreground`, `sideBar.border`
- `statusBar.background`, `statusBar.foreground`, `statusBar.border`
- `panel.background`, `panel.border`

### Tabs
- `editorGroupHeader.tabsBackground`, `editorGroupHeader.tabsBorder`
- `tab.activeBackground`, `tab.activeForeground`, `tab.activeBorder`
- `tab.inactiveBackground`, `tab.inactiveForeground`
- `tab.hoverBackground`, `tab.hoverBorder`

### Widgets & Controls
- `editorWidget.background`, `editorWidget.border`
- `input.background`, `input.foreground`, `input.border`
- `dropdown.background`, `dropdown.foreground`, `dropdown.border`
- `button.background`, `button.foreground`, `button.hoverBackground`
- `checkbox.background`, `checkbox.border`

### Lists & Trees
- `list.activeSelectionBackground`, `list.activeSelectionForeground`
- `list.inactiveSelectionBackground`
- `list.hoverBackground`, `list.hoverForeground`
- `list.focusBackground`

### Terminal
- `terminal.background`, `terminal.foreground`
- `terminal.ansiBlack` through `terminal.ansiWhite`
- `terminal.ansiBrightBlack` through `terminal.ansiBrightWhite`

### Diff Editor
- `diffEditor.insertedTextBackground`, `diffEditor.removedTextBackground`
- `diffEditor.insertedLineBackground`, `diffEditor.removedLineBackground`

### Peek View
- `peekViewEditor.background`, `peekViewEditor.matchHighlightBackground`
- `peekViewResult.background`, `peekViewResult.matchHighlightBackground`
- `peekViewTitle.background`

## Complete Example: Multi-Layer Theme

```javascript
{
  id: 'xela-example-layered',
  name: 'XELA Example — Multi-Layer Design',
  type: 'dark',

  // Layer 1: Base roles define color system
  roles: {
    surface0: '#1A1D2E',
    surface1: '#13151F',
    surface2: '#232842',
    surface3: '#2D3454',
    panel: '#0F1118',
    border: '#2D3454',
    textPrimary: '#E5E9F0',
    accentPrimary: '#6C8EEF',
    // ... other roles
  },

  // Layer 2: Token colors for syntax
  tokens(c) {
    return {
      comment: '#616E88',
      keyword: '#B48EAD',
      function: '#88C0D0',
      variable: '#D8DEE9',
      string: '#A3BE8C',
      // ... other tokens
    };
  },

  // Layer 3: Fine-grained UI overrides
  colorOverrides: {
    'editorGroupHeader.tabsBackground': '#161923',
    'tab.activeBackground': '#1A1D2E',
    'statusBar.background': '#0F1118',
    // ... specific element customization
  },

  htmlScheme: getHtmlColorScheme('example', 'dark')
}
```

## Best Practices

### Creating Depth
1. Use **3-5 distinct surface shades**
2. Darker surfaces for focus (sidebar darker than editor)
3. Lighter surfaces for elevation (modals, dropdowns)
4. Consistent increments (e.g., 5-10% luminance difference)

### Readability
1. **Minimum 4.5:1 contrast** for text on backgrounds
2. **7:1 for body text** is ideal
3. Use muted colors for less important text
4. Ensure borders are visible but not distracting

### Consistency
1. Keep sidebar/activity bar same shade
2. Match tab colors to their content areas
3. Use accent colors consistently for interactive elements
4. Terminal background should match panel background

### Performance
1. Limit unique colors (reuse surfaces)
2. Use alpha transparency sparingly
3. Avoid pure black (#000000) in dark themes
4. Test with semantic highlighting enabled

## Testing Your Theme

```bash
# Build themes
npm run build:themes

# Test all themes
npm run test:themes

# Package and install
npm run rebuild
```

Then reload VS Code and check:
- [ ] Sidebar depth vs editor
- [ ] Tab bar separation
- [ ] Status bar contrast
- [ ] Panel distinction
- [ ] Widget readability
- [ ] List hover states
- [ ] Terminal visibility
- [ ] Minimap clarity

## Migration Guide

### From Simple Theme:
```javascript
// Before (simple)
roles: {
  surface0: '#1A1A1A',
  textPrimary: '#FFFFFF',
  accentPrimary: '#0078D4'
}

// After (layered)
roles: {
  surface0: '#1A1A1A',    // Editor
  surface1: '#151515',    // Sidebar (darker)
  surface2: '#222222',    // Panels (lighter)
  surface3: '#2A2A2A',    // Elevated
  panel: '#0F0F0F',       // Terminal
  textPrimary: '#FFFFFF',
  accentPrimary: '#0078D4'
},
colorOverrides: {
  'editorGroupHeader.tabsBackground': '#181818',
  'tab.activeBackground': '#1A1A1A'
}
```

## Resources
- [VS Code Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Theme Examples](./theme-config-dynamic.js)
