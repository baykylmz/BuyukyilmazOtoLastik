import axios from 'axios';
import { Tire } from '../types/tire';

export async function getTires(): Promise<Tire[]> {
  const response = await axios.get('/api/tires');
  return response.data.data.tires;
}

export async function getTireById(id: string): Promise<Tire> {
  const response = await axios.get(`/api/tires/${id}`);
  return response.data.data.tire;
}

export async function createTire(tire: Omit<Tire, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tire> {
  const response = await axios.post('/api/tires', tire);
  return response.data.data.tire;
}

export async function updateTire(id: string, tire: Partial<Tire>): Promise<Tire> {
  const response = await axios.put(`/api/tires/${id}`, tire);
  return response.data.data.tire;
}

export async function deleteTire(id: string): Promise<void> {
  await axios.delete(`/api/tires/${id}`);
} 