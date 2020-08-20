<<<<<<< HEAD
import React from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
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
=======
import React from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
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
>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
