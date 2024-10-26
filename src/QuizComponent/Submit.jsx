import React from 'react'

const Submit = (onClick) => {
    const onClickHandle = () => {
        onClick();
    }
    return (
        <div>
            <button onClick={onClickHandle}>
                答え合わせ
            </button>
        </div>
    )
}

export default Submit