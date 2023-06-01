import axios from "axios";

export default async function getAllRepo(searchName: string) {
  const token = import.meta.env.VITE_TOKEN;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const query = `
    query ($query: String!) {
      search(query: $query, type: REPOSITORY, first: 100) {
        nodes {
          ... on Repository {
            id
            name
            stargazerCount
            pushedAt
            url
            owner {
              avatarUrl
              login
              url
            }
            languages(first: 10) {
              nodes {
                name
              }
            }
            description
          }
        }
      }
    }
  `;

  const variables = {
    query: searchName,
  };

  const response = await axios.post(
    "https://api.github.com/graphql",
    { query, variables: variables },
    { headers }
  );
  return response.data;
}
