import React from 'react';
import { Navbar, Footer, SupplierSidebar} from '../../../components';
import { useStateContext } from '../../../context/ContextProvider';

import AddItemDetail from './AddItemDetail';


const AddItem = () => {
    const { currentMode,  activeMenu } = useStateContext();

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className="flex relative dark:bg-main-dark-bg">
                {activeMenu ? (
                    <div className="w-52 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                        <SupplierSidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <SupplierSidebar />
                    </div>
                )}

                <div
                    className={
                        activeMenu
                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full  '
                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>

                    <AddItemDetail />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AddItem;
