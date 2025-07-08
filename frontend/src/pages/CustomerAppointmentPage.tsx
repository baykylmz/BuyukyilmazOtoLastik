import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { getMyAppointments, createMyAppointment, updateMyAppointment, cancelMyAppointment } from '../services/customerService';

interface Appointment {
  id: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  preferredDateTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  service?: {
    id: string;
    name: string;
    description: string;
    price: number;
    durationMinutes: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}

const CustomerAppointmentPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  // Form state for new appointment
  const [formData, setFormData] = useState({
    serviceId: '',
    customerName: user?.name || '',
    customerPhone: user?.phone || '',
    vehicleModel: '',
    preferredDateTime: '',
    notes: ''
  });

  useEffect(() => {
    loadAppointments();
    loadServices();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await getMyAppointments();
      setAppointments(response.data || []);
      setError(null);
    } catch (err) {
      setError(t('errors.failedToLoadAppointments'));
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadServices = async () => {
    try {
      // Mock services for now - in a real app, this would come from an API
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'Tire Rotation',
          description: 'Rotate tires for even wear',
          price: 150,
          durationMinutes: 60
        },
        {
          id: '2',
          name: 'Tire Change',
          description: 'Change tires with new ones',
          price: 300,
          durationMinutes: 90
        },
        {
          id: '3',
          name: 'Wheel Alignment',
          description: 'Align wheels for better handling',
          price: 200,
          durationMinutes: 75
        }
      ];
      setServices(mockServices);
    } catch (err) {
      console.error('Failed to load services:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAppointment) {
        await updateMyAppointment(editingAppointment.id, formData);
        setEditingAppointment(null);
      } else {
        await createMyAppointment(formData);
      }
      setShowAddModal(false);
      resetForm();
      loadAppointments();
    } catch (err) {
      setError(t('errors.failedToSaveAppointment'));
      console.error('Failed to save appointment:', err);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    if (window.confirm(t('messages.confirmDeleteAppointment'))) {
      try {
        await cancelMyAppointment(appointmentId);
        loadAppointments();
      } catch (err) {
        setError(t('errors.failedToDeleteAppointment'));
        console.error('Failed to delete appointment:', err);
      }
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      serviceId: appointment.serviceId,
      customerName: appointment.customerName,
      customerPhone: appointment.customerPhone,
      vehicleModel: appointment.vehicleModel,
      preferredDateTime: appointment.preferredDateTime.split('T')[0] + 'T' + appointment.preferredDateTime.split('T')[1].substring(0, 5),
      notes: appointment.notes || ''
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      serviceId: '',
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      vehicleModel: '',
      preferredDateTime: '',
      notes: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t('customer.appointments.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('customer.appointments.subtitle')}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          {t('customer.appointments.totalAppointments', { count: appointments.length })}
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
            setEditingAppointment(null);
            resetForm();
          }}
          className="btn btn-primary"
        >
          {t('customer.appointments.addAppointment')}
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {t('customer.appointments.noAppointments')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('customer.appointments.noAppointmentsDescription')}
          </p>
          <button
            onClick={() => {
              setShowAddModal(true);
              setEditingAppointment(null);
              resetForm();
            }}
            className="btn btn-primary"
          >
            {t('customer.appointments.addFirstAppointment')}
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {appointment.service?.name || 'Service'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {appointment.service?.description}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {t(`appointment.status.${appointment.status.toLowerCase()}`)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('appointment.customerName')}</p>
                  <p className="font-medium">{appointment.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('appointment.customerPhone')}</p>
                  <p className="font-medium">{appointment.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('appointment.vehicleModel')}</p>
                  <p className="font-medium">{appointment.vehicleModel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('appointment.preferredDateTime')}</p>
                  <p className="font-medium">{formatDateTime(appointment.preferredDateTime)}</p>
                </div>
              </div>

              {appointment.notes && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">{t('appointment.notes')}</p>
                  <p className="text-sm">{appointment.notes}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {t('appointment.createdAt')}: {formatDateTime(appointment.createdAt)}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="btn btn-secondary text-sm"
                    disabled={appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED'}
                  >
                    {t('common.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="btn bg-red-600 text-white hover:bg-red-700 text-sm"
                    disabled={appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED'}
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingAppointment ? t('customer.appointments.editAppointment') : t('customer.appointments.addAppointment')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">{t('appointment.service')}</label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">{t('appointment.selectService')}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price}₺
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">{t('appointment.customerName')}</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">{t('appointment.customerPhone')}</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">{t('appointment.vehicleModel')}</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">{t('appointment.preferredDateTime')}</label>
                <input
                  type="datetime-local"
                  value={formData.preferredDateTime}
                  onChange={(e) => setFormData({ ...formData, preferredDateTime: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">{t('appointment.notes')}</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingAppointment(null);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  {t('common.cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingAppointment ? t('common.update') : t('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAppointmentPage; 