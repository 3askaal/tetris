export interface IPlayer {
  name: string;
  socketId?: string;
  index?: number;
  color?: string;
  x: number;
  y: number;
  health?: number;
}
