let debugEnabled = false;

// Simple logging initializer for XELA
export function initLogging() {
  try {
    debugEnabled = Boolean(process.env.XELA_DEBUG);
  } catch {
    debugEnabled = false;
  }
}

export function debug(...args) {
  if (debugEnabled) {
    console.debug('[XELA]', ...args);
  }
}
