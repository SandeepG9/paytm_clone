import React from "react";

function ButtonComponent({label,type})
{
    return(
        <div className="m-2">
            <button className="p-2 br-2 rounded-lg bg-black text-white w-full" type={type}>{label}</button>
        </div>
    )
}

export default ButtonComponent