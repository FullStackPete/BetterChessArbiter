import { MouseEventHandler } from "react";

type Props = {
className?: string,
Icon:string,
onClick?:MouseEventHandler<HTMLSpanElement>
}

function Icon({className,onClick, Icon}:Props) {
    return ( <span onClick={onClick} className={`material-symbols-outlined ` + className}>{Icon}</span> );
}

export default Icon;