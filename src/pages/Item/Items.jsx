import React, { useContext, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';

import { useStateContext } from '../../context/ContextProvider';
import ItemContext from '../../context/item/itemContext';
import ItemCard from './ItemCard'

const Items = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor,
        themeSettings,
        setThemeSettings,
    } = useStateContext();

    const itemContext = useContext(ItemContext)
    const { filtered, publicItems, getPublicItems, loading } = itemContext


    useEffect(() => {
        getPublicItems()

        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');

        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    return (
        <div tabIndex={0} className="focus:outline-none px-8">
            <div className="mx-auto container pt-24 ">
                <div className="flex flex-wrap items-center lg:justify-between justify-center">
                    {publicItems && publicItems.map((item) => (
                        <ItemCard item={item} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Items;
