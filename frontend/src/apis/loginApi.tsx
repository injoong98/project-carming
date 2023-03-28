import {LoginRequestPayload} from '../types/LoginRequestPayload';
import {LoginResponsePayload} from '../types/LoginResponsePayload';

const API_URL = 'http://api.example.com'; // API 기본 URL 설정

export const loginApi = async (
  payload: LoginRequestPayload,
): Promise<LoginResponsePayload> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  return response.json();
};
