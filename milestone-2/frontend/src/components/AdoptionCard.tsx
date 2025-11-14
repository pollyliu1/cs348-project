type AdoptionCardProps = {
	nickname: string;
	description: string;
};

export default function AdoptionCard({
	nickname,
	description,
}: AdoptionCardProps) {
	return (
		<div className='bg-white rounded-2 col-span-1 p-4 shadow-md flex flex-col justify-center'>
			<div className='text-gray-800 text-xl font-bold mb-2'>{nickname}</div>
			<div className='text-gray-700 mb-4'>{description}</div>
			<button className='bg-blue-500 text-white px-4 py-2 rounded-2 hover:bg-blue-600 w-fit'>
				Adopt Me
			</button>
		</div>
	);
}
