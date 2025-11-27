import { ApiAdoptablePokemon } from "../types";

export const samplePokemons: ApiAdoptablePokemon[] = [
  {
    pid: 1,
    nickname: "Sparky",
    name: "Pikachu",
    description: "A friendly Electric type that loves berries.",
    status: "available",
    date_added: new Date("2025-01-05"),
    mine: false,
  },
  {
    pid: 2,
    nickname: "Flare",
    name: "Charmander",
    description: "A fiery companion who warms up any room.",
    status: "taken",
    date_added: new Date("2025-01-03"),
    mine: false,
  },
  {
    pid: 3,
    nickname: "Aqua",
    name: "Squirtle",
    description: "Calm, reliable, and great at water fights.",
    status: "available",
    date_added: new Date("2025-01-02"),
    mine: true,
  },
  {
    pid: 4,
    nickname: "Bud",
    name: "Bulbasaur",
    description: "A gentle Grass type that loves sunlight.",
    status: "taken",
    date_added: new Date("2025-01-01"),
    mine: false,
  },
  {
    pid: 5,
    nickname: "Nimbus",
    name: "Dratini",
    description: "A rare Dragon type full of potential.",
    status: "available",
    date_added: new Date("2025-01-06"),
    mine: true,
  },
];

export const recentlyAdoptedTest = [
  {
    name: "Pikachu",
    nickname: "Sparky",
    adopter: "ash123",
    date: "2025-01-02",
  },
  {
    name: "Bulbasaur",
    nickname: "Bud",
    adopter: "misty321",
    date: "2025-01-03",
  },
  {
    name: "Charmander",
    nickname: "Flare",
    adopter: "brock777",
    date: "2025-01-05",
  },
  {
    name: "Eevee",
    nickname: "Whisper",
    adopter: "leaflover",
    date: "2025-01-09",
  },
  {
    name: "Jigglypuff",
    nickname: "Melody",
    adopter: "sleepysam",
    date: "2025-01-10",
  },
  {
    name: "Growlithe",
    nickname: "Rusty",
    adopter: "flamefan",
    date: "2025-01-11",
  },
  {
    name: "Psyduck",
    nickname: "Zen",
    adopter: "thinkhard",
    date: "2025-01-14",
  },
  {
    name: "Snorlax",
    nickname: "Pillow",
    adopter: "cozychris",
    date: "2025-01-15",
  },
  {
    name: "Dratini",
    nickname: "Nimbus",
    adopter: "dragonkid",
    date: "2025-01-16",
  },
];

export const mostAdoptedTest = [
  { pokedexNumber: 25, name: "Pikachu", totalAdoptions: 42 },
  { pokedexNumber: 1, name: "Bulbasaur", totalAdoptions: 37 },
  {
    pokedexNumber: 4,
    name: "Charmander",
    totalAdoptions: 33,
  },
  {
    pokedexNumber: 7,
    name: "Squirtle",
    totalAdoptions: 31,
  },
  { pokedexNumber: 133, name: "Eevee", totalAdoptions: 28 },
  {
    pokedexNumber: 39,
    name: "Jigglypuff",
    totalAdoptions: 21,
  },
];
