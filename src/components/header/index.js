import React from "react";
import './styles.css'
import { HEADER_FIELDS } from "../../constants";

/** Header component will populate the Header Row and it's fields which are dynamically derived from response */
const Header = (props) => {

    const {onPageCheckboxClicked, checkedPages, currentPage, userData } = props;

    const { id, ...restFields } = (userData && userData[0]) || HEADER_FIELDS;

    const handlePageCheckbox = (e) => {

        const isChecked = e.target.checked;
        console.log(isChecked);
        console.log(currentPage);
        onPageCheckboxClicked(currentPage,isChecked);

    }

    return(
        <div className="header-wrapper">
            <div className="checkbox-wrapper">
                <input type='checkbox' checked={!!checkedPages[currentPage]} onChange={handlePageCheckbox} />
            </div>
            {
                Object.keys(restFields).map((fieldKey,index) => {
                    const firstLetter = fieldKey.charAt(0).toUpperCase();
                    const headerField = firstLetter + fieldKey.slice(1);
                    return(
                        <div key={`${index}-${headerField}`} className="text-row">
                        {headerField}
                    </div>  
                    )
                })
            }
            <div className="action-row">
                Actions
            </div>

        </div>
    )
}

export default Header;