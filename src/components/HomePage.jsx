import React from 'react';


export default function HomePage() {
  return (
    <div className="Example">
      <Link className="btn" onClick={(e)=>(window.location = "/login")}>Login</Link>
    </div>
  );
}

