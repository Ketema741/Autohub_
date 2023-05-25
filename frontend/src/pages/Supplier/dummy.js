import React from 'react';

import avatar from '../../data/avatar.jpg';
import avatar2 from '../../data/avatar2.jpg';
import avatar3 from '../../data/avatar3.png';
import avatar4 from '../../data/avatar4.jpg';

const supplierGridStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
        <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
        <p>{props.Status}</p>
    </div>
);

const supplierGridImage = (props) => (
    <div>
        <img
            className="rounded-xl h-20 md:ml-3"
            src={props.SupplierImage}
            alt="Supplier"
        />
    </div>
);

export const suppliersData = [
    {
        SupplierID: 1001,
        SupplierName: 'Ketema Girma',
        SupplierEmail: 'ketema@gmail.com',
        SupplierImage: avatar2,
        Status: 'Approved',
        StatusBg: '#8BE78B',
        CompanyName: 'AutoHub Asseccory 0',
        Budget: '$2.4k',
        Location: 'Addis Ababa',
    },
    {
        SupplierID: 1002,
        SupplierName: 'Josh Abate',
        SupplierEmail: 'josh@gmail.com',
        Status: 'Approved',
        SupplierImage: avatar3,
        StatusBg: '#8BE78B',
        CompanyName: 'AutoHub Asseccory 1',
        Budget: '$3.9k',
        Location: 'Adola',
    },
    {
        SupplierID: 1003,
        SupplierName: 'Andrew McDownland',
        SupplierEmail: 'andrew@gmail.com',
        Status: 'Not Approved',
        SupplierImage: avatar4,
        StatusBg: '#FF5C8E',
        CompanyName: 'AutoHub Asseccory 9',
        Budget: '$24.5k',
        Location: 'Addis Ababa',
    },
    {
        SupplierID: 1004,
        SupplierName: 'Christopher Jamil',
        SupplierEmail: 'jamil@gmail.com',
        Status: 'Approved',
        SupplierImage: avatar,
        StatusBg: '#8BE78B',
        CompanyName: 'AutoHub Asseccory 4',
        Budget: '$16.5k',
        Location: 'Addis Ababa',
    },
    {
        SupplierID: 1005,
        SupplierName: 'Michael',
        SupplierEmail: 'michael@gmail.com',
        Status: 'Not Approved',
        SupplierImage: avatar2,
        StatusBg:'#FF5C8E',
        CompanyName: 'AutoHub Asseccory 4',
        Budget: '$16.5k',
        Location: 'Addis Ababa',
    },
    {
        SupplierID: 1006,
        SupplierName: 'Nirav Joshi',
        SupplierEmail: 'nirav@gmail.com',
        SupplierImage: avatar2,
        ProjectName: 'Hosting Press HTML',
        Status: 'Approved',
        StatusBg: '#8BE78B',
        CompanyName: 'AutoHub Asseccory 0',
        Budget: '$2.4k',
        Location: 'Adola',
    },
    {
        SupplierID: 1007,
        SupplierName: 'Sunil Joshi',
        SupplierEmail: 'sunil@gmail.com',
        Status: 'Approved',
        SupplierImage: avatar3,
        StatusBg: '#8BE78B',
        CompanyName: 'AutoHub Asseccory 1',
        Budget: '$3.9k',
        Location: 'Bahir Dar',
    },
    {
        SupplierID: 1008,
        SupplierName: 'Andrew McDownland',
        SupplierEmail: 'andrew@gmail.com',
        Status: 'Not Approved',
        SupplierImage: avatar4,
        StatusBg: '#FF5C8E',
        CompanyName: 'AutoHub Asseccory 9',
        Budget: '$24.5k',
        Location: 'Addis Ababa',
    },
    {
        SupplierID: 1009,
        SupplierName: 'Christopher Jamil',
        SupplierEmail: 'jamil@gmail.com',
        Status: 'Approved',
        SupplierImage: avatar,
        StatusBg: '#8BE78B',
        CompanyName: 'AutoHub Cars',
        Budget: '$16.5k',
        Location: 'Addis Ababa',
    },
    {
        SupplierID: 1010,
        SupplierName: 'Michael',
        SupplierEmail: 'michael@gmail.com',
        Status: 'Not Approved',
        SupplierImage: avatar2,
        StatusBg:'#FF5C8E',
        CompanyName: 'ABC Car Asseccories',
        Budget: '$16.5k',
        Location: 'Addis Ababa',
    }

];


export const suppliersGrid = [
    { type: 'checkbox', width: '50' },
    {
        headerText: 'Image',
        width: '150',
        template: supplierGridImage,
        textAlign: 'Center'
    },
    {
        field: 'SupplierName',
        headerText: 'Name',
        width: '150',
        textAlign: 'Center'
    },
    
    {
        field: 'CompanyName',
        headerText: 'Company Name',
        width: '150',
        textAlign: 'Center'
    },
    {
        field: 'Status',
        headerText: 'Status',
        width: '130',
        format: 'yMd',
        textAlign: 'Center',
        template: supplierGridStatus
    },
    {
        field: 'Budget',
        headerText: 'Budget',
        width: '100',
        format: 'yMd',
        textAlign: 'Center'
    },

    {
        field: 'Location',
        headerText: 'Location',
        width: '150',
        textAlign: 'Center'
    },

    {
        field: 'SupplierID',
        headerText: 'Supplier ID',
        width: '120',
        textAlign: 'Center',
        isPrimaryKey: true,
    },

];