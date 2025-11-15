import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import type { ApiPokemon } from "../types";
import TypeSelect from "@/components/TypeSelect";
import SortBy from "@/components/SortBy";

type Props = {
  pokemon?: ApiPokemon[]; // optional initial data
};

export default function Wiki({ pokemon: initialData }: Props) {
  const [pokemon, setPokemon] = useState<ApiPokemon[]>(initialData ?? []);
  // const [pokemon, setPokemon] = useState([
  //   { name: "Stanley", type1: "Fire", type2: "Water", pokedex_number: 999 },
  //   { name: "Polly", type1: "Fire", type2: "Water", pokedex_number: 9 },
  //   { name: "Mindy", type1: "Fire", type2: "Water", pokedex_number: 99 },
  //   { name: "Andy", type1: "Fire", type2: "Water", pokedex_number: 1 },
  //   { name: "Musab", type1: "Fire", type2: "Water", pokedex_number: 2 },
  // ]);
  const [typesSelected, setTypesSelected] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Unsorted");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // if (initialData) return;
    // (async () => {
    //   try {
    //     const r = await fetch("/api/available");
    //     if (!r.ok) throw new Error(`HTTP ${r.status}`);
    //     const data = (await r.json()) as ApiPokemon[];
    //     setPokemon(data);
    //   } catch {
    //     setError("Failed to load Pokémon.");
    //   } finally {
    //     setLoading(false);
    //   }
    // })();
  }, [initialData]);

  const renderType = (p: ApiPokemon) =>
    p.type2 ? `${p.type1}/${p.type2}` : p.type1;

  return (
    <div className="min-h-screen p-6 mt-20 flex flex-col gap-4">
      <h1 className="text-5xl text-center font-semibold">Pokédex</h1>
      <p className="text-center text-gray-50 text-xl mb-4">
        Search for your favorite Pokémon
      </p>

      <div className="px-30">
        <SearchBar
          onStart={() => {
            setError("");
          }}
          onResults={(rows: ApiPokemon[]) => setPokemon(rows as any)}
          onError={(msg) => setError(msg)}
          typesSelected={typesSelected}
          sortBy={sortBy}
        />
      </div>

      {loading && (
        <div className="text-slate-500 dark:text-slate-400">Loading…</div>
      )}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          <p className="mb-3 text-sm px-30 ">
            Showing {pokemon.length} result{pokemon.length === 1 ? "" : "s"}
          </p>
          <div className="flex w-full">
            <div className="w-[250px] mr-6">
              <SortBy sortBy={sortBy} onSortChange={setSortBy} />
              <TypeSelect
                typesSelected={typesSelected}
                onTypesSelect={setTypesSelected}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 flex-1">
              {pokemon.map((p, idx) => {
                const type = renderType(p as any);
                const key = `${p.pokedex_number ?? p.name}-${idx}`;
                return (
                  <article
                    key={key}
                    className="rounded-2xl border p-4 shadow-sm"
                  >
                    <header className="mb-2 flex items-start justify-between">
                      <h2 className="text-lg font-semibold">{p.name}</h2>
                    </header>
                    <p className="text-sm ">Type: {type}</p>
                    {/* {p.nickname && (
                    <p className="text-sm">Nickname: “{p.nickname}”</p>
                  )} */}
                  </article>
                );
              })}
              {pokemon.length === 0 && <p className="mt-4 ">No matches.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
