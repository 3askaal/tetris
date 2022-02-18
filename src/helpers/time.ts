export function getRemainingTime(until: number) {
  const now = new Date().getTime()
  return (until - now)
}
