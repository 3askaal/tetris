export interface IGrid {
  [posKey: string]: {
    x: number;
    y: number;
    stone: boolean;
    brick: boolean;
    explosion: boolean;
  }
}

export interface IExplosion {
  [posKey: string]: {
    x: number;
    y: number;
    explosion: boolean;
  }
}

export interface IBomb {
  [posKey: string]: {
    x: number;
    y: number;
    bomb: boolean;
  }
}
