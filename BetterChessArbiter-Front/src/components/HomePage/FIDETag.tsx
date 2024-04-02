import Icon from "../Icon";

type FIDETagType = {
    isFide:boolean;
}
function FIDETag({isFide}:FIDETagType) {
    
    return ( 
    
    isFide && <div className="flex bg-[#EFE5DC] px-2 py-1 font-medium text-lg items-center max-w-fit rounded-md">
        FIDE<Icon className="text-black" Icon="check"/>
    </div> );
}

export default FIDETag;