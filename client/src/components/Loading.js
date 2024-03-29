import { MutatingDots } from "react-loader-spinner"

const Loading = () => {
  return (
    <div
        className="mt-20 flex flex-col min-h-full"
    >   
        <h2 className="mt-24 text-center text-2xl font-bold leading-9 tracking-tight text-white">Just a minute...</h2>
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#ffa400"
            secondaryColor="#ffa400"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="self-center justify-center"
        />
    </div>
    )
}

export default Loading