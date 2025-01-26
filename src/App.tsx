import React, { useState } from 'react';
import { CreditCard, Bike, MapPin, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://app-250125232314.azurewebsites.net//api/bike/store';

interface FormData {
  customerName: string;
  bikeLocation: string;
  bikeId: string;
  creditCardName: string;
  creditCardNumber: string;
  creditCardCvv: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    bikeLocation: '',
    bikeId: '',
    creditCardName: '',
    creditCardNumber: '',
    creditCardCvv: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log("This is the response", response)
      const data = await response.json();

      if (!response.ok) {
        // If the server returns an error message, use it; otherwise, use a generic message
        const errorMessage = data.message || data.error || 'Failed to submit form';
        throw new Error(errorMessage);
      }

      setSuccess(true);
      setFormData({
        customerName: '',
        bikeLocation: '',
        bikeId: '',
        creditCardName: '',
        creditCardNumber: '',
        creditCardCvv: ''
      });
    } catch (err) {
      console.log(err)
      // Handle both API errors and network errors
      if (err instanceof Error) {
        setError(err.message);
      } else if (err && typeof err === 'object' && 'toString' in err) {
        setError(err.toString());
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Bike Rental Form
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={handleChange}
                  className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bikeLocation" className="block text-sm font-medium text-gray-700">
                Bike Location
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="bikeLocation"
                  name="bikeLocation"
                  type="text"
                  required
                  value={formData.bikeLocation}
                  onChange={handleChange}
                  className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Store Location"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bikeId" className="block text-sm font-medium text-gray-700">
                Bike ID
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Bike className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="bikeId"
                  name="bikeId"
                  type="text"
                  required
                  value={formData.bikeId}
                  onChange={handleChange}
                  className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="BIKE123"
                />
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </h3>

              <div>
                <label htmlFor="creditCardName" className="block text-sm font-medium text-gray-700">
                  Name on Card
                </label>
                <input
                  id="creditCardName"
                  name="creditCardName"
                  type="text"
                  required
                  value={formData.creditCardName}
                  onChange={handleChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="creditCardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  id="creditCardNumber"
                  name="creditCardNumber"
                  type="text"
                  required
                  value={formData.creditCardNumber}
                  onChange={handleChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  pattern="\d{16}"
                />
              </div>

              <div>
                <label htmlFor="creditCardCvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  id="creditCardCvv"
                  name="creditCardCvv"
                  type="text"
                  required
                  value={formData.creditCardCvv}
                  onChange={handleChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="123"
                  maxLength={3}
                  pattern="\d{3}"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error submitting form
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Form submitted successfully
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;