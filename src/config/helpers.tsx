import { OCCUPIED_BY } from "./constants";
import { OfficerPossibleMovements, HorsePossibleMovements } from "./types";

export const handleOfficerPossibleMovements = ({
  newBoard,
  position,
  positionX,
  isWhiteTurn,
}: OfficerPossibleMovements) => {
  for (let i = 7; i <= 49; i = i + 7) {
    if (position + i <= 64 && i <= (positionX - 1) * 7) {
      const isOccupiedBy = newBoard[position + i].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[position + i].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
  for (let i = 7; i <= 49; i = i + 7) {
    if (position - i >= 1 && i <= (8 - positionX) * 7) {
      const isOccupiedBy = newBoard[position - i].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[position - i].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
  for (let i = 9; i <= 63; i = i + 9) {
    if (position + i <= 64 && i <= (8 - positionX) * 9) {
      const isOccupiedBy = newBoard[position + i].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[position + i].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
  for (let i = 9; i <= 63; i = i + 9) {
    if (position - i >= 1 && i <= (positionX - 1) * 9) {
      const isOccupiedBy = newBoard[position - i].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[position - i].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
};

export const handleRookPossibleMovements = ({
  newBoard,
  position,
  isWhiteTurn,
}: HorsePossibleMovements) => {
  for (let i = 8; i <= 56; i = i + 8) {
    if (position + i <= 64) {
      const isOccupiedBy =
        newBoard[(position + i) as keyof typeof newBoard].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[(position + i) as keyof typeof newBoard].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
  for (let i = 8; i <= 56; i = i + 8) {
    if (position - i >= 1) {
      const isOccupiedBy =
        newBoard[(position - i) as keyof typeof newBoard].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[(position - i) as keyof typeof newBoard].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (position % 8 !== 0 && (position % 8) + i <= 8 && position + i <= 64) {
      const isOccupiedBy =
        newBoard[(position + i) as keyof typeof newBoard].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[(position + i) as keyof typeof newBoard].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
  for (let i = 1; i <= 7; i++) {
    if (position % 8 === 0 || (position % 8) - i >= 1) {
      const isOccupiedBy =
        newBoard[(position - i) as keyof typeof newBoard].isOccupiedBy;
      if (
        (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
        (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
      ) {
        break;
      }
      newBoard[(position - i) as keyof typeof newBoard].isReachable = true;
      if (isOccupiedBy) {
        break;
      }
    }
  }
};
