import React, { useState } from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Inject,
    Edit,
    Resize,
    ContextMenu,
    Sort,
    Filter,
    PdfExport,
    ExcelExport
} from '@syncfusion/ej2-react-grids';
import '../../../App.css';
import Test from './Test';
import { useStateContext } from '../../../context/ContextProvider';
import { ordersData, ordersGrid, contextMenuItems } from './dummy';
import { Header } from '../../../components';

const Customers = () => {
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
            
            <Test />
        </div>


    );
};

export default Customers;
