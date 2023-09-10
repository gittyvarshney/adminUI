import { useState } from 'react'


// It is a custom hook which will take care of our checkbox selections which provides us with
// 1. checkedIds: an object which holds the checked state of individual user ids
// 2. checkedPages: an object which holds the checked state of individual pages
// 3. onCheckBoxClick: a function which triggers when we change the checkbox field of a particular id
// 4. onPageCheckboxClicked: a function which triggers when we change the checkbox field of a particular page
// 5. resetPageCheckbox: reset to the initial state of checkedPages
// 6. resetIdCheckbox: reset to the initial state of checkedPages
const useCheckboxSelection = (userData) => {

    // store all the currently selected checkbox
    const [checkedIds, setCheckedIds] = useState({});

    // store all the currently selected pages
    const [checkedPages, setCheckedPages] = useState({});

    // onCheckBoxClick will set the current checked state of a particular id
    const onCheckBoxClick = (id, isChecked) => {

        const checkedIdObj = { ...checkedIds };

        if(isChecked){
            checkedIdObj[id] = true;
        }else{
            checkedIdObj[id] = false;
        }

        setCheckedIds(checkedIdObj)
    }

    const resetPageCheckbox = () => {
        
        setCheckedPages({});
    }

    const resetIdCheckbox = () => {
        setCheckedIds({});
    }

    // onPageCheckboxClicked will set the current checked state of all ids in a particular page as well as the checked state of a page
    const onPageCheckboxClicked = (pageNumber, isChecked) => {

        const checkedIdObj = { ...checkedIds };
        const checkedInPages = { ...checkedPages}

        userData.forEach((user) => {
            const { id } = user; 

            if(isChecked){
                checkedIdObj[id] = true
            }else{
                checkedIdObj[id] = false;
            }
        });

        if(isChecked){
            checkedInPages[pageNumber] = true;
        }else{
            checkedInPages[pageNumber] = false;
        }

        setCheckedPages(checkedInPages);
        setCheckedIds(checkedIdObj);

    }

    return [{checkedIds, checkedPages}, {onCheckBoxClick, onPageCheckboxClicked, resetPageCheckbox, resetIdCheckbox}]

}

export default useCheckboxSelection;