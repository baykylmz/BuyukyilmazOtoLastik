import axios from 'axios';
import { Customer, Vehicle } from '../types/customer';

const API_URL = '/api/customers';

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get(API_URL);
  return response.data.data.customers;
};

export const getCustomer = async (id: string): Promise<Customer> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data.customer;
};

export const createCustomer = async (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
  const response = await axios.post(API_URL, { body: customer });
  return response.data.data.customer;
};

export const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<Customer> => {
  const response = await axios.put(`${API_URL}/${id}`, { body: customer });
  return response.data.data.customer;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const addVehicle = async (customerId: string, vehicle: Omit<Vehicle, 'id' | 'customerId' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> => {
  const response = await axios.post(`${API_URL}/${customerId}/vehicles`, { body: vehicle });
  return response.data.data.vehicle;
};

export const updateVehicle = async (customerId: string, vehicleId: string, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
  const response = await axios.put(`${API_URL}/${customerId}/vehicles/${vehicleId}`, { body: vehicle });
  return response.data.data.vehicle;
};

export const deleteVehicle = async (customerId: string, vehicleId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${customerId}/vehicles/${vehicleId}`);
}; 