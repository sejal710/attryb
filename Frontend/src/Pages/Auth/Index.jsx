import React, { useState } from 'react';
import './style.css'; 
import Create from './Container/Create';
import Signin from './Container/Signin';

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };
  function handle(){
    setIsSignIn(!isSignIn);
  }

  return (
    <div className='auth'>
    <div className="toggle-container">
      <button
        className={`toggle-button ${isSignIn ? 'active' : ''}`}
        onClick={handleToggle}
      >
        Create Account
      </button>
      <button
        className={`toggle-button ${isSignIn ? '' : 'active'}`}
        onClick={handleToggle}
      >
        Sign In
      </button>
    </div>
    {
        isSignIn ? <Create toggle={handle} /> : <Signin  />
    }
    </div>
  );
}

export default Auth;
