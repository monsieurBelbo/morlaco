const API_URL = 'http://localhost:3000';

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  options.credentials = 'include';
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
}

export function getProjects() {
  return fetchWithAuth(`${API_URL}/projects`);
}

export function getAccounts() {
  return fetchWithAuth(`${API_URL}/accounts`);
}

export function getTransactions() {
  return fetchWithAuth(`${API_URL}/transactions`);
}

export function createProject(project) {
  return fetchWithAuth(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
}

export function createAccount(account) {
  return fetchWithAuth(`${API_URL}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(account),
  });
}

export function createTransaction(transaction) {
  return fetchWithAuth(`${API_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
}
