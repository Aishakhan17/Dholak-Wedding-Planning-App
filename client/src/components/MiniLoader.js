import React from 'react'

const MiniLoader = () => {
  return (
    <div>
        <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}

export default MiniLoader