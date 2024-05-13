import React from "react";
function CardComponent({username="Sandeep",amount="450"})
{
    const firstLetter = username[0];

    return(
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10 mt-5">
            <h1 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Send Money</h1>
            <div className="flex items-center mt-10 justify-center w-10 h-10 bg-green-500 text-white font-bold rounded-full">
                {firstLetter}
            </div>
            <h5 className="mb-1 text-xl font-medium font-bold dark:text-white">{username}</h5>
            <span className="text-sm  font-bold">Amount (in Rs)</span>
            <input type="text" className="mt-3 form-input border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 rounded-md p-2 outline-none" placeholder="Enter amount"/>
            <div className="flex mt-4 md:mt-6">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Initiate Transfer</a>
            </div>
        </div>
    </div>
</div>



        </>
    )
}

export default CardComponent