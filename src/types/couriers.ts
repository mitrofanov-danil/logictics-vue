export type Courier = {
  id: number;
  courier: string;
  busytime: string;
  busy: string;
};

export type CourierEdit = {
  id: number;
  courier: string;
  busytime: Date;
  busy: string;
};
