import http from '.';
import type { Courier } from '../types/couriers';

async function getCouriers() {
  return await http.get<Courier[]>('couriers');
}

async function createCourier(courier: string) {
  return await http.post<string>('couriers', { courier });
}

// Реализация запроса на изменение данных курьера
// URL: http://localhost:8080/couriers
// Method: PUT
// Body: {
//   id: 1,
//   courier: "Курьер",
//   busytime: "2023-12-12",
//   busy: false
// }
// Response: true/false
async function editCourier(courier: Courier) {
  return await http.put<boolean>('couriers', courier);
}

// Реализация запроса на удаление курьера
// URL: http://localhost:8080/couriers/id
// Method: DELETE
// Response: true/false
async function deleteCourier(id: number) {
  return await http.delete<boolean>(`couriers/${id}`);
}

export default {
  getCouriers,
  createCourier,
  editCourier,
  deleteCourier
};
