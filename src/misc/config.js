const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(querryString) {
  const response = await fetch(`${API_BASE_URL}${querryString}`).then(r =>
    r.json()
  );

  return response;
}
