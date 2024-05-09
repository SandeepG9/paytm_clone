import React from "react";

function Heading({label})
{
    return(
    <>
        <h1 className="text-4xl font-bold">
            {label}
        </h1>
    </>)
}

export default Heading