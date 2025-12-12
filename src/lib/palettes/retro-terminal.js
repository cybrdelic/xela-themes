/**
 * Retro Terminal Palettes
 *
 * Color palettes from classic terminal displays.
 *
 * @module lib/palettes/retro-terminal
 */

export const retroTerminalPalettes = {
  greenPhosphor: {
    name: "Green Phosphor (P1)",
    year: 1970,
    category: "retro-terminal",
    type: "dark",
    colors: {
      background: "#0D0208",
      foreground: "#00FF00",
      dim: "#008000",
      bright: "#00FF00"
    }
  },

  amberPhosphor: {
    name: "Amber Phosphor (P3)",
    year: 1970,
    category: "retro-terminal",
    type: "dark",
    colors: {
      background: "#0D0200",
      foreground: "#FFB000",
      dim: "#806000",
      bright: "#FFCC00"
    }
  },

  coolRetro: {
    name: "Cool Retro White",
    year: 1980,
    category: "retro-terminal",
    type: "dark",
    colors: {
      background: "#1A1A1A",
      foreground: "#EFEFEF",
      dim: "#7F7F7F",
      bright: "#FFFFFF"
    }
  },

  vt220: {
    name: "DEC VT220",
    year: 1983,
    category: "retro-terminal",
    type: "dark",
    colors: {
      background: "#1E1E1E",
      foreground: "#41FF00",
      cursor: "#41FF00"
    }
  },

  ibm3270: {
    name: "IBM 3270",
    year: 1971,
    category: "retro-terminal",
    type: "dark",
    colors: {
      background: "#000000",
      blue: "#00AAFF",
      green: "#00FF00",
      turquoise: "#00FFFF",
      red: "#FF0000",
      pink: "#FF00FF",
      yellow: "#FFFF00",
      white: "#FFFFFF"
    }
  }
};
