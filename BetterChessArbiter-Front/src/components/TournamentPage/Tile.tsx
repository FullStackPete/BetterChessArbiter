import { ReactNode } from "react";
import Icon from "../Icon";
type TileProps = {
  children: ReactNode;
  bgColor: string;
  className?: string;
};

type TournamentBasicTileProps = {
  topIcon: string;
  topText: string;
  result: ReactNode;
  tileColor: string;
  textCenter?: boolean;
};

function Tile({ children, className, bgColor }: TileProps) {
  return (
    <div
      className={`rounded-md shadow-lg m-4 p-4 ${className}`}
      style={{backgroundColor:'#'+bgColor}}
    >
      {children}
    </div>
  );
}

function TournamentBasicTile({
  topIcon,
  topText,
  result,
  tileColor,
  textCenter,
}: TournamentBasicTileProps) {
  return (
    <Tile bgColor={tileColor} className="border-2 border-gray-200">
      <div className="flex flex-row items-center">
        <Icon Icon={topIcon} className="mr-2" />
        <p className="text-base">{topText}:</p>
      </div>
      <div className={`font-medium text-lg ${textCenter ? "text-center" : ""}`}>{result}</div>
    </Tile>
  );
}

export { Tile, TournamentBasicTile };
