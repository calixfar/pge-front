import React from 'react';
import './App.css';
import MainPanel from './components/layout/MainPanel';
import tokenAuth from './config/tokenAuth';
import AuthState from './context/auth/authState';

const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}
// const styleBackgroundLogin = window.location.pathname === '/' ? { 
//     backgroundImage:  'url(/arquivos/backgroung_login.jpg)',
//     backgroundSize: '100% 100%',
//     backgroundRepeat: 'no-repeat',
//     position: 'relative'
//   } : {};


function App() {
  return (
    <div 
      className={ `wrapper ${window.location.pathname === '/' ? 'background-image' : ''}` }
    >
      <AuthState>
        {/* <Sidebar/> */}
        <MainPanel/>
      </AuthState>
    </div>
  );
}

export default App;
