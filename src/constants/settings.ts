export const DIFFICULTY_OPTIONS: any = [
  { label: 'Beginner', value: 2 },
  { label: 'Easy', value: 3 },
  { label: 'Intermediate', value: 4 },
  { label: 'Advanced', value: 5 },
  { label: 'Hard', value: 6 },
  { label: 'Pro', value: 7 },
  { label: 'Extreme', value: 8 },
  { label: 'Gnar', value: 9 },
]

export const SPECIAL_OPTIONS: any = [
  { label: 'No Nollie & Switch', value: { position: { $in: ['r', 'f'] } } },
  { label: 'No Flip Tricks', value: { position: { $in: ['r', 'f'] } } },
]
