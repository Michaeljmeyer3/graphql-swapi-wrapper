import fetch from "node-fetch";

const SWAPI_URL = "https://swapi.dev/api";

const fetchSWAPIQuery = async (query: string) => {
  console.log(`${SWAPI_URL}/${query}`)
  const response = await fetch(`${SWAPI_URL}/${query}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = {
    status: response.status,
    response: response,
  };
  return response.json()
}

export const fetchSingleCharacter = async (id: string | number) => { 
  const response = await fetchSWAPIQuery(`people/${id}`);
  console.log(response);
  return response;
}