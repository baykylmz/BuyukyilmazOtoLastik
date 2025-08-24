import axios from 'axios';
import { Vehicle } from '../types/vehicle';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
  updatedAt: string;
  vehicles?: Vehicle[];
  appointments?: any[];
}

export async function getUsers(role?: string): Promise<User[]> {
  const res = await axios.get('/api/users', { params: role ? { role } : {} });
  return res.data.data;
}

export async function getUser(id: string): Promise<User> {
  const res = await axios.get(`/api/users/${id}`);
  return res.data.data;
}

export async function updateUser(id: string, data: Partial<User> & { password?: string }): Promise<User> {
  const res = await axios.put(`/api/users/${id}`, { body: data });
  return res.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await axios.delete(`/api/users/${id}`);
}

export async function createUser(data: Partial<User> & { password?: string }): Promise<User> {
  const res = await axios.post('/api/users', { body: data });
  return res.data.data;
}

// --- CUSTOMER SELF-SERVICE: VEHICLES ---
export async function getMyVehicles(): Promise<Vehicle[]> {
  const response = await axios.get('/api/users/me/vehicles');
  return response.data.data;
}

export async function addMyVehicle(vehicle: Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
  const response = await axios.post('/api/users/me/vehicles', vehicle);
  return response.data.data;
}

export async function updateMyVehicle(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> {
  const response = await axios.put(`/api/users/me/vehicles/${id}`, vehicle);
  return response.data.data;
}

export async function deleteMyVehicle(id: string): Promise<void> {
  await axios.delete(`/api/users/me/vehicles/${id}`);
}

// --- CUSTOMER SELF-SERVICE: APPOINTMENTS ---
export async function getMyAppointments(): Promise<any[]> {
  const response = await axios.get('/api/users/me/appointments');
  return response.data.data;
}

export async function createMyAppointment(appointment: any): Promise<any> {
  const response = await axios.post('/api/users/me/appointments', appointment);
  return response.data.data;
}

export async function updateMyAppointment(id: string, appointment: any): Promise<any> {
  const response = await axios.put(`/api/users/me/appointments/${id}`, appointment);
  return response.data.data;
}

export async function cancelMyAppointment(id: string): Promise<void> {
  await axios.patch(`/api/users/me/appointments/${id}/cancel`);
} 