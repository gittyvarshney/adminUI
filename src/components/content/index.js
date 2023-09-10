import React from "react";
import Row from '../row';
import './styles.css';

/** Content Component is the Placeholder for all the user's row data 
 *  It is just making the individual rows to stack below each other using
 *  justify-content: column of flex property
 */

const Content = (props) => {

    /** users array comporises of fields from api i.e. {id , name , email , role} */

    const { users = [], onDelete, onEdit, resetPageCheckbox, onCheckBoxClick, checkedIds } = props || {};

return(
    <div className="user-row-wrapper">
        {
            users.map((user,index) => {
                return(
                    <Row key={`user-${user.id}-${index}`} 
                        onDelete={onDelete} 
                        onEdit={onEdit} 
                        resetPageCheckbox={resetPageCheckbox}
                        onCheckBoxClick={onCheckBoxClick}
                        checkedIds={checkedIds}
                        {...user} 
                    />
                )
            })
        }
    </div>
)


}

export default Content;