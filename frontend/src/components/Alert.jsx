import React, { useContext, useEffect } from 'react';
import AlertContext from '../context/alert/alertContext';
import { IoInformationCircleOutline } from 'react-icons/io5';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext
    let alertColor = 'text-red-500';

    useEffect(() => {

        if (alerts.type === 'danger') {
            alertColor = 'text-red-500';
        } else if (alerts.type === 'warning') {
            alertColor = 'text-yellow-500';
        }

    }, [alerts])

    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div key={alert.id} className="mt-6 flex flex-row justify-center items-center space-x-2 text-red-500">
                <IoInformationCircleOutline className={alertColor} />
                <span className={alertColor}> {alert.msg} </span>
            </div>
        ))
    );
};

export default Alert;
