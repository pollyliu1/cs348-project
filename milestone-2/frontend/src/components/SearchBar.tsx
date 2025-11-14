import React, { ReactElement, useState } from "react";
import type { ApiPokemon } from "../types";
import { twMerge } from "tailwind-merge";
type Props = {
  onResults?: (rows: ApiPokemon[]) => void;
  onStart?: () => void;
  onError?: (msg: string) => void;
};

export default function SearchBar({ onResults, onStart, onError }: Props) {
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!q.trim()) {
      onResults?.([]);
      return;
    }
    try {
      onStart?.();
      setLoading(true);
      const r = await fetch(
        `/api/search-pokemon?name=${encodeURIComponent(q)}`
      );
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = (await r.json()) as ApiPokemon[];
      onResults?.(data);
    } catch {
      onError?.("Search failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name (e.g., Pikachu)"
        aria-label="Search by name"
        className="flex-1 rounded-xl border-2 px-4 placeholder:text-gray-200 text-white py-2 outline-none bg-transparent !fill-transparent border-white rounded-10"
      />
      <button
        className={twMerge(
          "rounded-xl px-8 rounded-10 py-2 font-medium border-white border-2  rounded-xl",
          !q && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => setQ("")}
        disabled={!q}
      >
        Clear
      </button>
      <button
        type="submit"
        className="rounded-xl px-8 rounded-10 py-2 font-medium border-white border-2 fill-transparent disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
