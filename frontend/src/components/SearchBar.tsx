import React, { useState } from 'react';
import type { ApiPokemon } from '../types';
import { POKEMON_TYPES } from '@/constants/types';
import { FiSearch } from 'react-icons/fi';

type Props = {
	onResults?: (rows: ApiPokemon[]) => void;
	onStart?: () => void;
	onError?: (msg: string) => void;
	typesSelected: string[];
	sortBy: string;
};

export default function SearchBar({
	onResults,
	onStart,
	onError,
	typesSelected,
	sortBy,
}: Props) {
	const [q, setQ] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!q.trim()) {
			onResults?.([]);
			return;
		}
		try {
			onStart?.();
			setLoading(true);
			const url = new URL('/api/search-pokemon', window.location.origin);
			url.searchParams.set('name', q);
			(typesSelected.length === 0 ? POKEMON_TYPES : typesSelected).forEach(
				(type) => url.searchParams.append('type', type.toLowerCase())
			);
			url.searchParams.set(
				'order',
				sortBy === 'Unsorted'
					? 'unsorted'
					: sortBy === 'Happiness Ascending'
						? 'asc'
						: 'desc'
			);
			const r = await fetch(url.toString());
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			const data = (await r.json()) as ApiPokemon[];
			console.log(data);
			onResults?.(data);
		} catch {
			onError?.('Search failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex gap-2'>
			<div className='relative w-full'>
				<FiSearch
					size={14}
					className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
				/>
				<input
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder='Search by name (e.g., Pikachu)'
					aria-label='Search by name'
					className='bg-white text-gray-800 appearance-none rounded-1.5 w-full pl-8 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:placeholder:text-gray-300 disabled:border-gray-200'
				/>
			</div>

			<button
				type='button'
				className='w-fit flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-1.5 text-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-800 disabled:text-gray-600'
				onClick={() => setQ('')}
				disabled={!q}
			>
				Clear
			</button>
			<button
				type='submit'
				className='w-fit flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-1.5 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0'
				disabled={loading}
			>
				Search
			</button>
		</form>
	);
}
