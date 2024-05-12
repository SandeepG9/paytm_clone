import React from "react";

function BottomWarningComponent({label,routing})
{

    return(
        <>
            <span>{label}</span>
            <a className="underline underline-offset-1 ..." href={routing}>{routing}</a>
        </>
    )
}

export default BottomWarningComponent;