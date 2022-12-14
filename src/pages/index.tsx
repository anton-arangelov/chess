import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { Board } from "../components/Board";
import { Figures } from "../components/Figures";
import { FIGURES, OCCUPIED_BY } from "../config/constants";
import { PreviousStates } from "../config/types";
import {
  handleOfficerPossibleMovements,
  handleRookPossibleMovements,
} from "../config/helpers";

export const initialBoard: {
  [key: number]: { isOccupiedBy?: string | undefined; isReachable: boolean };
} = {};

for (let i = 1; i <= 64; i++) {
  if (i >= 1 && i <= 16) {
    initialBoard[i] = {
      isOccupiedBy: OCCUPIED_BY.BLACK_FIGURES,
      isReachable: false,
    };
  }
  if (i >= 17 && i <= 48) {
    initialBoard[i] = {
      isOccupiedBy: undefined,
      isReachable: false,
    };
  }
  if (i >= 49 && i <= 64) {
    initialBoard[i] = {
      isOccupiedBy: OCCUPIED_BY.WHITE_FIGURES,
      isReachable: false,
    };
  }
}

export const initialWhiteFigures = {
  leftRook: {
    isAlive: true,
    figure: FIGURES.ROOK,
    positionX: 1,
    positionY: 8,
    role: "leftRook",
    image: (
      <img
        alt="rlt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png"
      ></img>
    ),
  },
  leftHorse: {
    isAlive: true,
    figure: FIGURES.HORSE,
    positionX: 2,
    positionY: 8,
    role: "leftHorse",
    image: (
      <img
        alt="nlt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png"
      ></img>
    ),
  },
  leftOfficer: {
    isAlive: true,
    figure: FIGURES.OFFICER,
    positionX: 3,
    positionY: 8,
    role: "leftOfficer",
    image: (
      <img
        alt="blt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png"
      ></img>
    ),
  },
  queen: {
    isAlive: true,
    figure: FIGURES.QUEEN,
    positionX: 4,
    positionY: 8,
    role: "queen",
    image: (
      <img
        alt="qlt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png"
      ></img>
    ),
  },
  king: {
    isAlive: true,
    figure: FIGURES.KING,
    positionX: 5,
    positionY: 8,
    role: "king",
    image: (
      <img
        alt="klt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg.png"
      ></img>
    ),
  },
  rightOfficer: {
    isAlive: true,
    figure: FIGURES.OFFICER,
    positionX: 6,
    positionY: 8,
    role: "rightOfficer",
    image: (
      <img
        alt="blt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png"
      ></img>
    ),
  },
  rightHorse: {
    isAlive: true,
    figure: FIGURES.HORSE,
    positionX: 7,
    positionY: 8,
    role: "rightHorse",
    image: (
      <img
        alt="nlt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png"
      ></img>
    ),
  },
  rightRook: {
    isAlive: true,
    figure: FIGURES.ROOK,
    positionX: 8,
    positionY: 8,
    role: "rightRook",
    image: (
      <img
        alt="rlt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png"
      ></img>
    ),
  },
  pawn_1: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 1,
    positionY: 7,
    role: "pawn_1",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
  pawn_2: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 2,
    positionY: 7,
    role: "pawn_2",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
  pawn_3: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 3,
    positionY: 7,
    role: "pawn_3",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
  pawn_4: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 4,
    positionY: 7,
    role: "pawn_4",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
  pawn_5: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 5,
    positionY: 7,
    role: "pawn_5",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
  pawn_6: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 6,
    positionY: 7,
    role: "pawn_6",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
  pawn_7: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 7,
    positionY: 7,
    role: "pawn_7",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
  pawn_8: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 8,
    positionY: 7,
    role: "pawn_8",
    image: (
      <img
        alt="plt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
      ></img>
    ),
  },
};

