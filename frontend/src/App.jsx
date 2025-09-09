// /frontend/src/App.jsx
// This is the main UI component for the application.

import { useState } from 'react';

// A reusable SVG spinner component for indicating loading states.
const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

function App() {
  // State variables to manage the component's data and UI status.
  const [assetId, setAssetId] = useState(''); // Stores the user's input.
  const [isLoading, setIsLoading] = useState(false); // Manages the loading state of the form.
  const [error, setError] = useState(null); // Stores any error messages.
  const [qrCodeUrl, setQrCodeUrl] = useState(null); // Stores the URL of the generated QR code image.

  // --- CONFIGURATION ---
  // PRODUCTION URL
  const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/55f3e5d2-0690-4584-8359-2c21108621bf";
  // TESTING URL:
  //const N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/55f3e5d2-0690-4584-8359-2c21108621bf";

  // Handles the form submission event.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default browser page reload on form submission.
    
    // Reset state for a new request.
    setIsLoading(true);
    setError(null);
    setQrCodeUrl(null);

    try {
      // Make an asynchronous request to the n8n webhook using the Fetch API.
      const response = await fetch(`${N8N_WEBHOOK_URL}?assetId=${assetId}`);

      // Check if the HTTP response was successful.
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}. The asset might not exist.`);
      }

      // n8n returns the image data as a 'blob' (Binary Large Object).
      const imageBlob = await response.blob();
      // Create a temporary local URL for the blob, which can be used as an image source.
      const imageUrl = URL.createObjectURL(imageBlob);
      
      setQrCodeUrl(imageUrl);

    } catch (err) {
      // If any error occurs during the fetch, store the error message.
      setError(err.message);
    } finally {
      // This block runs regardless of success or failure.
      setIsLoading(false);
    }
  };

  // The JSX that defines the component's HTML structure and appearance.
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">AssetHealth AI</h1>
          <p className="text-gray-400 mt-2">Intelligent QR Label Generator</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="assetId" className="block text-sm font-medium text-gray-300 mb-2">
              Asset ID
            </label>
            <input
              type="text"
              id="assetId"
              name="assetId"
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., CAGE-001"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? 'Generating...' : 'Generate QR'}
          </button>
        </form>

        {/* Conditionally render the error message if it exists. */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Conditionally render the QR code display if the URL exists. */}
        {qrCodeUrl && (
          <div className="bg-gray-900 p-6 rounded-lg flex flex-col items-center space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-white">QR Generated Successfully!</h3>
            <img src={qrCodeUrl} alt="Generated QR Code" className="rounded-lg max-w-xs w-full" />
            <a 
              href={qrCodeUrl} 
              download={`AssetHealth-QR-${assetId}.png`}
              className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Download Image
            </a>
          </div>
        )}

      </div>
      <footer className="text-gray-500 text-sm mt-8">
        Powered by n8n & React
      </footer>
    </div>
  );
}

export default App;