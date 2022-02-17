import React from 'react';
import {Link} from "react-router-dom"


export default function HomePage() {
  return (
    <div className="Example">
      <Link className="btn" to={`/login`}>Login</Link>
    </div>
  );
}