export const initialBlackFigures = {
  leftRook: {
    isAlive: true,
    figure: FIGURES.ROOK,
    positionX: 1,
    positionY: 1,
    role: "leftRook",
    image: (
      <img
        alt="rdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png"
      ></img>
    ),
  },
  leftHorse: {
    isAlive: true,
    figure: FIGURES.HORSE,
    positionX: 2,
    positionY: 1,
    role: "leftHorse",
    image: (
      <img
        alt="ndt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png"
      ></img>
    ),
  },
  leftOfficer: {
    isAlive: true,
    figure: FIGURES.OFFICER,
    positionX: 3,
    positionY: 1,
    role: "leftOfficer",
    image: (
      <img
        alt="bdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png"
      ></img>
    ),
  },
  queen: {
    isAlive: true,
    figure: FIGURES.QUEEN,
    positionX: 4,
    positionY: 1,
    role: "queen",
    image: (
      <img
        alt="qdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png"
      ></img>
    ),
  },
  king: {
    isAlive: true,
    figure: FIGURES.KING,
    positionX: 5,
    positionY: 1,
    role: "king",
    image: (
      <img
        alt="kdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png"
      ></img>
    ),
  },
  rightOfficer: {
    isAlive: true,
    figure: FIGURES.OFFICER,
    positionX: 6,
    positionY: 1,
    role: "rightOfficer",
    image: (
      <img
        alt="bdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png"
      ></img>
    ),
  },
  rightHorse: {
    isAlive: true,
    figure: FIGURES.HORSE,
    positionX: 7,
    positionY: 1,
    role: "rightHorse",
    image: (
      <img
        alt="ndt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png"
      ></img>
    ),
  },
  rightRook: {
    isAlive: true,
    figure: FIGURES.ROOK,
    positionX: 8,
    positionY: 1,
    role: "rightRook",
    image: (
      <img
        alt="rdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png"
      ></img>
    ),
  },
  pawn_1: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 1,
    positionY: 2,
    role: "pawn_1",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
  pawn_2: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 2,
    positionY: 2,
    role: "pawn_2",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
  pawn_3: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 3,
    positionY: 2,
    role: "pawn_3",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
  pawn_4: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 4,
    positionY: 2,
    role: "pawn_4",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
  pawn_5: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 5,
    positionY: 2,
    role: "pawn_5",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
  pawn_6: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 6,
    positionY: 2,
    role: "pawn_6",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
  pawn_7: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 7,
    positionY: 2,
    role: "pawn_7",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
  pawn_8: {
    isAlive: true,
    figure: FIGURES.PAWN,
    positionX: 8,
    positionY: 2,
    role: "pawn_8",
    image: (
      <img
        alt="pdt"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
      ></img>
    ),
  },
};

export type InitialBoardType = typeof initialBoard;
export type InitialWhiteFiguresType = typeof initialWhiteFigures;
export type InitialBlackFiguresType = typeof initialBlackFigures;

