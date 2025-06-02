import React from 'react';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Welcome to VaultLock 🔐</h1>
        <p className="mt-2 text-gray-600">Your secure cloud password manager</p>
      </div>
    </div>
  );
};

export default App;

