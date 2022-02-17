import React from 'react';


export default function HomePage() {
  return (
    <div className="Example">
      <button className="btn" onClick={(e)=>(window.location = "/login")}>Login</button>
    </div>
  );
}

