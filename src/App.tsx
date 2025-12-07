import React from 'react';
// @ts-ignore
import InfographicBuilder from './InfographicBuilder';
import './App.css'; // Kita biarkan CSS bawaan tetap terpanggil

function App() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-900">
      <InfographicBuilder />
    </div>
  );
}

export default App;