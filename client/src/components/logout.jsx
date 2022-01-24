import React from 'react';


export default function Logout() {
 
    logout = () => {
        localStorage.clear();

        window.location.href = "/login";
      }
    return (
        <div>
        <button onClick={this.logout}>Logout</button>
        </div>
    )
}