import React, { useState } from "react";
import './styles.css';

/** Row Component is used to render the individual contents of a user information
 *  1. handles the Edit Mode for a particular row as well using the two state i.e. setEditMode & setFieldsInputValue
 *  2. It also fires events related to deletion & checked stated of a particular row
 *  3. 
 */

const Row = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [fieldsInputValue, setFieldsInputValue] = useState({});

  const { id, onDelete, onEdit, resetPageCheckbox, onCheckBoxClick, checkedIds, ...restFields } = props;

  const onDeleteClick = (e) => {
    
    resetPageCheckbox();

    onDelete([{id: id}]);

    e.stopPropagation();
  }

  /** When clicked on Edit Mode it will toggle the edit state for the particular row */
  const handleEditMode = (e) => {

    /** If clicked on confirm it call the onEdit function of useQuery hook to store the saved values */
    if(editMode){

      onEdit(id,fieldsInputValue)

    }

    /** Initially copy the fields original value to state */
    setFieldsInputValue(editMode ? {} : {...restFields})

    /** toggles the edit state */
    setEditMode(prev => !prev);

    e.stopPropagation();

  }

  const handleFieldInput = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFieldsInputValue((prev) => ({ ...prev, [field] : value}));
    e.stopPropagation();

  }

  /** When checkbox is clicked we are firing the onCheckBoxClick Method of useCheckBoxSelection hook
   * which toogles the checked state of that particular row which is uniquely identified through it's id
   * 
  */
  const onCheckBoxChange = (e) => {

    const isChecked = e.target.checked;

    onCheckBoxClick(id, isChecked);

    e.stopPropagation();

  }

  return (
    <div className={`content-wrapper ${!!checkedIds[id] ? 'selected' : ''}`}>
      <div className="input-wrapper">
        <input type="checkbox" checked={!!checkedIds[id]} onChange={onCheckBoxChange} />
      </div>

      {Object.keys(restFields).map((fieldKey, index) => {

        const fieldName = restFields[fieldKey];

        if(editMode){

          const fieldValue = fieldsInputValue[fieldKey]

          return(
            <div key={`${index}-${fieldName}-input`} className="field-wrapper">
              <input
              type='text'
              id={fieldKey} 
              value={fieldValue}
              onChange={handleFieldInput}
              />
            </div>
            )

        }else{
          return (

            <div key={`${index}-${fieldName}`} id={`${index}-${fieldName}`} className="field-wrapper" >  
              {fieldName}
            </div>)
        }
      })}

      <div className="action-row">
        <button className="edit-btn" onClick={handleEditMode}>{editMode ? 'Confirm' : 'Edit'}</button>
        <button className="delete-btn" onClick={onDeleteClick}> Delete </button>
      </div>
    </div>
  );
};

export default Row;
