import { PropsWithChildren, ReactNode } from "react";
type SectionContainerType  ={
    children:ReactNode,
    background:string,
}
function SectionContainer({children, background}:SectionContainerType) {
    return ( <div style={{backgroundColor:background}} className="flex flex-col justify-center m-4 p-2 rounded-lg">{children}</div> );
}

export default SectionContainer;