import {REST_API_URL} from '@env';
import {LoginRequestPayload} from '../types/LoginRequestPayload';
import {LoginResponsePayload} from '../types/LoginResponsePayload';

const API_URL = REST_API_URL; // API 기본 URL 설정

export const loginApi = async (
  payload: LoginRequestPayload,
): Promise<LoginResponsePayload> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  console.log(response);

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  return response.json();
};
