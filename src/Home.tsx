import React, { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  avatar: string;
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
}

function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const myPokemonList = [
    "bulbasaur",
    "pikachu",
    "charmander",
    "squirtle",
    "blastoise",
    "caterpie",
    "kakuna",
    "pidgey",
    "caterpie",
    "raticate",
  ];
  const getPokemonList = async () => {
    let pokemonData: Pokemon[] = [];
    for (let pokemon of myPokemonList) {
      const getPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );

      const result = await getPokemon.json();
      pokemonData.push({
        name: result.name,
        avatar: result.sprites.other["official-artwork"].front_default,
        abilities: result.abilities.slice(0, 2),
      });
    }

    setPokemonList(pokemonData);
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  //Procura nome do pokémon
  const pokemonSearch = search.length
    ? pokemonList.filter((pokemon) =>
        pokemon.name.includes(search.toLowerCase())
      )
    : pokemonList;

  const PokemonCard = ({ pokemon }: { pokemon: Pokemon }): JSX.Element => {
    const oneAbility = pokemon.abilities.length === 1 ? true : false;

    //Insere vírgula ou ponto nas habilidades
    const marks = (index: number): string => {
      if (oneAbility) {
        return ".";
      } else {
        return index === 0 ? ", " : ".";
      }
    };
    return (
      <div className=" bg-[#333333] font-poppins rounded-md flex flex-col justify-center items-center py-2">
        <img src={pokemon.avatar} className="w-[184px]"></img>
        <h1 className="text-white font-medium  text-lg">
          {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <p className="text-white text-xs">
          Abilities:{" "}
          {pokemon.abilities.map((skill, index) => (
            <>
              {skill.ability.name}
              {marks(index)}
            </>
          ))}
        </p>
      </div>
    );
  };

  return (
    <div>
      {pokemonList.length > 0 ? (
        <div>
          <div className="bg-[#002E57] pt-6 pb-10 w-full flex justify-center">
            <img
              className="w-[368px] inline-block"
              src="./pokemon_logo.png"
            ></img>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-center gap-5 absolute -translate-y-7 w-1/3 text-gray-800 p-2 bg-[#D0CBCB] rounded-md px-3">
              <input
                placeholder="Pesquisar por pokémon"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                className="w-full bg-[#D0CBCB] text-lg rounded-md focus:outline-none appearance-none"
              />
              <img src="./search_icon.png" className="w-10"></img>
            </div>
          </div>
          <div className="flex justify-between w-2/3 m-auto mt-16">
            <div className="flex items-center gap-3 ml-2 ">
              <h2 className="font-bold text-[#2B74B8] font-poppins">
                Total de Pokemons
              </h2>
              <p className="px-3 font-bold text-sm bg-[#333333] rounded-full text-gray-200 font-inter">
                {pokemonList.length}
              </p>
            </div>
            <div className="flex items-center gap-3 mr-2">
              <h2 className="font-bold text-[#2B74B8] font-poppins">
                Exibindo
              </h2>
              <p className="px-3 font-bold text-sm bg-[#333333] rounded-full text-gray-200 font-inter">
                {pokemonSearch.length}
              </p>
              <h2 className="font-bold text-[#2B74B8] font-poppins">de</h2>
              <p className="px-3 font-bold text-sm bg-[#333333] rounded-full text-gray-200 font-inter">
                {pokemonList.length}
              </p>
            </div>
          </div>
          <div className="bg-[#1A1A1A] w-2/3 m-auto mt-12 grid grid-rows-2 grid-cols-5 gap-5">
            {pokemonSearch.map((pokemon) => (
              <PokemonCard pokemon={pokemon} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>Carregando pokémons</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
