import React from 'react';

const InputBox = ({label,type,onChange}) => {
    return (
            <div>
                {label}
                <br />
                <input onChange = {onChange} className='border border-black' type={type} />
            </div>
    );
};

export default InputBox;
