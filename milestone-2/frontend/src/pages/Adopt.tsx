import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@chakra-ui/react";
import AdoptionCard from "../components/AdoptionCard";
import AdoptionForm from "@/components/AdoptionForm";
import AlertComponent from "@/components/ui/AlertComponent";

const dummyPokemon = [
  {
    pid: 1,
    pokedex_number: 2,
    nickname: "Poke 1",
    name: "Bulbasaur",
    description: "This is a description for Poke 1.",
    status: true,
    date_added: Date.now(),
  },
  {
    pid: 2,
    pokedex_number: 3,
    name: "Charmander",
    nickname: "Poke 2",
    description: "This is a description for Poke 2.",
    status: true,
    date_added: Date.now(),
  },
];
const Adopt = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // API CALL
  const [adoptablePokemon, setAdoptablePokemon] = useState(dummyPokemon);
  const validatePokemonName = () => {
    // api call to validate pokemon name exists in master table?
  };
  // ADD POKEMON TO DATABASE
  async function handleSubmit(data: {
    nickname: string;
    pokemonName: string;
    description: string;
  }) {
    // api call to put up for adoption
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-5xl text-center font-semibold mt-8">
          Adoption Center
        </h1>
        <p className="text-center text-gray-50 text-xl mb-4">
          Adopt a Pokémon!
        </p>
        <Button
          type="button"
          className="flex ring-white ring-1 px-8 py-6 rounded-12 justify-self-center mt-4"
          onClick={openModal}
        >
          Add New Pokémon
        </Button>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <AdoptionForm handleSubmit={handleSubmit} onClose={closeModal} />
        </Modal>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 m-8 p-10">
          {adoptablePokemon.map((pokemon) => (
            <AdoptionCard
              key={pokemon.pid}
              nickname={pokemon.nickname}
              name={pokemon.name}
              description={pokemon.description}
              onResults={setAdoptablePokemon}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Adopt;
