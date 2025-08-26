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
