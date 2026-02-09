export type BingoCategory = "B" | "I" | "N" | "G" | "O"

export const positions: Record<BingoCategory, number[]> = {
  B: [0, 5, 10, 15, 20], 
  I: [1, 6, 11, 16, 21],
  N: [2, 7, 12, 17, 22],
  G: [3, 8, 13, 18, 23],
  O: [4, 9, 14, 19, 24]
}