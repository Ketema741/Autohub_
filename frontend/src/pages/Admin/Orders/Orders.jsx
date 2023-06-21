import React, { useState, useContext } from 'react';

import '../../../App.css';
import OrderTable from './OrderTable';
import { useStateContext } from '../../../context/ContextProvider';

const Orders = ({ customerOrders }) => {
    const editing = { allowDeleting: true, allowEditing: true };
    const toolbarOptions = ['Delete'];

    const { currentMode, activeMenu } = useStateContext();
    const [modifiedData, setModifiedData] = useState([]);

    const handleActionComplete = (args) => {
        if (args.requestType === 'save') {
            const updatedData = args.data;
            setModifiedData(updatedData);
            console.log(updatedData)
        } else if (args.requestType === 'delete') {
            if (args) {
                const deletedUser = args.promise[0];
                console.log(args.data);
            }
        }
    };

    return (
        <div>

            <OrderTable customerOrders={customerOrders} />
        </div>


    );
};

export default Orders;
