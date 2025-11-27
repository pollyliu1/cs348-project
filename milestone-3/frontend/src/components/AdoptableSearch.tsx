import React, { useContext, useState } from "react";
import type { ApiAdoptablePokemon } from "../types";
import { Switch } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

type Props = {
  onResults?: (rows: ApiAdoptablePokemon[]) => void;
  onStart?: () => void;
};

export default function AdoptableSearch({ onResults, onStart }: Props) {
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [relevanceSelected, setRelevanceSelected] = useState<boolean>(false);
  const [onlyMyPokemonSelected, setOnlyMyPokemonSelected] =
    useState<boolean>(false);

  const { userId } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const url = new URL(
        "/api/search-adoptable-pokemon",
        window.location.origin
      );
      url.searchParams.set("name", q);
      url.searchParams.set("uid", userId || "");
      url.searchParams.set(
        "order",
        relevanceSelected ? "relevance" : "compatibility"
      );
      url.searchParams.set(
        "all",
        onlyMyPokemonSelected.toString()
      );
      const response = await fetch(url);

      if (!response.ok) {
        console.log("error is: ", await response.text());
      }

      const x = await response.json();
      console.log("results:", x);
      onStart?.();
      onResults?.(x);
    } catch (err: any) {
      console.log(err.toString());
    }
  }

  return (
    <div className="mx-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search anything"
          aria-label="Search anything"
          className="flex-1 rounded-xl border-2 px-4 placeholder:text-gray-200 text-white py-2 outline-none bg-transparent !fill-transparent border-white rounded-10"
        />

        <button
          type="submit"
          className="rounded-xl px-8 rounded-10 py-2 font-medium border-white border-2 fill-transparent disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>
      <div className="mb-8 mt-4 ml-2 flex gap-4">
        <Switch.Root
          checked={relevanceSelected}
          onCheckedChange={(e) => setRelevanceSelected(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control className="ring-1 ring-white text-white">
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Sort by {relevanceSelected ? "Relevance" : "Compatibility"}</Switch.Label>
        </Switch.Root>
        <Switch.Root
          checked={onlyMyPokemonSelected}
          onCheckedChange={(e) => setOnlyMyPokemonSelected(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control className="ring-1 ring-white text-white">
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>{onlyMyPokemonSelected ? "Only My Pokémon" : "All Pokémon"}</Switch.Label>
        </Switch.Root>
      </div>
    </div>
  );
}
