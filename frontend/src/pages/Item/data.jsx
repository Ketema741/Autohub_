import product1 from '../../data/product1.jpg';
import product2 from '../../data/product2.jpg';
import product3 from '../../data/product3.jpg';
import product4 from '../../data/product4.jpg';
import product5 from '../../data/product5.jpg';

export const initalState = [
    {
        idx: 1,
        pos: 1,
        title: 'Car Seat Covers',
        price: 49.99,
        rating: 4.5,
        image: product1,
        active: true
    },
    {
        idx: 2,
        pos: 2,
        title: 'Swagger',
        price: 1923,
        rating: 4.5,
        image: product2,
        active: true
    },
    {
        idx: 3,
        pos: 3,
        title: 'Corolla',
        price: 324,
        rating: 4.5,
        image: product2,
        active: true
    },
    {
        idx: 4,
        pos: 4,
        title: 'Vitz',
        price: 4987,
        rating: 4.5,
        image: product4,
        active: false
    },
    {
        idx: 5,
        pos: 6,
        title: 'Car Seat Covers',
        price: 1324,
        rating: 4.5,
        image: product5,
        active: false
    },
];


export const products = [
    {
        id: 1,
        title: 'Car Floor Mats',
        image: product1,
        price: 49.99,
        rating: 4.5,
    },
    {
        id: 2,
        title: 'Car Seat Covers',
        price: 49.99,
        rating: 4.5,
        image: product1,
        image: product2,
        price: 79.99,
        rating: 4.8,
    },
    {
        id: 3,
        title: 'Car Air Freshener',
        image: product3,
        price: 9.99,
        rating: 4.2,
    },
    {
        id: 4,
        title: 'Car Seat Covers',
        price: 49.99,
        rating: 4.5,
        image: product1,
        image: product4,
        price: 79.99,
        rating: 4.8,
    },
    {
        id: 5,
        title: 'Car Air Freshener',
        image: product5,
        price: 9.99,
        rating: 4.2,
    },
];