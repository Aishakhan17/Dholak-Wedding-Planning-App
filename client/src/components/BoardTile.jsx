const BoardTile = ({
	title,
	cover,
	ownerFirstName,
	ownerLastName,
	ownerId,
	ownerImage,
	createdAt,
	boardId,
}) => {
	let boardTitle = title.slice(0, 20);
	return (
		<div className="justify-center">
			<div className="mt-5 w-3/4 min-w-3/4 max-w-3/4 h-54 max-h-54 min-h-54 flex flex-col">
				<div className="h-72 min-h-72 max-h-72 w-auto max-w-48 min-w-48 self-center">
					<img
						className="h-full min-h-full mx-auto w-full  rounded-md self-center"
						src={cover}
					/>
				</div>
				<div className="h-20">
					<p className="mt-2 text-xs text-center leading-9 tracking-tight text-white">
						<a href={`/board/${boardId}`}>{boardTitle}..</a>{" "}
					</p>
					<div className="flex flex-row justify-center">
						<img
							className="h-5 w-5 self-center rounded-full"
							src={ownerImage}
						/>
						<p className="ml-2 text-xs self-center leading-9 tracking-tight text-white">
							<a href={`/profile/${ownerId}`}>
								{ownerFirstName} {ownerLastName}
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoardTile;
