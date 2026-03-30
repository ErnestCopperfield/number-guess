import { parseAbi } from "viem";

export const numberGuessAddress = "0x1a6a49573a92a8caea93ae5bdd48e578e15ddd25" as const;

export const numberGuessAbi = parseAbi([
  "function lastGuess(address user) view returns (uint256)",
  "function guessCount(address user) view returns (uint256)",
  "function guess(uint256 number)",
  "event Guessed(address indexed user, uint256 number)"
]);