const Home = () => {
  const [board, setBoard] = useState(initialBoard);
  const [whiteFigures, setWhiteFigures] = useState(initialWhiteFigures);
  const [blackFigures, setBlackFigures] = useState(initialBlackFigures);
  const [clickedFigure, setClickedFigure] = useState<
    | {
        figure: string;
        positionX: number;
        positionY: number;
        role: string;
      }
    | undefined
  >(undefined);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [hasPawnReachedEnd, setHasPawnReachedEnd] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const castExchange = useRef<
    | {
        isTopLeftRook?: boolean;
        isTopRightRook?: boolean;
        isBottomLeftRook?: boolean;
        isBottomRightRook?: boolean;
      }
    | undefined
  >(undefined);
  const [isMoving, setIsMoving] = useState(false);
  const temporaryWhitePawnPosition = useRef<number | undefined>(undefined);
  const temporaryBlackPawnPosition = useRef<number | undefined>(undefined);
  const previousStates = useRef<PreviousStates[]>([]);

  const handleFigureClicked = (
    figure: string,
    positionX: number,
    positionY: number,
    role: string
  ) => {
    if (castExchange.current) {
      castExchange.current = undefined;
    }
    if (isWhiteTurn && temporaryWhitePawnPosition.current) {
      temporaryWhitePawnPosition.current = undefined;
    }
    if (!isWhiteTurn && temporaryBlackPawnPosition.current) {
      temporaryBlackPawnPosition.current = undefined;
    }

    const position = 8 * (positionY - 1) + positionX;
    setClickedFigure({ figure, positionX, role, positionY });
    const newBoard = JSON.parse(JSON.stringify(board));
    Object.keys(newBoard).forEach((keyIndex) => {
      newBoard[keyIndex].isReachable = false;
    });

    //Pawn
    if (figure === FIGURES.PAWN) {
      if (isWhiteTurn && !newBoard[position - 8].isOccupiedBy) {
        newBoard[position - 8].isReachable = true;
      }
      if (
        isWhiteTurn &&
        positionY === 7 &&
        !newBoard[position - 8].isOccupiedBy &&
        !newBoard[position - 16].isOccupiedBy
      ) {
        newBoard[position - 16].isReachable = true;
      }
      if (
        isWhiteTurn &&
        positionX !== 1 &&
        (newBoard[position - 9].isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES ||
          position - 9 === temporaryBlackPawnPosition.current)
      ) {
        newBoard[position - 9].isReachable = true;
      }
      if (
        isWhiteTurn &&
        positionX !== 8 &&
        (newBoard[position - 7].isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES ||
          position - 7 === temporaryBlackPawnPosition.current)
      ) {
        newBoard[position - 7].isReachable = true;
      }
      if (!isWhiteTurn && !newBoard[position + 8].isOccupiedBy) {
        newBoard[position + 8].isReachable = true;
      }
      if (
        !isWhiteTurn &&
        positionY === 2 &&
        !newBoard[position + 8].isOccupiedBy &&
        !newBoard[position + 16].isOccupiedBy
      ) {
        newBoard[position + 16].isReachable = true;
      }
      if (
        !isWhiteTurn &&
        positionX !== 1 &&
        (newBoard[position + 7].isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES ||
          position + 7 === temporaryWhitePawnPosition.current)
      ) {
        newBoard[position + 7].isReachable = true;
      }
      if (
        !isWhiteTurn &&
        positionX !== 8 &&
        (newBoard[position + 9].isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES ||
          position + 9 === temporaryWhitePawnPosition.current)
      ) {
        newBoard[position + 9].isReachable = true;
      }
    }

    //Horse
    if (figure === FIGURES.HORSE) {
      if (
        positionX > 1 &&
        positionY > 2 &&
        ((isWhiteTurn &&
          newBoard[position - 17].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position - 17].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position - 17].isReachable = true;
      }
      if (
        positionX < 8 &&
        positionY > 2 &&
        ((isWhiteTurn &&
          newBoard[position - 15].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position - 15].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position - 15].isReachable = true;
      }
      if (
        positionX > 2 &&
        positionY > 1 &&
        ((isWhiteTurn &&
          newBoard[position - 10].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position - 10].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position - 10].isReachable = true;
      }
      if (
        positionX < 7 &&
        positionY > 1 &&
        ((isWhiteTurn &&
          newBoard[position - 6].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position - 6].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position - 6].isReachable = true;
      }
      if (
        positionX > 2 &&
        positionY < 8 &&
        ((isWhiteTurn &&
          newBoard[position + 6].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position + 6].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position + 6].isReachable = true;
      }
      if (
        positionX < 7 &&
        positionY < 8 &&
        ((isWhiteTurn &&
          newBoard[position + 10].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position + 10].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position + 10].isReachable = true;
      }
      if (
        positionX > 1 &&
        positionY < 7 &&
        ((isWhiteTurn &&
          newBoard[position + 15].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position + 15].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position + 15].isReachable = true;
      }
      if (
        positionX < 8 &&
        positionY < 7 &&
        ((isWhiteTurn &&
          newBoard[position + 17].isOccupiedBy !== OCCUPIED_BY.WHITE_FIGURES) ||
          (!isWhiteTurn &&
            newBoard[position + 17].isOccupiedBy !== OCCUPIED_BY.BLACK_FIGURES))
      ) {
        newBoard[position + 17].isReachable = true;
      }
    }

    //Officer
    if (figure === FIGURES.OFFICER) {
      handleOfficerPossibleMovements({
        newBoard,
        position,
        positionX,
        isWhiteTurn,
      });
    }

    //Rook
    if (figure === FIGURES.ROOK) {
      handleRookPossibleMovements({ newBoard, position, isWhiteTurn });
    }

    //Queen
    if (figure === FIGURES.QUEEN) {
      handleOfficerPossibleMovements({
        newBoard,
        position,
        positionX,
        isWhiteTurn,
      });
      handleRookPossibleMovements({ newBoard, position, isWhiteTurn });
    }

    //King
    if (figure === FIGURES.KING) {
      let isOccupiedBy;
      if (positionY !== 1) {
        isOccupiedBy = newBoard[position - 8].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position - 8].isReachable = true;
        }
      }

      if (positionY !== 1 && positionX !== 8) {
        isOccupiedBy = newBoard[position - 7].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position - 7].isReachable = true;
        }
      }

      if (positionX !== 8) {
        isOccupiedBy = newBoard[position + 1].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position + 1].isReachable = true;
        }
      }

      if (positionY !== 8 && positionX !== 8) {
        isOccupiedBy = newBoard[position + 9].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position + 9].isReachable = true;
        }
      }

      if (positionY !== 8) {
        isOccupiedBy = newBoard[position + 8].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position + 8].isReachable = true;
        }
      }

      if (positionY !== 8 && positionX !== 1) {
        isOccupiedBy = newBoard[position + 7].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position + 7].isReachable = true;
        }
      }

      if (positionX !== 1) {
        isOccupiedBy = newBoard[position - 1].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position - 1].isReachable = true;
        }
      }

      if (positionY !== 1 && positionX && positionX !== 1) {
        isOccupiedBy = newBoard[position - 9].isOccupiedBy;
        if (
          !(
            (isWhiteTurn && isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES) ||
            (!isWhiteTurn && isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES)
          )
        ) {
          newBoard[position - 9].isReachable = true;
        }
      }

      //Cast
      if (
        isWhiteTurn &&
        positionX === 5 &&
        positionY === 8 &&
        !newBoard[62].isOccupiedBy &&
        !newBoard[63].isOccupiedBy &&
        newBoard[64].isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES &&
        whiteFigures.rightRook.positionX === 8 &&
        whiteFigures.rightRook.positionY === 8
      ) {
        newBoard[position + 2].isReachable = true;
        castExchange.current = {
          ...(castExchange.current ?? {}),
          isBottomRightRook: true,
        };
      }

      if (
        isWhiteTurn &&
        positionX === 5 &&
        positionY === 8 &&
        !newBoard[58].isOccupiedBy &&
        !newBoard[59].isOccupiedBy &&
        !newBoard[60].isOccupiedBy &&
        newBoard[57].isOccupiedBy === OCCUPIED_BY.WHITE_FIGURES &&
        whiteFigures.leftRook.positionX === 1 &&
        whiteFigures.leftRook.positionY === 8
      ) {
        newBoard[position - 3].isReachable = true;
        castExchange.current = {
          ...(castExchange.current ?? {}),
          isBottomLeftRook: true,
        };
      }

      if (
        !isWhiteTurn &&
        positionX === 5 &&
        positionY === 1 &&
        !newBoard[6].isOccupiedBy &&
        !newBoard[7].isOccupiedBy &&
        newBoard[8].isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES &&
        blackFigures.rightRook.positionX === 8 &&
        blackFigures.rightRook.positionY === 1
      ) {
        newBoard[position + 2].isReachable = true;
        castExchange.current = {
          ...(castExchange.current ?? {}),
          isTopRightRook: true,
        };
      }

      if (
        !isWhiteTurn &&
        positionX === 5 &&
        positionY === 1 &&
        !newBoard[2].isOccupiedBy &&
        !newBoard[3].isOccupiedBy &&
        !newBoard[4].isOccupiedBy &&
        newBoard[1].isOccupiedBy === OCCUPIED_BY.BLACK_FIGURES &&
        blackFigures.leftRook.positionX === 1 &&
        blackFigures.leftRook.positionY === 1
      ) {
        newBoard[position - 3].isReachable = true;
        castExchange.current = {
          ...(castExchange.current ?? {}),
          isTopLeftRook: true,
        };
      }
    }
    setBoard(newBoard);
  };

  const handleMoveFigure = (isReachable: boolean, position: number) => {
    if (!isReachable || !clickedFigure) {
      return;
    }
    setIsMoving(true);
    let wasAttacked = false;
    const newX = position % 8;
    let newY = Math.floor(position / 8) + 1;
    if (newX === 0) {
      newY--;
    }

    //Temporary white pawn
    if (isWhiteTurn && clickedFigure.figure === FIGURES.PAWN && newY === 5) {
      temporaryWhitePawnPosition.current = position + 8;
    }

    //Temporary black pawn
    if (!isWhiteTurn && clickedFigure.figure === FIGURES.PAWN && newY === 4) {
      temporaryBlackPawnPosition.current = position - 8;
    }

    const hasPawnReachedEndHelper =
      clickedFigure.figure === FIGURES.PAWN && (newY === 1 || newY === 8);
    if (hasPawnReachedEndHelper) {
      setHasPawnReachedEnd(true);
    }

    //Setting the board
    const newBoard = JSON.parse(JSON.stringify(board));
    const clickedFigureOldPosition =
      (clickedFigure.positionY - 1) * 8 + clickedFigure.positionX;

    newBoard[clickedFigureOldPosition].isOccupiedBy = undefined;
    if (newBoard[position].isOccupiedBy) {
      wasAttacked = true;
    }

    //If a pawn was attacked by diagonal
    if (
      clickedFigure.figure === FIGURES.PAWN &&
      ((isWhiteTurn && position === temporaryBlackPawnPosition.current) ||
        (!isWhiteTurn && position === temporaryWhitePawnPosition.current))
    ) {
      wasAttacked = true;
      if (isWhiteTurn) {
        newBoard[position + 8].isOccupiedBy = undefined;
      }
      if (!isWhiteTurn) {
        newBoard[position - 8].isOccupiedBy = undefined;
      }
    }

    //If there was a cast between king and rook
    if (castExchange.current) {
      if (position === 63) {
        newBoard[64].isOccupiedBy = undefined;
        newBoard[62].isOccupiedBy = OCCUPIED_BY.WHITE_FIGURES;
      }
      if (position === 58) {
        newBoard[57].isOccupiedBy = undefined;
        newBoard[59].isOccupiedBy = OCCUPIED_BY.WHITE_FIGURES;
      }
      if (position === 7) {
        newBoard[8].isOccupiedBy = undefined;
        newBoard[6].isOccupiedBy = OCCUPIED_BY.BLACK_FIGURES;
      }
      if (position === 2) {
        newBoard[1].isOccupiedBy = undefined;
        newBoard[3].isOccupiedBy = OCCUPIED_BY.BLACK_FIGURES;
      }
    }

    newBoard[position].isOccupiedBy = isWhiteTurn
      ? OCCUPIED_BY.WHITE_FIGURES
      : OCCUPIED_BY.BLACK_FIGURES;
    Object.keys(newBoard).forEach((keyIndex) => {
      newBoard[keyIndex].isReachable = false;
    });
    setBoard(newBoard);

    //Setting the figures
    if (isWhiteTurn && !hasPawnReachedEndHelper) {
      setWhiteFigures((prev) => {
        return {
          ...prev,
          [clickedFigure.role]: {
            ...prev[clickedFigure.role as keyof typeof prev],
            positionX: newX !== 0 ? newX : 8,
            positionY: newY,
          },
          ...(castExchange.current?.isBottomRightRook &&
            position === 63 && {
              ["rightRook"]: { ...prev["rightRook"], positionX: 6 },
            }),
          ...(castExchange.current?.isBottomLeftRook &&
            position === 58 && {
              ["leftRook"]: { ...prev["leftRook"], positionX: 3 },
            }),
        };
      });
    }

    if (isWhiteTurn && hasPawnReachedEndHelper) {
      setWhiteFigures((prev) => {
        return {
          ...prev,
          [clickedFigure.role]: {
            ...initialWhiteFigures.queen,
            positionX: newX !== 0 ? newX : 8,
            positionY: newY,
            role: clickedFigure.role,
          },
        };
      });
    }

    if (isWhiteTurn && wasAttacked) {
      let attackedFigure = Object.values(blackFigures).find(
        ({ positionX, positionY }) => {
          return positionX === (newX !== 0 ? newX : 8) && positionY === newY;
        }
      );
      //if the attacked figure was a pawn on diagonal
      if (!attackedFigure) {
        attackedFigure = Object.values(blackFigures).find(
          ({ positionX, positionY }) => {
            return (
              positionX === (newX !== 0 ? newX : 8) && positionY === newY + 1
            );
          }
        );
      }
      if (attackedFigure && attackedFigure.role) {
        setBlackFigures((prev) => {
          return {
            ...prev,
            [attackedFigure?.role as keyof typeof prev]: {
              ...prev[attackedFigure?.role as keyof typeof prev],
              isAlive: false,
            },
          };
        });
      }
    }

    if (!isWhiteTurn && !hasPawnReachedEndHelper) {
      setBlackFigures((prev) => {
        return {
          ...prev,
          [clickedFigure.role]: {
            ...prev[clickedFigure.role as keyof typeof prev],
            positionX: newX !== 0 ? newX : 8,
            positionY: newY,
          },
          ...(castExchange.current?.isTopRightRook &&
            position === 7 && {
              ["rightRook"]: { ...prev["rightRook"], positionX: 6 },
            }),
          ...(castExchange.current?.isTopLeftRook &&
            position === 2 && {
              ["leftRook"]: { ...prev["leftRook"], positionX: 3 },
            }),
        };
      });
    }

    if (!isWhiteTurn && hasPawnReachedEndHelper) {
      setBlackFigures((prev) => {
        return {
          ...prev,
          [clickedFigure.role]: {
            ...initialBlackFigures.queen,
            positionX: newX !== 0 ? newX : 8,
            positionY: newY,
            role: clickedFigure.role,
          },
        };
      });
    }

    if (!isWhiteTurn && wasAttacked) {
      let attackedFigure = Object.values(whiteFigures).find(
        ({ positionX, positionY }) => {
          return positionX === (newX !== 0 ? newX : 8) && positionY === newY;
        }
      );
      //if the attacked figure was a pawn on diagonal
      if (!attackedFigure) {
        attackedFigure = Object.values(whiteFigures).find(
          ({ positionX, positionY }) => {
            return (
              positionX === (newX !== 0 ? newX : 8) && positionY === newY - 1
            );
          }
        );
      }
      if (attackedFigure && attackedFigure.role) {
        setWhiteFigures((prev) => {
          return {
            ...prev,
            [attackedFigure?.role as keyof typeof prev]: {
              ...prev[attackedFigure?.role as keyof typeof prev],
              isAlive: false,
            },
          };
        });
      }
    }
    setClickedFigure(undefined);
    setIsWhiteTurn((prev) => !prev);
  };

  const restoreChess = () => {
    setBoard(initialBoard);
    setWhiteFigures(initialWhiteFigures);
    setBlackFigures(initialBlackFigures);
    setIsWhiteTurn(true);
    setClickedFigure(undefined);
    setHasPawnReachedEnd(false);
    castExchange.current = undefined;
    temporaryWhitePawnPosition.current = undefined;
    temporaryBlackPawnPosition.current = undefined;
    previousStates.current = [];
  };

  const handleNotificationClick = () => {
    if (hasPawnReachedEnd) {
      setHasPawnReachedEnd(false);
      return;
    }
    setIsGameOver(false);
    restoreChess();
  };

  const handleBackClick = () => {
    if (previousStates.current.length === 2) {
      restoreChess();
      return;
    }
    previousStates.current.splice(previousStates.current.length - 2, 2);
    const state = previousStates.current[previousStates.current.length - 1];
    setBoard(state.board);
    setWhiteFigures(state.whiteFigures);
    setBlackFigures(state.blackFigures);
    temporaryWhitePawnPosition.current = state.temporaryWhitePawnPosition;
    temporaryBlackPawnPosition.current = state.temporaryBlackPawnPosition;
  };

  useEffect(() => {
    const isWhitePlayerAlive = Object.values(whiteFigures).find(
      ({ role }) => role === "king"
    )?.isAlive;
    const isBlackPlayerAlive = Object.values(blackFigures).find(
      ({ role }) => role === "king"
    )?.isAlive;
    if (!isWhitePlayerAlive || !isBlackPlayerAlive) {
      setIsGameOver(true);
    }
  }, [whiteFigures, blackFigures]);

  useEffect(() => {
    if (isMoving) {
      const state = {
        board,
        whiteFigures,
        blackFigures,
        temporaryWhitePawnPosition: temporaryWhitePawnPosition.current,
        temporaryBlackPawnPosition: temporaryBlackPawnPosition.current,
      };
      previousStates.current.push(state);
      setIsMoving(false);
    }
  }, [board, whiteFigures, blackFigures, isMoving]);

  return (
    <>
      {(hasPawnReachedEnd || isGameOver) && (
        <div className="w-full h-full fixed z-30">
          <div
            style={{ background: "rgba(239, 239, 240, 0.6)" }}
            className="w-[300px] h-[300px] mx-auto mt-[200px] flex flex-col justify-center items-center border border-2"
          >
            <p className="mx-2 text-center text-xl">
              {isGameOver
                ? `Player ${isWhiteTurn ? "2" : "1"} won`
                : "You will convert a pawn into a queen"}
            </p>
            <button
              onClick={handleNotificationClick}
              className="bg-[black] text-white w-[150px] py-1 rounded mt-5"
            >
              Ok
            </button>
          </div>
        </div>
      )}
      <div className="w-full py-2 grid grid-cols-3">
        <button
          disabled={previousStates.current.length < 2}
          onClick={handleBackClick}
          className={classNames("w-auto max-w-fit col-end-1 translate-x-3", {
            "text-[#969696]": previousStates.current.length < 2,
            "hover:underline": previousStates.current.length >= 2,
          })}
        >
          Back
        </button>
        <button
          className="max-w-fit mx-auto col-start-2 hover:underline"
          onClick={restoreChess}
        >
          Reset
        </button>
      </div>
      <div
        className={classNames("w-full h-screen flex items-center bg-[#f5f5f5]")}
      >
        <div
          className={classNames(
            "relative m-auto w-[480px] h-[480px] bg-white grid grid-cols-8 grid-rows-8"
          )}
        >
          <Figures
            figures={blackFigures}
            isWhiteTurn={isWhiteTurn}
            handleFigureClicked={handleFigureClicked}
          />
          <Board
            board={board}
            clickedFigure={clickedFigure}
            handleMoveFigure={handleMoveFigure}
          />
          <Figures
            areWhiteFigures
            figures={whiteFigures}
            isWhiteTurn={isWhiteTurn}
            handleFigureClicked={handleFigureClicked}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
