import React from 'react';
const Error = (props)=>{
    const { message } = props;
    return (
        <>
            <p>{message}</p>
        </>
    )
}
export default Error;