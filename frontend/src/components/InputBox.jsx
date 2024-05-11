import React from 'react';

const InputBox = ({label,type,onChange}) => {
    return (
            <div>
                {label}
                <br />
                <input onChange = {onChange} className='rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500' type={type} />
            </div>
    );
};

export default InputBox;
