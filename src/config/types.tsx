import {
  InitialBoardType,
  InitialWhiteFiguresType,
  InitialBlackFiguresType,
} from "../pages/index";

export type PreviousStates = {
  board: InitialBoardType;
  whiteFigures: InitialWhiteFiguresType;
  blackFigures: InitialBlackFiguresType;
  temporaryWhitePawnPosition: number | undefined;
  temporaryBlackPawnPosition: number | undefined;
};

export type OfficerPossibleMovements = {
  newBoard: InitialBoardType;
  position: number;
  positionX: number;
  isWhiteTurn: boolean;
};

export type HorsePossibleMovements = {
  newBoard: InitialBoardType;
  position: number;
  isWhiteTurn: boolean;
};
