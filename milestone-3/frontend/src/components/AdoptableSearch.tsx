import React, { ReactElement, useState } from "react";
import type { ApiAdoptablePokemon, ApiPokemon } from "../types";
import { twMerge } from "tailwind-merge";
import { POKEMON_TYPES } from "@/constants/types";
import { Switch } from "@chakra-ui/react";

type Props = {
  onResults?: (rows: ApiAdoptablePokemon[]) => void;
  onStart?: () => void;
};

export default function AdoptableSearch({ onResults, onStart }: Props) {
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [relevanceSelected, setRelevanceSelected] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // replace/fill in
    onStart?.();
    onResults?.([]);
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
      <div className="mb-8 mt-2 ml-2">
        <Switch.Root
          checked={relevanceSelected}
          onCheckedChange={(e) => setRelevanceSelected(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control className="ring-1 ring-white text-white">
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Sort by Relevance</Switch.Label>
        </Switch.Root>
      </div>
    </div>
  );
}
