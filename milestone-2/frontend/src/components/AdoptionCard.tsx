import { Button } from "@chakra-ui/react";
import { Modal } from "./ui/modal";
import AdoptionForm from "./AdoptionForm";
import { useState } from "react";
type AdoptionCardProps = {
  nickname: string;
  name: string; // actual pokemon name
  description: string;
  onResults: (data: any[]) => void;
};

export default function AdoptionCard({
  nickname,
  name,
  description,
  onResults,
}: AdoptionCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const updatePokemon = (data: {
    nickname: string;
    pokemonName: string;
    description: string;
  }) => {
    // api call to update pokemon details
  };

  return (
    <>
      <div className="ring-white ring-1 rounded-2 col-span-1 p-8 shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-semibold">{nickname}</h2>
        <p className="mb-2 text-lg text-gray-200">{name}</p>
        <p className="mb-4">{description}</p>
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            className="flex ring-white ring-1 w-32 rounded-12 justify-self-center mt-4"
          >
            Adopt Me
          </Button>
          <Button
            type="button"
            className="flex ring-white bg-black/50 rounded-12 ring-1 w-32 justify-self-center mt-4"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Edit Me
          </Button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AdoptionForm
          handleSubmit={updatePokemon}
          onClose={() => setModalOpen(false)}
          isUpdate
          existingData={{ nickname, pokemonName: name, description }}
        />
      </Modal>
    </>
  );
}
