import { FormEvent, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import SearchableMultiSelect from './SearchableMultiSelect';
import { POKEMON_TYPES } from '@/constants/types';
import { POKEMON_ABILITIES } from '@/constants/abilities';
import { useAuth } from '@/context/AuthContext';

export default function ProfileSetupForm() {
	const { setIsSettingUp } = useAuth();
	const [prefAbilities, setPrefAbilities] = useState<string[]>([]);
	const [prefTypes, setPrefTypes] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// api call to POST user prefs
		try {
		} catch (e) {
		} finally {
			setIsLoading(false);
			setIsSettingUp(false);
		}
	};
	return (
		<div className='h-screen flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-white rounded-3 p-10 space-y-6'>
				<div className='flex flex-col items-center gap-2'>
					<h2 className='mt-3 text-3xl font-extrabold text-gray-900'>
						Set Your Adoption Preferences
					</h2>
					<p className='text-gray-800'>
						Tell us your preferred Types and Abilities so we can introduce you
						to your ideal Pokémon friend.
					</p>
				</div>
				<form className='space-y-4' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1.5'>
						<label htmlFor='name' className='text-sm text-gray-900 font-medium'>
							Step 1: Select up to 3 preferred types
						</label>
						<SearchableMultiSelect
							placeholder='Search and select types...'
							options={POKEMON_TYPES}
							selectedItems={prefTypes}
							onSelectionChange={(newSelection) => setPrefTypes(newSelection)}
						/>
					</div>
					<div className='flex flex-col gap-1.5'>
						<label htmlFor='name' className='text-sm text-gray-900 font-medium'>
							Step 2: Select up to 3 preferred abilities
						</label>
						<SearchableMultiSelect
							placeholder='Search and select abilities...'
							options={POKEMON_ABILITIES}
							selectedItems={prefAbilities}
							onSelectionChange={(newSelection) =>
								setPrefAbilities(newSelection)
							}
						/>
					</div>
					<div>
						<button
							type='submit'
							className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-1.5 text-white ${
								isLoading
									? 'bg-indigo-400 cursor-not-allowed'
									: 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							}`}
							disabled={isLoading}
						>
							{isLoading ? (
								<FiLoader className='animate-spin h-5 w-5 text-white' />
							) : (
								'Start Adopting'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
