import { initialWhiteFigures, initialBlackFigures } from "../pages/index";
import classNames from "classnames";

type FiguresProps = {
  areWhiteFigures?: boolean;
  figures: typeof initialWhiteFigures | typeof initialBlackFigures;
  isWhiteTurn: boolean;
  handleFigureClicked: (
    figure: string,
    positionX: number,
    positionY: number,
    role: string
  ) => void;
};

export const Figures = ({
  areWhiteFigures = false,
  figures,
  isWhiteTurn,
  handleFigureClicked,
}: FiguresProps) => {
  return (
    <>
      {Object.values(figures).map(
        ({ isAlive, figure, positionX, positionY, role, image }, index) => {
          if (isAlive) {
            return (
              <button
                key={index}
                onClick={() =>
                  handleFigureClicked(figure, positionX, positionY, role)
                }
                style={{
                  top: positionY * 60 - 57,
                  left: positionX * 60 - 57,
                }}
                className={classNames(
                  "border border-transparent border-[4px] rounded absolute",
                  "flex items-center justify-center focus:border focus:border-[#14b8a6] focus:border-[4px]",
                  {
                    "z-10": !areWhiteFigures,
                    "pointer-events-none":
                      (isWhiteTurn && !areWhiteFigures) ||
                      (!isWhiteTurn && areWhiteFigures),
                  }
                )}
              >
                {image}
              </button>
            );
          }
        }
      )}
    </>
  );
};
