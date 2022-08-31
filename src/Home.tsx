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

  const PokemonCard = ({
    pokemon,
    key,
  }: {
    pokemon: Pokemon;
    key: number;
  }): JSX.Element => {
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
      <div
        key={key}
        className=" bg-[#333333] font-poppins rounded-md flex flex-col justify-center items-center py-2"
      >
        <img src={pokemon.avatar} className="w-[184px]"></img>
        <h1 className="text-white font-medium  text-lg">
          {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <p className="text-white text-xs text-center">
          Abilities:{" "}
          {pokemon.abilities.map((skill, index) => (
            <>
              {skill.ability.name[0].toUpperCase() +
                skill.ability.name.slice(1)}
              {marks(index)}
            </>
          ))}
        </p>
      </div>
    );
  };

  return (
    <div className="h-screen">
      {pokemonList.length > 0 && (
        <div>
          <div className="bg-[#002E57] pt-6 pb-10 w-full flex justify-center">
            <img
              className="w-[250px] lg:w-[368px] inline-block"
              src="./pokemon_logo.png"
            ></img>
          </div>
          <main>
            <div className="flex justify-center">
              <div className="flex justify-center gap-5 absolute -translate-y-7 w-11/12 md:w-2/3 xl:w-1/2 2xl:w-1/3 text-gray-800 p-2 bg-[#D0CBCB] rounded-md px-3 hover:border-indigo-800 border duration-200">
                <input
                  placeholder="Pesquisar por pokémon"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  className="w-full bg-[#D0CBCB] text-base lg:text-lg rounded-md focus:outline-none appearance-none"
                />
                <img src="./search_icon.png" className="w-6 lg:w-10"></img>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center w-full md:w-5/6 2xl:w-[64%] m-auto mt-8 lg:mt-16">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-[#2B74B8] font-poppins text-lg">
                  Total de Pokemons
                </h2>
                <p className="px-3 font-bold text-xs bg-[#333333] rounded-full text-gray-200 font-inter">
                  {pokemonList.length}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-[#2B74B8] font-poppins text-lg">
                  Exibindo
                </h2>
                <p className="px-3 font-bold text-xs bg-[#333333] rounded-full text-gray-200 font-inter">
                  {pokemonSearch.length}
                </p>
                <h2 className="font-bold text-[#2B74B8] font-poppins text-lg">
                  de
                </h2>
                <p className="px-3 font-bold text-xs bg-[#333333] rounded-full text-gray-200 font-inter">
                  {pokemonList.length}
                </p>
              </div>
            </div>
            {pokemonSearch.length > 0 ? (
              <>
                <div className="w-full p-2 lg:p-0 md:w-11/12 2xl:w-2/3 m-auto mt-6 lg:mt-12 grid grid-rows-5 grid-cols-2 lg:grid-rows-2 lg:grid-cols-5 gap-5">
                  {pokemonSearch.map((pokemon, index) => (
                    <PokemonCard pokemon={pokemon} key={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center mt-10">
                <h1 className="text-2xl text-gray-100 font-inter font-bold">
                  Nenhum pokémon encontrado
                </h1>
              </div>
            )}
          </main>
        </div>
      )}
      <footer className="py-2 2xl:absolute 2xl:bottom-2 text-xs text-white font-poppins text-center w-full">
        Todos os direitos reservados a Campolink 2022.
      </footer>
    </div>
  );
}

export default Home;
