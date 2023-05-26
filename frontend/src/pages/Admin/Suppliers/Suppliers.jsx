import React, { useState } from 'react';

import Pending from './PendingSuppliers';
import ActiveSuppliers from './ActiveSuppliers';

const Suppliers = () => {

    return (
        <div>
            <ActiveSuppliers />
            <Pending />
        </div>
    )
}

export default Suppliers