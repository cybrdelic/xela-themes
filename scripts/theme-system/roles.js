// Role definitions and utilities for theme generation
import { alpha, primitives, withAlpha } from './palette.js';

export const roles = {
  surfaces: ['surface0','surface1','surface2','surface3','panel','overlay','backdrop'],
  text: ['primary','secondary','muted','inverted'],
  accents: ['primary','primaryAlt','info','warn','error','success','selection','link'],
  states: ['added','modified','deleted'],
  misc: ['focus','border','shadow','lineHighlight']
};

// Simple color manipulation helpers (naive, sufficient for minor adjustments)
const clamp = v => Math.max(0, Math.min(255, v));
const toRGB = hex => {
  const v = hex.replace('#','');
  const bigint = parseInt(v.length===3?v.split('').map(c=>c+c).join(''):v,16);
  return { r:(bigint>>16)&255, g:(bigint>>8)&255, b:bigint&255 };
};
const toHex = ({r,g,b}) => '#' + [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();

/**
 * Get relative luminance (WCAG)
 */
export const getLuminance = hex => {
  const {r,g,b} = toRGB(hex);
  const [rs,gs,bs] = [r,g,b].map(c => {
    c = c/255;
    return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  });
  return 0.2126*rs + 0.7152*gs + 0.0722*bs;
};

/**
 * Calculate WCAG contrast ratio
 */
export const getContrastRatio = (fg, bg) => {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const lighter = Math.max(l1,l2);
  const darker = Math.min(l1,l2);
  return (lighter + 0.05)/(darker + 0.05);
};

/**
 * Adjust color to meet contrast requirement
 */
export const enforceContrast = (fg, bg, minContrast) => {
  if (!fg || !bg) return fg;
  let ratio = getContrastRatio(fg, bg);
  if (ratio >= minContrast) return fg;

  const blackRatio = getContrastRatio('#000000', bg);
  const whiteRatio = getContrastRatio('#FFFFFF', bg);
  const target = blackRatio >= whiteRatio ? '#000000' : '#FFFFFF';
  const targetRatio = Math.max(blackRatio, whiteRatio);

  if (targetRatio >= minContrast) {
    return target;
  }

  const targetRgb = toRGB(target);
  const start = toRGB(fg);

  for (let step = 1; step <= 20; step++) {
    const mixRatio = step / 20;
    const adjusted = toHex({
      r: clamp(Math.round(start.r + (targetRgb.r - start.r) * mixRatio)),
      g: clamp(Math.round(start.g + (targetRgb.g - start.g) * mixRatio)),
      b: clamp(Math.round(start.b + (targetRgb.b - start.b) * mixRatio))
    });
    ratio = getContrastRatio(adjusted, bg);
    if (ratio >= minContrast) return adjusted;
  }

  return target;
};

export const lighten = (hex, amount=0.1) => {
  const {r,g,b} = toRGB(hex);
  return toHex({
    r: clamp(r + (255-r)*amount),
    g: clamp(g + (255-g)*amount),
    b: clamp(b + (255-b)*amount)
  });
};

export const darken = (hex, amount=0.1) => {
  const {r,g,b} = toRGB(hex);
  return toHex({
    r: clamp(r*(1-amount)),
    g: clamp(g*(1-amount)),
    b: clamp(b*(1-amount))
  });
};

export const mix = (a,b,ratio=0.5) => {
  const ca = toRGB(a), cb = toRGB(b);
  return toHex({
    r: clamp(Math.round(ca.r + (cb.r-ca.r)*ratio)),
    g: clamp(Math.round(ca.g + (cb.g-ca.g)*ratio)),
    b: clamp(Math.round(ca.b + (cb.b-ca.b)*ratio))
  });
};

// Base role presets per archetype
export function archetype(name){
  switch(name){
    case 'black':
      return {
        surface0: primitives.black,
        surface1: '#0A0A0A',
        surface2: '#0D0D0D',
        surface3: '#141414',
        panel: '#0A0A0A',
        overlay: '#0A0A0ACC',
        backdrop: '#00000088',
        border: '#242424',
        focus: withAlpha('#00F5A0',0.67),
        textPrimary: '#F7F8FA',
        textSecondary: '#EDEFF2',
        textMuted: '#A6AAB4',
        textInverted: '#0F0F0F',
        accentPrimary: '#00F5A0',
        accentPrimaryAlt: '#4CFFCA',
        accentInfo: '#4CFFCA',
        accentWarn: '#FFD166',
        accentError: '#FF5A87',
        accentSuccess: '#22C55E',
        accentSelection: withAlpha('#FFD166',0.2),
        accentLink: '#4CFFCA'
      };
    default:
      return {};
  }
}

export { alpha, withAlpha };
