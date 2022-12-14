import classNames from "classnames";
import { initialBoard } from "../pages/index";

type BoardProps = {
  board: typeof initialBoard;
  clickedFigure:
    | {
        figure: string;
        positionX: number;
        positionY: number;
        role: string;
      }
    | undefined;
  handleMoveFigure: (isReachable: boolean, index: number) => void;
};

export const Board = ({
  board,
  clickedFigure,
  handleMoveFigure,
}: BoardProps) => {
  return (
    <>
      {Object.values(board).map((el, index: number) => {
        const row = Math.floor(index / 8) + 1;
        return (
          <div
            key={index}
            onClickCapture={() => handleMoveFigure(el.isReachable, index + 1)}
            className={classNames("relative", {
              "bg-[#d4d4d4]":
                (index % 2 === 0 && row % 2 === 0) ||
                (index % 2 === 1 && row % 2 === 1),
              "cursor-pointer": clickedFigure && el.isReachable,
            })}
          >
            {index + 1}
            {clickedFigure && el.isReachable && (
              <div className="h-[10px] w-[10px] z-20 rounded-full bg-[#14b8a6] m-auto absolute top-[25px] left-[14px] sm:left-[25px]" />
            )}
          </div>
        );
      })}
    </>
  );
};
