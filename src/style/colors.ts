import { darken, brighten } from '3oilerplate'
import chroma from 'chroma-js';

const positive = '#66DE93'
const negative = '#EA2C62'

export const healthStatusColor = (health: number): string =>
  chroma.mix(negative, positive, (health || 100) / 100).hex()

export const colors: any = {
  primary: '#5463FF',
  primaryDark: darken('#5463FF', 0.5),
  secondary: '#04f2d5',
  secondaryDark: darken('#04f2d5', 0.25),
  background: chroma('#313552').darken(0).hex(),
  backgroundLight: chroma('#21325E').brighten(.25).hex(),
  backgroundDark: chroma('#21325E').darken(.25).hex(),
  positive,
  negative,
  white: darken('white', 1),
  black: brighten('black', .25),
}
