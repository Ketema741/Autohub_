import React, { useState } from 'react';

import Pending from './PendingExperts';
import ActiveSuppliers from './ActiveExperts';

const Suppliers = () => {

    return (
        <div>
            <ActiveSuppliers />
            <Pending />
        </div>
    )
}

export default Suppliers