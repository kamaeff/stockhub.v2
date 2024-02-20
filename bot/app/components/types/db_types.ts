export type userInfo = {
  reg: string;
  username: string;
  locale: string;
  orders_count: number;
  bonus_count: number;
  gender_option: string;
  email: string;
  fio: string;
};

export type User = {
  chatId: number;
  username: string;
  data_reg: string;
};

export type Photo = {
  photo: string;
  caption: string;
};
