import React from 'react';

import '../../../App.css';
import OrderTable from './OrderTable';

const Orders = ({ customerOrders, verifyPayment, isPaymentVerified }) => {

    return (
        <div>
            <OrderTable customerOrders={customerOrders} verifyPayment={verifyPayment} isPaymentVerified={isPaymentVerified} />
        </div>


    );
};

export default Orders;
