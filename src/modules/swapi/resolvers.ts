import { Context } from "apollo-server-core";
import { GraphQLFieldResolver } from "graphql";

import { fetchSingleCharacter } from "./swapiQuery";

type Args = { id: string };

/*
  handling all resolver activities here. Given the ask and the code,
  it is the lease intrusive way. I did import the SWAPI fetch 
  functionality from another file for better reuse, in the case
  other types needed to be resolved. 

  There is a lot of work that could be done, as characters can have 
  multiple films, vehicles, and other entities. However, that
  does not seem to be in the scope of the ask.
*/

type SWAPICharacterData = {
  name: string;
  height: string;
  mass: string;
  gender: string;
}
const Query: Record<string, GraphQLFieldResolver<{}, Context, any>> = {
  swapiCharacterById: async (_, args: Args, ctx, contextValue) => {
    
    // logging the args - normally I'd add this to a logger
    console.log("fetchSingleCharacter", args.id);

    const characterData: SWAPICharacterData = await fetchSingleCharacter(args.id) as SWAPICharacterData;
    
    return {
      name: characterData.name,
      height: characterData.height,
      mass: characterData.mass,
      gender: characterData.gender.toUpperCase() //Uppercaseing this due to enum type
    }
  },
};

// I am not sure what the ask is here, but I am assuming that this const was simply for testing or boilerplate
// It threw me off as I was trying to utilize contextValue and other methods to update this, rather than
// simply doing it all in the resolver. Which is my prefered method.

  // const StarWarsCharacter = {
  //   name: () => {
  //     return "test";
  //   },
  //   height: () => {
  //     return "171";
  //   },
  //   mass: () => {
  //     return "100";
  //   },
  //   gender: () => {
  //     return "MALE";
  //   },
  // };

// You can add new Object Resolvers to the default export and the server will pick them up automatically
export default {
  Query,
  // StarWarsCharacter,
};
