import { CircularProgress } from '@mui/material';
import React from 'react';

const Logout = () => {
    localStorage.clear()
    window.location = "/login"
    return <div>
        <div className="text-center">
            <CircularProgress color="secondary" />
        </div>
    </div>;
};

export default Logout;
