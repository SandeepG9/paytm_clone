import React from "react";

function ButtonComponent({label,type,onClick})
{
    return(
        <div className="m-2">
            <button onClick={onClick} className="p-2 br-2 rounded-lg bg-black text-white w-full" type={type}>{label}</button>
        </div>
    )
}

export default ButtonComponent