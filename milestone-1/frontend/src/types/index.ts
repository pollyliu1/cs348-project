export type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export type CardType = {
  content: JSX.Element;
  answer: string;
};

export type AdoptionStatus = "available" | "adopted" | "returned";

export type PokemonMinimum = {
  pokedex_id: number;
  name: string;
  type1: string;
  type2?: string | null;
} & Record<string, unknown>; // allow extra fields from the API

export type ApiPokemon = PokemonMinimum & {
  nickname?: string | null;
};
