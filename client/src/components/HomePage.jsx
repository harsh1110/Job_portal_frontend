import React from 'react';
import MediaCard from './Home/Cards';

import CrouselCompo from './Home/CrouselCompo';

const HomePage = () => {
  return <>
    <CrouselCompo/>
    <div className="text-center my-4">
      <h3 className="text-primary my-4">
        Suggested Products
      </h3>
      <div className='container d-flex'>
        <div className="col-3">
        <MediaCard/>
        </div>
        <div className="col-3">
        <MediaCard/>
        </div>
        <div className="col-3">
        <MediaCard/>
        </div>
      </div>
    </div>
  </>;
};

export default HomePage;
