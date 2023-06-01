import axios from "axios";

export default async function getMyRepo() {
  const token = import.meta.env.VITE_TOKEN;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const query = `
    query {
      viewer {
        repositories(first: 100) {
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
    }
  `;

  const response = await axios.post(
    import.meta.env.VITE_URL, { query }, { headers }
  );
  return response.data;
}
