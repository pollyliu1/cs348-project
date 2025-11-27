import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@chakra-ui/react";
import {
  ApiAdoptablePokemon,
  ApiMostAdoptedPokemon,
  ApiRecentlyAdoptedPokemon,
} from "../types";
import AdoptionCard from "../components/AdoptionCard";
import AdoptionForm from "@/components/AdoptionForm";
import { NumberInput } from "@chakra-ui/react";
import AlertComponent from "@/components/ui/AlertComponent";
import { POKEMON_TYPES } from "@/constants/types";
import { Tabs } from "@chakra-ui/react";
import AdoptableSearch from "@/components/AdoptableSearch";
import { useAuth } from "@/context/AuthContext";

const Adopt = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { isAdmin } = useAuth();

  // API CALLS
  // /api/adoptable-pokemon
  const [adoptablePokemon, setAdoptablePokemon] = useState(
    [] as ApiAdoptablePokemon[]
  );
  // recentlyAdoptedTest to test FE
  const [recentlyAdoptedPokemon, setRecentlyAdoptedPokemon] = useState(
    [] as ApiRecentlyAdoptedPokemon[]
  );
  // mostAdoptedTest to test FE
  const [mostAdoptedPokemon, setMostAdoptedPokemon] = useState(
    [] as ApiMostAdoptedPokemon[]
  );
  const [limit, setLimit] = useState(5);

  // if user changes the limit, refresh the most adopted pokemon list
  const refresh = () => {
    getMostAdoptedPokemons();
  };

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

  const getRecentlyAdoptedPokemons = () => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    fetch("/api/recently-adopted")
      .then((res) => res.json())
      .then((res) =>
        res.map((pok: { date: string }) => ({
          ...pok,
          date: formatter.format(Date.parse(pok.date))
        }))
      )
      .then((data) => {
        setRecentlyAdoptedPokemon(data);
      })
      .catch((err) => console.error(err));
  }
  
  const getMostAdoptedPokemons = () => {
    fetch(`/api/most-adopted?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setMostAdoptedPokemon(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAdoptablePokemons();
    getRecentlyAdoptedPokemons();
    getMostAdoptedPokemons();
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
    <Tabs.Root defaultValue="Adoptable Pokémon" variant="line">
      <div className="flex flex-col justify-center items-center h-screen w-screen overflow-scroll">
        <div className="mt-20 flex justify-end pb-10 items-center flex-col">
          <h1 className="text-5xl text-center font-semibold mt-8">
            Adoption Center
          </h1>
          <p className="text-center text-gray-50 text-xl mb-4">
            Adopt a Pokémon!
          </p>
          <Tabs.List className="flex gap-12">
            <Tabs.Trigger value="Adoptable Pokémon">
              Adoptable Pokémon
            </Tabs.Trigger>
            <Tooltip content="Only admins can view recently adopted Pokémon">
              <Tabs.Trigger value="Recently Adopted" disabled={!isAdmin}>
                Recently Adopted
              </Tabs.Trigger>
            </Tooltip>
            <Tooltip content="Only admins can view most adopted Pokémon">
              <Tabs.Trigger value="Most Adopted" disabled={!isAdmin}>
                Most Adopted
              </Tabs.Trigger>
            </Tooltip>
          </Tabs.List>
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal} >
          <AdoptionForm handleSubmit={handleSubmit} onClose={closeModal} />
        </Modal>
        <div className="h-[60%] w-full p-8 pt-0 overflow-scroll">
          <Tabs.Content value="Adoptable Pokémon">
            <Tooltip content="Only admins can add new Pokémon">
              <Button
                type="button"
                className="flex ring-white ring-1 px-8 py-6 rounded-12 justify-self-center mb-12"
                onClick={openModal}
                disabled={!isAdmin}
              >
                Add New Pokémon
              </Button>
            </Tooltip>
            <AdoptableSearch onResults={(it) => setAdoptablePokemon(it)} />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 h-full p-4 pt-0">
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
                      (prev) => (
                        console.log(prev, data),
                        prev.map((pok: { pid: number }) =>
                          pok.pid === data.pid ? { ...pok, ...data } : pok
                        ) as ApiAdoptablePokemon[]
                      )
                    );
                  }}
                />
              ))}
            </div>
          </Tabs.Content>
          <Tabs.Content value="Recently Adopted">
            <RecentlyAdoptedTable
              recentlyAdoptedPokemon={recentlyAdoptedPokemon}
            />
          </Tabs.Content>
          <Tabs.Content value="Most Adopted">
            <MostAdoptedPokemone
              mostAdoptedPokemon={mostAdoptedPokemon}
              limit={limit}
              setLimit={setLimit}
              refresh={refresh}
            />
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  );
};

function RecentlyAdoptedTable({
  recentlyAdoptedPokemon,
}: {
  recentlyAdoptedPokemon: any[];
}) {
  return (
    <div className="w-full flex justify-center items-center overflow-scroll">
      <table className="min-w-[800px] table-fixed ml-12 border-spacing-y-2 border-separate">
        <thead>
          <tr className="text-left font-semibold">
            <th className="w-1/4">Pokémon Name</th>
            <th className="w-1/4">Nickname</th>
            <th className="w-1/4">Adopter</th>
            <th className="w-1/4">Adoption Date</th>
          </tr>
        </thead>

        <tbody>
          {recentlyAdoptedPokemon.map((p: any, i: number) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.nickname}</td>
              <td>{p.adopter}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MostAdoptedPokemone({
  mostAdoptedPokemon,
  limit = 5,
  setLimit,
  refresh,
}: {
  mostAdoptedPokemon: any[];
  limit?: number;
  setLimit?: (limit: number) => void;
  refresh?: () => void;
}) {
  const getLimitNumber = () => {
    return limit.toString();
  };
  const setLimitNumber = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      setLimit && setLimit(num);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mb-10">
        <p className="mb-2 text-sm">Set a limit to show:</p>
        <div className="flex gap-4">
          <NumberInput.Root
            defaultValue="10"
            width="200px"
            value={getLimitNumber()}
            onValueChange={(e) => setLimitNumber(e.value)}
          >
            <NumberInput.Control className="mr-2 scale-75" />
            <NumberInput.Input className="rounded-12 p-4 ring-1 ring-white" />
          </NumberInput.Root>
          <button
            onClick={() => refresh && refresh()}
            type="submit"
            className="rounded-xl px-8 rounded-10 py-2 font-sm border-white border-[1px] fill-transparent disabled:opacity-60"
          >
            Apply
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center overflow-scroll">
        <table className="min-w-[850px] table-fixed ml-12 border-spacing-y-2 border-separate">
          <thead>
            <tr className="text-left font-semibold">
              <th className="w-1/4">Rank</th>
              <th className="w-1/4">Pokedex Number</th>
              <th className="w-1/4">Name</th>
              <th className="w-1/4">Total Adoptions</th>
            </tr>
          </thead>

          <tbody>
            {mostAdoptedPokemon.map((p: any, i: number) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{p.pokedexNumber}</td>
                <td>{p.name}</td>
                <td>{p.totalAdoptions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Adopt;
