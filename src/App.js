import React from 'react';
import './App.css';
import MainPanel from './components/layout/MainPanel';
import tokenAuth from './config/tokenAuth';
import AuthState from './context/auth/authState';

const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}
function App() {
  return (
    <div className="wrapper ">
      <AuthState>
        {/* <Sidebar/> */}
        <MainPanel/>
      </AuthState>
    </div>
  );
}

export default App;
