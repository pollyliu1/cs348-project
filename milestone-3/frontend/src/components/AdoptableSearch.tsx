import React, { useContext, useEffect, useState } from 'react';
import type { ApiAdoptablePokemon } from '../types';
import { Switch } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthContext';
import { FiSearch } from 'react-icons/fi';

type Props = {
	onResults?: (rows: ApiAdoptablePokemon[]) => void;
	onStart?: () => void;
};

export default function AdoptableSearch({ onResults, onStart }: Props) {
	const [q, setQ] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [relevanceSelected, setRelevanceSelected] = useState<boolean>(true);
	const [onlyMyPokemonSelected, setOnlyMyPokemonSelected] =
		useState<boolean>(false);

	const { userId, isAdmin } = useAuth();

	const fetchResults = async () => {
		setLoading(true);

		try {
			const url = new URL(
				'/api/search-adoptable-pokemon',
				window.location.origin
			);
			url.searchParams.set('name', q);
			url.searchParams.set('uid', userId || '');
			url.searchParams.set(
				'order',
				relevanceSelected ? 'relevance' : 'compatibility'
			);
			url.searchParams.set('all', (!onlyMyPokemonSelected).toString());
			const response = await fetch(url);

			if (!response.ok) {
				console.log('error is: ', await response.text());
			}

			const x = await response.json();
			onStart?.();
			onResults?.(x);
		} catch (err: any) {
			console.log(err.toString());
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchResults();
	}, [relevanceSelected, onlyMyPokemonSelected]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await fetchResults();
	}

	return (
		<div className='mx-4'>
			<form onSubmit={handleSubmit} className='flex gap-3'>
				<div className='relative w-full'>
					<FiSearch
						size={14}
						className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
					/>
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder='Search anything'
						aria-label='Search anything'
						className='bg-white text-gray-800 appearance-none rounded-1.5 w-full pl-8 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:placeholder:text-gray-300 disabled:border-gray-200'
					/>
				</div>
				<button
					type='submit'
					className='flex justify-center py-2 px-6 border border-transparent text-md font-medium rounded-1.5 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0'
					disabled={loading}
				>
					{loading ? 'Searching…' : 'Search'}
				</button>
			</form>
			<div className='mb-8 mt-4 ml-2 flex gap-4'>
				{!isAdmin && (
					<>
						<Switch.Root
							checked={!relevanceSelected}
							onCheckedChange={(e) => setRelevanceSelected(!e.checked)}
						>
							<Switch.HiddenInput />
							<Switch.Control className='ring-1 ring-white text-white'>
								<Switch.Thumb />
							</Switch.Control>
							<Switch.Label>
								Sort by {relevanceSelected ? 'Relevance' : 'Compatibility'}
							</Switch.Label>
						</Switch.Root>

						<Switch.Root
							checked={onlyMyPokemonSelected}
							onCheckedChange={(e) => setOnlyMyPokemonSelected(e.checked)}
						>
							<Switch.HiddenInput />
							<Switch.Control className='ring-1 ring-white text-white'>
								<Switch.Thumb />
							</Switch.Control>
							<Switch.Label>
								{onlyMyPokemonSelected ? 'Only My Pokémon' : 'All Pokémon'}
							</Switch.Label>
						</Switch.Root>
					</>
				)}
			</div>
		</div>
	);
}
