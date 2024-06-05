import http from '.';
import type { Route, CreateRoute } from '@/types/routeList';

async function getRouteList() {
  return await http.get<Route[]>('leftlist');
}

async function createRoute(newRoute: CreateRoute) {
  return await http.post<Route[]>('leftlist', newRoute);
}

export default {
  getRouteList,
  createRoute
};
