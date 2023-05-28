import React from 'react';

import avatar from '../../data/avatar.jpg';
import avatar2 from '../../data/avatar2.jpg';
import avatar3 from '../../data/avatar3.png';
import avatar4 from '../../data/avatar4.jpg';

import product1 from '../../data/product1.jpg';
import product2 from '../../data/product2.jpg';
import product3 from '../../data/product3.jpg';
import product4 from '../../data/product4.jpg';
import product5 from '../../data/product5.jpg';
import product6 from '../../data/product6.jpg';
import product7 from '../../data/product7.jpg';

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


export const ordersData = [
    {
      OrderID: 10248,
      CustomerName: 'Ketema Girma',
  
      TotalAmount: 32.38,
      OrderItems: 'Fresh Tomato',
      Location: 'Addis Ababa',
      Status: 'pending',
      StatusBg: '#FB9678',
      ProductImage:
        product6,
    },
    {
      OrderID: 345653,
      CustomerName: 'Sunny Girma',
      TotalAmount: 56.34,
      OrderItems: 'Butter Scotch',
      Location: 'Adama',
      Status: 'complete',
      StatusBg: '#8BE78B',
      ProductImage:
        product5,
    },
    {
      OrderID: 390457,
      CustomerName: 'Ohana Girma',
      TotalAmount: 93.31,
      OrderItems: 'Candy Gucci',
      Location: 'Hawasa',
      Status: 'active',
      StatusBg: '#03C9D7',
      ProductImage:
        product7,
    },
    {
      OrderID: 893486,
      CustomerName: 'Hachalu Hundesa',
      TotalAmount: 93.31,
      OrderItems: 'Night Lamp',
      Location: 'Gonder',
      Status: 'canceled',
      StatusBg: '#FF5C8E',
      ProductImage:
        product4,
    },
    {
      OrderID: 748975,
      CustomerName: 'Dema Amano',
      TotalAmount: 23.99,
      OrderItems: 'Healthcare Erbology',
      Location: 'Mekele',
      Status: 'rejected',
      StatusBg: 'red',
      ProductImage:
        product1,
    },
    {
      OrderID: 94757,
      CustomerName: 'Gatwech Tap',
      TotalAmount: 95.99,
      OrderItems: 'Makeup Lancome Rouge',
      Location: 'Addis Ababa',
      Status: 'canceled',
      StatusBg: '#FF5C8E',
      ProductImage:
        product2,
    },
    {
      OrderID: 944895,
      CustomerName: 'Abenezer Amare',
      TotalAmount: 17.99,
      OrderItems: 'Skincare',
      Location: 'Addis Ababa',
      Status: 'active',
      StatusBg: '#03C9D7',
      ProductImage:
        product3,
    },
    {
      OrderID: 845954,
      CustomerName: 'Gemechis Segni',
      TotalAmount: 59.99,
      OrderItems: 'Headphone',
      Location: 'Addis Ababa',
      Status: 'complete',
      StatusBg: '#8BE78B',
      ProductImage:
        product4,
    },
    {
      OrderID: 845954,
      CustomerName: 'Joseph Birara',
      TotalAmount: 87.99,
      OrderItems: 'Shoes',
      Location: 'Addis Ababa',
      Status: 'pending',
      StatusBg: '#FB9678',
      ProductImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
    },
    {
      OrderID: 874534,
      CustomerName: 'Andargachew Tsige',
      TotalAmount: 122.99,
      OrderItems: 'Watch',
      Location: 'Addis Ababa',
      Status: 'canceled',
      StatusBg: '#FF5C8E',
      ProductImage:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
    },
    {
      OrderID: 38489,
      CustomerName: 'Tsegaye Gebermedin',
      TotalAmount: 87.99,
      OrderItems: 'Ice Cream',
      Location: 'Addis Ababa',
      Status: 'active',
      StatusBg: '#03C9D7',
      ProductImage:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg',
    },
    {
      OrderID: 24546,
      CustomerName: 'Ali Bira',
      TotalAmount: 84.99,
      OrderItems: 'Pan Cake',
      Location: 'Adama',
      Status: 'complete',
      StatusBg: '#8BE78B',
      ProductImage:
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    },
    {
      OrderID: 874534,
      CustomerName: 'Betselot Tadele',
      TotalAmount: 122.99,
      OrderItems: 'Watch',
      Location: 'Addis Ababa',
      Status: 'canceled',
      StatusBg: '#FF5C8E',
      ProductImage:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*',
    },
    
  ];