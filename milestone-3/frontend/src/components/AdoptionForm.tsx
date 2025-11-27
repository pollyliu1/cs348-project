import React from 'react';
import { Field, Input, Textarea, Button } from '@chakra-ui/react';

type AdoptionFormProps = {
	handleSubmit: (data: {
		nickname: string;
		name: string;
		description: string;
	}) => void | Promise<void>;
	isUpdate?: boolean;
	onClose?: () => void;
	existingData?: {
		nickname: string;
		name: string;
		description: string;
	};
	onDelete?: () => void;
};

const AdoptionForm = ({
	handleSubmit,
	isUpdate = false,
	onClose,
	existingData,
	onDelete,
}: AdoptionFormProps) => {
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const nickname = formData.get('nickname') as string;
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		handleSubmit({ nickname, name, description });
		onClose?.();
	};

	return (
		<>
			<div className='flex flex-col items-center'>
				<h2 className='mb-3 mt-4 text-3xl font-extrabold text-gray-900'>
					{isUpdate ? 'Update Pokemon Details' : 'Add New Pokemon for Adoption'}
				</h2>
			</div>
			<form className='space-y-4' onSubmit={onSubmit}>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='nickname'
						className='text-sm text-gray-900 font-medium'
					>
						Nickname
					</label>
					<input
						id='nickname'
						name='nickname'
						type='text'
						required
						defaultValue={existingData?.nickname}
						placeholder='Enter nickname'
						className='bg-white appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='name' className='text-sm text-gray-900 font-medium'>
						Pokémon Name
					</label>
					<input
						id='name'
						name='name'
						type='text'
						required
						defaultValue={existingData?.name}
						placeholder='Enter Pokémon name'
						className='bg-white appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='name' className='text-sm text-gray-900 font-medium'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						required
						defaultValue={existingData?.description}
						placeholder='Enter description'
						className='bg-white appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>
				<div className='flex justify-between w-full'>
					<button
						type='button'
						onClick={onClose}
						className='w-fit flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-1.5 text-gray-500/80 bg-gray-200 hover:bg-gray-300 transition-colors'
					>
						Cancel
					</button>
					<div className='flex flex-grow gap-2 justify-end'>
						{isUpdate && (
							<button
								type='button'
								onClick={() => onDelete?.()}
								className='w-fit flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-1.5 text-white bg-red-400/50 hover:bg-red-400/70 transition-colors'
							>
								Delete
							</button>
						)}
						<button
							type='submit'
							className={`w-fit flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-1.5 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
						`}
						>
							{isUpdate ? 'Update' : 'Add Pokémon'}
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AdoptionForm;
