import http from '.';
import type { Region } from '../types/regions';

async function getRegions() {
  return await http.get<Region[]>('regions');
}

// Реализация запроса на добавление нового региона
// URL: http://localhost:8080/regions
// Method: POST
// Body: {
//   region: "Новый регион",
// }
// Response: Объект нового региона
async function createRegion(region: string) {
  return await http.post<string>('regions', { region });
}

// Реализация запроса на изменение данных региона
// URL: http://localhost:8080/regions
// Method: PUT
// Body: {
//   id: 1,
//   region: "Регион",
//   time: "1"
// }
// Response: true/false
async function editRegion(region: Region) {
  return await http.put<boolean>('regions', region);
}

// Реализация запроса на удаление региона
// URL: http://localhost:8080/regions/id
// Method: DELETE
// Response: true/false
async function deleteRegion(id: number) {
  return await http.delete<boolean>(`regions/${id}`);
}

export default {
  getRegions,
  createRegion,
  editRegion,
  deleteRegion
};
