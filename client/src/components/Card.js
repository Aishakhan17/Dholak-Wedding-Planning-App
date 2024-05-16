import React from 'react'

const Card = ({title}) => {
  return (
    <div className='bg-white h-80'>
        <h1 className='text-center text-xl font-bold leading-9 tracking-tight text-foreground self-center p-1'>{title}</h1>
    </div>
  )
}

export default Card