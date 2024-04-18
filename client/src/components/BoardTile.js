const BoardTile = ({title, cover, ownerUserName, ownerId, createdAt, boardId}) => {
    return (
        <div className='flex flex-col w-44 h-content'>
            <div className='flex flex-col'>
                <img src={cover}/>
                <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"><a href={`/board/${boardId}`}>{title}</a></h4>
                <div className='flex flex-row'>
                    <p className="mt-10 text-center text-xs font-bold leading-9 tracking-tight text-white">Created by {ownerUserName}</p>
                    {/* <p className="mt-10 text-center text-xs font-bold leading-9 tracking-tight text-white">{moment(createdAt).format("MMM Do YYYY")}</p> */}
                </div>
            </div>
        </div>
    )
}

export default BoardTile