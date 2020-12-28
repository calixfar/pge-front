import React, {useEffect} from 'react';
import './App.css';
import MainPanel from './components/layout/MainPanel';
import tokenAuth from './config/tokenAuth';
import AuthState from './context/auth/authState';
// import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
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
  
  useEffect(() => {
    // const history = createBrowserHistory();
    // Initialize google analytics page view tracking
    // const trackingId = "UA-1234567890-1"; // Replace with your Google Analytics tracking ID
    const trackingId = "UA-185807888-1"; // Replace with your Google Analytics tracking ID
    ReactGA.initialize(trackingId);
    // ReactGA.pageview(window.location.pathname + window.location.search);
}, []);

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
