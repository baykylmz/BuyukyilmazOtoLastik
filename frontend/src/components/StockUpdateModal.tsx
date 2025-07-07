import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface StockUpdateModalProps {
  tireId: string;
  tireName: string;
  currentStock: number;
  isOpen: boolean;
  onClose: () => void;
  onStockUpdated: () => void;
}

const StockUpdateModal: React.FC<StockUpdateModalProps> = ({
  tireId,
  tireName,
  currentStock,
  isOpen,
  onClose,
  onStockUpdated
}) => {
  const { t } = useTranslation();
  const [change, setChange] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!change || !reason) {
      setError(t('validation.required') || 'All fields are required');
      return;
    }

    const changeNumber = parseInt(change);
    if (isNaN(changeNumber)) {
      setError(t('validation.invalidNumber') || 'Please enter a valid number');
      return;
    }

    if (currentStock + changeNumber < 0) {
      setError(t('stock.insufficientStock') || 'Insufficient stock');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.patch(`/api/tires/${tireId}/stock`, {
        change: changeNumber,
        reason: reason.trim()
      });

      onStockUpdated();
      onClose();
      
      // Reset form
      setChange('');
      setReason('');
    } catch (err: any) {
      console.error('Failed to update stock:', err);
      setError(err.response?.data?.message || t('stock.updateFailed') || 'Failed to update stock');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setChange('');
    setReason('');
    setError(null);
    onClose();
  };

  const presetStock = (amount: number) => {
    setChange(amount.toString());
  };

  if (!isOpen) return null;

  const newStock = currentStock + (parseInt(change) || 0);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t('stock.updateTitle')}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-800">{tireName}</h4>
            <p className="text-sm text-gray-600">
              {t('stock.currentStock')}: <span className="font-medium">{currentStock}</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('stock.changeAmount')} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={change}
                onChange={(e) => setChange(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter change amount (+ to add, - to remove)"
                disabled={loading}
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => presetStock(10)}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                >
                  +10
                </button>
                <button
                  type="button"
                  onClick={() => presetStock(5)}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                >
                  +5
                </button>
                <button
                  type="button"
                  onClick={() => presetStock(1)}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                >
                  +1
                </button>
                <button
                  type="button"
                  onClick={() => presetStock(-1)}
                  className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                >
                  -1
                </button>
                <button
                  type="button"
                  onClick={() => presetStock(-5)}
                  className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                >
                  -5
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('stock.reason')} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={t('stock.reasonPlaceholder') || 'Enter reason for stock change...'}
                rows={3}
                disabled={loading}
              />
            </div>

            {change && (
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <p className="text-sm">
                  <span className="font-medium">{t('common.preview')}:</span>
                  <br />
                  {currentStock} → <span className={`font-medium ${newStock >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {newStock}
                  </span>
                  <span className={`ml-2 text-sm ${parseInt(change) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({parseInt(change) > 0 ? '+' : ''}{change})
                  </span>
                </p>
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                disabled={loading}
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                disabled={loading || !change || !reason}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </div>
                ) : (
                  t('stock.updateTitle')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockUpdateModal; 