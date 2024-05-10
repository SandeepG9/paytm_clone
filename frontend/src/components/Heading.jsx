import React from "react";

function Heading({label})
{
    return(
    <div>        
        <h1 className="text-4xl font-bold m-2">
            {label}
        </h1>
    </div>
    );

}

export default Heading