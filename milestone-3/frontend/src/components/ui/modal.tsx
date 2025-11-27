'use client';
import { ReactNode } from 'react';
import { Dialog, Portal, CloseButton } from '@chakra-ui/react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner
					display='flex'
					alignItems='center'
					justifyContent='center'
					minH='100vh'
				>
					<Dialog.Content className='w-full max-w-md bg-white rounded-3 p-5 space-y-6'>
						<Dialog.Body mt={2}>{children}</Dialog.Body>
						<Dialog.CloseTrigger asChild>
							<CloseButton
								position='absolute'
								top={0}
								right={4}
								className='text-gray-500 hover:text-gray-800'
							/>
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
