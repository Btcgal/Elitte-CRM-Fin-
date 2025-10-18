const BASE_URL = 'http://localhost:3000/api'; // Garante que o frontend procure o backend na porta 3000

async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Futuro: Descomente a linha abaixo quando o login estiver 100% integrado
      // 'Authorization': `Bearer ${localStorage.getItem('crm_token')}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha na requisição à API.');
  }

  return response.json();
}

export default apiClient;
