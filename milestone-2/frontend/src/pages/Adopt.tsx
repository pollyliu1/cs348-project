import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input, Field } from '@chakra-ui/react';
import AdoptionCard from '../components/AdoptionCard';

const dummyPokemon = [
	{
		pid: 1,
		pokedex_number: 2,
		nickname: 'Poke 1',
		description: 'This is a description for Poke 1.',
		status: true,
		date_added: Date.now(),
	},
	{
		pid: 2,
		pokedex_number: 3,
		nickname: 'Poke 2',
		description: 'This is a description for Poke 2.',
		status: true,
		date_added: Date.now(),
	},
];
const Adopt = () => {
	const [isAdding, setIsAdding] = useState(false);
	const [nickname, setNickname] = useState('');
	const [description, setDescription] = useState('');
	const [pokemon, setPokemon] = useState('');

	const openModal = () => setIsAdding(true);
	const closeModal = () => setIsAdding(false);
	const validatePokemonName = () => {
		// api call to validate pokemon name exists in master table?
	};
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// api call to put up for adoption
	}
	return (
		<>
			<div className='flex flex-col justify-center items-center h-screen w-screen'>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-1 hover:bg-blue-600 w-fit'
					onClick={openModal}
				>
					Add New Pokemon
				</button>
				<Modal isOpen={isAdding} onClose={closeModal}>
					<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
						<div className='font-bold text-xl'>
							Add New Pokemon for Adoption
						</div>
						<div className='flex flex-col gap-1'>
							<label className='block text-sm font-medium mb-1'>Nickname</label>
							<input
								type='text'
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								placeholder='Enter nickname'
								className='p-2 border border-gray-300 rounded-1 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>
						<div className='flex flex-col gap-1'>
							<label className='block text-sm font-medium mb-1'>
								Description
							</label>
							<textarea
								placeholder='Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className='p-2 border border-gray-300 rounded-1 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>
						<div className='flex flex-col gap-1'>
							<label className='block text-sm font-medium mb-1'>Pokemon</label>
							<input
								type='text'
								value={pokemon}
								onChange={(e) => setPokemon(e.target.value)}
								placeholder='Enter pokemon name'
								className='p-2 border border-gray-300 rounded-1 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>
						<button
							type='submit'
							className='bg-blue-500 text-white px-4 py-2 rounded-1 hover:bg-blue-600'
						>
							Add Pokémon
						</button>
					</form>
				</Modal>
				<div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 m-8 p-10'>
					{dummyPokemon.map((pokemon) => (
						<AdoptionCard
							key={pokemon.pid}
							nickname={pokemon.nickname}
							description={pokemon.description}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Adopt;
