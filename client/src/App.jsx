import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* Top Fixed/Sticky Navbar */}
      <Navbar />

      {/* Main Dynamic Pages Content */}
      <div className="flex-grow">
        <AppRoutes />
      </div>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}

export default App;