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
            console.log(modifiedData)
        } else if (args.requestType === 'delete') {
            if (args) {
                const deletedUser = args.promise[0];
                console.log(args.data);
            }
        }
    };

    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
            <Header category="" title="Customer Orders" />
            <GridComponent
                dataSource={ordersData}
                allowPaging
                allowSorting
                toolbar={toolbarOptions}
                allowExcelExport
                allowPdfExport
                contextMenuItems={contextMenuItems}
                editSettings={editing}
                actionComplete={handleActionComplete} // Handle save/delete actions
            >
                <ColumnsDirective>
                    {ordersGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[
                    Resize,
                    Sort,
                    ContextMenu,
                    Filter,
                    Page,
                    ExcelExport,
                    Edit,
                    PdfExport,
                ]} />
            </GridComponent>
        </div>


    );
};

export default Customers;
