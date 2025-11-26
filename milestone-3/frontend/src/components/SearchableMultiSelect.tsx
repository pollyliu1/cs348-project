import { useState, useRef, useMemo, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchableMultiSelectProps {
	options: readonly string[];
	selectedItems: string[];
	onSelectionChange: (newSelection: string[]) => void;
	placeholder?: string;
}

export default function SearchableMultiSelect({
	options,
	selectedItems,
	onSelectionChange,
	placeholder = 'Search and select abilities...',
}: SearchableMultiSelectProps) {
	const [inputValue, setInputValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const filteredOptions = useMemo(() => {
		if (!inputValue) {
			return options.filter((item) => !selectedItems.includes(item));
		}

		return options.filter(
			(item) =>
				item.toLowerCase().includes(inputValue.toLowerCase()) &&
				!selectedItems.includes(item)
		);
	}, [inputValue, options, selectedItems]);

	const handleSelect = (item: string) => {
		if (!selectedItems.includes(item)) {
			onSelectionChange([...selectedItems, item]);
			setInputValue('');
			setIsOpen(false);
		}
	};

	const handleRemove = (itemToRemove: string) => {
		onSelectionChange(selectedItems.filter((item) => item !== itemToRemove));
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='w-full relative' ref={wrapperRef}>
			<div className='relative'>
				<FiSearch
					size={14}
					className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
				/>
				<input
					type='text'
					placeholder={placeholder}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						setIsOpen(true);
					}}
					onFocus={() => setIsOpen(true)}
					className='appearance-none rounded-1.5 w-full pl-8 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:placeholder:text-gray-300 disabled:border-gray-200'
					disabled={selectedItems.length >= 3}
				/>
			</div>
			{isOpen && (inputValue || filteredOptions.length > 0) && (
				<div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((item) => (
							<button
								key={item}
								type='button'
								onClick={() => handleSelect(item)}
								className='w-full text-left px-4 py-2 hover:bg-indigo-50 transition duration-150 text-gray-800 disabled:text-gray-400 disabled:hover:bg-white'
							>
								{item}
							</button>
						))
					) : (
						<div className='px-4 py-3 text-gray-500 italic text-center'>
							No abilities match "{inputValue}".
						</div>
					)}
				</div>
			)}
			{selectedItems.length > 0 && (
				<div className='flex flex-wrap gap-2 my-2 min-h-[30px]'>
					{selectedItems.map((item) => (
						<div
							key={item}
							className='flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm transition duration-150'
						>
							{item}
							<button
								type='button'
								onClick={() => handleRemove(item)}
								className='ml-2 text-indigo-700 hover:text-indigo-900 transition duration-150'
								aria-label={`Remove ${item}`}
							>
								<FiX size={14} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
