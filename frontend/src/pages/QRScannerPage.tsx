import React, { useState, useCallback } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TireData {
  id: string;
  name: string;
  brand: string;
  size: string;
  season: string;
  price: number;
  stockQuantity: number;
  qrCodeId: string;
  stockChangeLogs?: Array<{
    id: string;
    change: number;
    reason: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }>;
}

const QRScannerPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [scannedTire, setScannedTire] = useState<TireData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = useCallback(async (result: any[]) => {
    if (!result || result.length === 0 || loading) return;

    const qrText = result[0]?.rawValue || result[0];
    setLoading(true);
    setError(null);
    
    try {
      // Parse QR code data
      const qrData = JSON.parse(qrText);
      
      if (qrData.type !== 'TIRE' || !qrData.qrCodeId) {
        throw new Error('Invalid QR code format');
      }

      // Fetch tire data using QR code ID
      const response = await axios.get(`/api/tires/qr/${qrData.qrCodeId}`);
      
      setScannedTire(response.data.data);
      setIsScanning(false);
    } catch (err: any) {
      console.error('QR scan error:', err);
      if (err.response?.status === 404) {
        setError(t('qr.tireNotFound') || 'Tire not found');
      } else if (err.message.includes('Invalid QR code')) {
        setError(t('qr.invalidQR') || 'Invalid QR code');
      } else {
        setError(t('qr.scanError') || 'Scan error');
      }
      
      // Continue scanning after error
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }, [loading, t]);

  const resetScanner = () => {
    setScannedTire(null);
    setError(null);
    setIsScanning(true);
  };

  const getSeasonTranslation = (season: string) => {
    switch (season) {
      case 'SUMMER':
        return t('tires.summer');
      case 'WINTER':
        return t('tires.winter');
      case 'ALL_SEASON':
        return t('tires.allSeason');
      default:
        return season;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {t('qr.scannerTitle') || 'QR Scanner'}
          </h1>
          <button
            onClick={() => navigate('/tires')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {t('common.close') || 'Close'}
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm text-blue-700 dark:text-blue-300">{t('qr.processing') || 'Processing...'}</p>
            </div>
          </div>
        )}

        {isScanning && !scannedTire && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {t('qr.pointCamera') || 'Point camera at QR code'}
            </h2>
            <div className="relative aspect-square max-w-md mx-auto">
              <Scanner
                onScan={handleScan}
                styles={{ container: { width: '100%', height: '100%' } }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              {t('qr.scanInstructions') || 'Position the QR code within the frame to scan'}
            </p>
          </div>
        )}

        {scannedTire && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {t('qr.tireFound') || 'Tire Found'}
              </h2>
              <button
                onClick={resetScanner}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                {t('qr.scanAnother') || 'Scan Another'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tires.brand')}</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{scannedTire.brand}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tires.name')}</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{scannedTire.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tires.size')}</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{scannedTire.size}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tires.season')}</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{getSeasonTranslation(scannedTire.season)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tires.price')}</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">₺{scannedTire.price.toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tires.stock')}</label>
                  <p className={`mt-1 text-sm font-medium ${scannedTire.stockQuantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {scannedTire.stockQuantity} {t('qr.inStock') || 'in stock'}
                  </p>
                </div>
              </div>

              {scannedTire.stockChangeLogs && scannedTire.stockChangeLogs.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                    {t('qr.recentStockChanges') || 'Recent Stock Changes'}
                  </h3>
                  <div className="space-y-2">
                    {scannedTire.stockChangeLogs.slice(0, 3).map((log) => (
                      <div key={log.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {log.change > 0 ? '+' : ''}{log.change} - {log.reason}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t('qr.by') || 'by'} {log.user.name} • {new Date(log.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-sm font-medium ${log.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {log.change > 0 ? '+' : ''}{log.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate(`/tires`)}
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                {t('qr.viewDetails') || 'Back to Tires'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerPage; 