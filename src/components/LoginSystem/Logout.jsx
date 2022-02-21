import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate()
    localStorage.clear()
    useEffect(() => {
        navigate("/login")
    }, [navigate]);
    return (
        <div>
            <div className="text-center">
                <CircularProgress color="secondary" />
            </div>
        </div>
    );
};

export default Logout;
