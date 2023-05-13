import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';
import { IoInformationCircleOutline } from 'react-icons/io5';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext
    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div key={alert.id} className="mt-6 flex flex-row justify-center items-center space-x-2">
                <IoInformationCircleOutline /> 
                <span> {alert.msg} </span>
            </div>
        ))
    );
};

export default Alert;
