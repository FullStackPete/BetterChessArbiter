import { ReactNode } from "react";
import Icon from "../Icon";

type TileTemplateProps = {
  topText: string;
  description?: string;
  iconName: string;
  bg: string;
  href?: string;
  onClickFn?: () => void;
  children?:ReactNode;
  isOption: boolean;
  onIconClick?:()=>void | ((arg1:string)=>void);
};
function TileTemplate({
  topText,
  description,
  iconName,
  onClickFn,
  bg,
  href,
  isOption,
  children,
  onIconClick
}: TileTemplateProps) {
  if (isOption) {
    return (
      <a
        style={{ backgroundColor: bg }}
        className="w-1/2 rounded-lg p-4 shadow-md  m-2"
        href={href}
        onClick={onClickFn}
      >
        <div className="justify-between flex flex-row">
          <p className="font-semibold text-lg">{topText}</p>
          <Icon Icon={iconName} />
        </div>
        <p className="text-sm">{description}</p>
      </a>
    );
  } else {
    return (
      <div
        style={{ backgroundColor: bg }}
        className="w-1/2 rounded-lg p-4 shadow-md m-2"
        onClick={onClickFn}
      >
        <div className="justify-between flex flex-row">
          <p className="font-semibold text-lg">{topText}</p>
          <Icon Icon={iconName} onClick={onIconClick} />
        </div>
        <div className="flex flex-col text-sm">{children}</div>
      </div>
    );
  }
}

export default TileTemplate;
