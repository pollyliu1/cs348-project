"use client";
import { ReactNode } from "react";
import { Dialog, Portal, CloseButton } from "@chakra-ui/react";

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
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
        >
          <Dialog.Content
            maxW="lg"
            bg="#262626"
            color="white"
            border={"2px solid white"}
            borderRadius="md"
            p={4}
          >
            <Dialog.Body mt={2}>{children}</Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" top={2} right={2} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
