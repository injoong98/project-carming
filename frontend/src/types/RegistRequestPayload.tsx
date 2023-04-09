export type RegistRequestPayload = {
  phone: string;
  name: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  birthDate: string;
  card: {
    cardNumber: string;
    companyName: string;
    cardPassword: string;
    cvv: string;
    cardExp: string;
  };
};
