import React, { useState } from "react";
import './styles.css';

/** Component which will take an input and apply the filter on whole dataset */
const SearchBar = ({onFilter, resetPageCheckbox}) => {

    const [inputVal, setInputVal ] = useState('');

    const onInputChange = (e) => {

        const input = e.target.value;

        /** set the local state as well */
        setInputVal(input);

        /** call onFilter props with the current value */
        onFilter(input);

        /** need to reset the state of checked pages to provide sync for the user experience */
        resetPageCheckbox();

    }


    return(
        <div className="search-bar-input">
            <input type='text' placeholder="Search by name email or role" value={inputVal} onChange={onInputChange} />
        </div>
    )

}

export default SearchBar;