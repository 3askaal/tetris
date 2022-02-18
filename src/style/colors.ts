import { darken } from '3oilerplate'
import chroma from 'chroma-js';

const positive = '#66DE93'
const negative = '#EA2C62'

export const healthStatusColor = (health: number): string =>
  chroma.mix(negative, positive, (health || 100) / 100).hex()

export const colors: any = {
  primary: '#7459dc',
  primaryDark: darken('#7459dc', 0.25),
  secondary: '#04f2d5',
  secondaryDark: darken('#04f2d5', 0.25),
  background: '#1A1A2E',
  positive,
  negative,
}
