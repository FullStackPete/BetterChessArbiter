type Props = {
className?: string,
Icon:string,
}

function Icon({className, Icon}:Props) {
    return ( <span className={`material-symbols-outlined ` + className}>{Icon}</span> );
}

export default Icon;