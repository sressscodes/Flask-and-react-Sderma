import React from 'react'
import './LoginPopup.css'

const LoginPopup = ({setShowLoginPopup, loginWithRedirect}) => {
  return (
    <div className="login-popup">
        <div className="login-popup-content">
            <h3>Log in to <span>S Derma</span> to access all features.</h3>
            <div className="buttons">
                <button className="button-login" onClick={() => { setShowLoginPopup(false); loginWithRedirect(); }}>Log In</button>
                <button className="button-back" onClick={() => setShowLoginPopup(false)}>Back</button>
            </div>
        </div>
  </div>
  )
}

export default LoginPopup
