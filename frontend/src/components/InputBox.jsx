import React from 'react';

const InputBox = ({label,type}) => {
    return (
        <>
            <div>
                {label}
                <br />
                <input className='border border-black' type={type} />
            </div>
        </>
    );
};

export default InputBox;
