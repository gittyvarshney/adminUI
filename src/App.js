import React from 'react';


import Header from './components/header';
import SearchBar from './components/searchBar';
import Footer from './components/footer';
import Content from './components/content';
import './App.css';

import useGetData from './hooks/useQuery';
import useCheckboxSelection from './hooks/useCheckboxSelection';

/** Code Implementation with of Admin-UI */
function App() {



    const [userData, pagination, actions ] = useGetData();

    const {totalPages, currentPage } = pagination;
    const {onDelete, onEdit, onPageChange, onFilter } = actions;

    const [checkboxState, checkboxActions ] = useCheckboxSelection(userData);

    const { checkedIds, checkedPages } = checkboxState;
    const {onCheckBoxClick, onPageCheckboxClicked, resetPageCheckbox, resetIdCheckbox} = checkboxActions;

    return (
    <div className='parent-wrapper'>
        <SearchBar onFilter={onFilter} resetPageCheckbox={resetPageCheckbox} />
        <Header onPageCheckboxClicked={onPageCheckboxClicked} checkedPages={checkedPages} currentPage={currentPage} userData={userData} />
        <Content 
            users={userData} 
            onDelete={onDelete} 
            onEdit={onEdit} 
            resetPageCheckbox={resetPageCheckbox} 
            onCheckBoxClick={onCheckBoxClick} 
            checkedIds={checkedIds} 
        />
        <Footer totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={onPageChange} 
            resetPageCheckbox={resetPageCheckbox}
            resetIdCheckbox={resetIdCheckbox}
            checkedIds={checkedIds}
            onDelete={onDelete}
        />
    </div>
    )

}

export default App;
