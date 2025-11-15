import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@chakra-ui/react";
import { ApiAdoptablePokemon } from "../types";
import AdoptionCard from "../components/AdoptionCard";
import AdoptionForm from "@/components/AdoptionForm";
import AlertComponent from "@/components/ui/AlertComponent";
import { POKEMON_TYPES } from "@/constants/types";

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
  {
    pid: 3,
    pokedex_number: 4,
    name: "Charmander",
    nickname: "Poke 2",
    description: "This is a description for Poke 2.",
    status: true,
    date_added: Date.now(),
  },
  {
    pid: 4,
    pokedex_number: 10,
    name: "Charmander",
    nickname: "Poke 2",
    description: "This is a description for Poke 2.",
    status: true,
    date_added: Date.now(),
  },
  {
    pid: 4,
    pokedex_number: 10,
    name: "Charmander",
    nickname: "Poke 2",
    description: "This is a description for Poke 2.",
    status: true,
    date_added: Date.now(),
  },
  {
    pid: 4,
    pokedex_number: 10,
    name: "Charmander",
    nickname: "Poke 2",
    description: "This is a description for Poke 2.",
    status: true,
    date_added: Date.now(),
  },
  {
    pid: 4,
    pokedex_number: 10,
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
  // /api/adoptable-pokemon
  const [adoptablePokemon, setAdoptablePokemon] = useState(
    [] as ApiAdoptablePokemon[]
  );

  const getAdoptablePokemons = () => {
    fetch("/api/adoptable-pokemon")
      .then((res) => res.json())
      .then((res) =>
        res.map((pok: { date_added: string }) => ({
          ...pok,
          date_added: Date.parse(pok.date_added),
        }))
      )
      .then((data) => {
        setAdoptablePokemon(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAdoptablePokemons();
  }, []);

  const validatePokemonName = () => {
    // api call to validate pokemon name exists in master table?
    // /api/validate-pokemon?name=${name}
  };
  // ADD POKEMON TO DATABASE
  async function handleSubmit(data: {
    nickname: string;
    name: string;
    description: string;
  }) {
    // api call to put up for adoption
    try {
      const response = await fetch("/api/add-pokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add new Pokemon");
      }

      const result = await response.json();
      console.log("Success:", result);

      getAdoptablePokemons();
      // Better alternative:
      // setAdoptablePokemon((prev) => [...prev, result.newPokemon]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen overflow-scroll">
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
        <div className="w-full overflow-scroll grid grid-cols-1 sm:grid-cols-2 gap-4 m-8 p-10 max-h-[60%]">
          {adoptablePokemon.map((pokemon) => (
            <AdoptionCard
              key={pokemon.pid}
              pid={pokemon.pid}
              nickname={pokemon.nickname}
              name={pokemon.name}
              description={pokemon.description}
			  			status={pokemon.status}
              onResults={(data: { pid: number }) => {
                setAdoptablePokemon(
                  (prev) =>
                    (console.log(prev, data), prev.map((pok: { pid: number }) =>
                      pok.pid === data.pid ? { ...pok, ...data } : pok
                    ) as ApiAdoptablePokemon[])
                );
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Adopt;
