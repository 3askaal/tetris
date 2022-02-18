export const generateDamage = (grid: any, players: any, playerIndex: number) => {
  const { x, y }: any = { ...players[playerIndex] }
  const posKey = `${x}/${y}`

  let newGrid = {}

  const bomb = { [posKey]: { x, y, bomb: true } }
  const resetBomb = { [posKey]: { x, y, bomb: false } }

  let explosion: any = { [posKey]: { x, y, explosion: true } }
  let resetExplosion = { [posKey]: { x, y, explosion: false } }

  let damagePositions = [{ x, y }]

  const directions = ['left', 'right', 'up', 'down']

  let distance: any = {
    right: 0,
    left: 0,
    up: 0,
    down: 0
  }

  directions.forEach((direction) => {
    let i = 1
    let limit = 3

    while (i < limit) {
      const go: any = {
        left: `${x - i}/${y}`,
        right: `${x + i}/${y}`,
        up: `${x}/${y - i}`,
        down: `${x}/${y + i}`,
      }

      const newPos = grid[go[direction]]

      if (!newPos || newPos.stone) {
        return
      }

      const newPosKey = `${newPos.x}/${newPos.y}`

      if (newPos.brick) {
        newGrid = { ...newGrid, [newPosKey]: { ...newPos, brick: false }}
      }

      distance[direction]++

      i++

      if (newPos.brick) {
        limit = i
      }

      damagePositions.push({ x: newPos.x, y: newPos.y })
    }
  })

  explosion[posKey].distance = distance

  return {
    bomb,
    resetBomb,
    damagePositions,
    newGrid,
    explosion,
    resetExplosion
  }
}
