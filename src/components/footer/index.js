import React from 'react';
import './styles.css';
import { TOTAL_PAGE_BUTTONS_TO_SHOW, FAST_FORWARD, FORWARD, FAST_BACKWARD, BACKWARD } from '../../constants';

/** Footer component used to handle logic related to DeleteSelection & different pagination clicks 
 *  have functions related to onButtonClick when clicking on particular pagination button
 */
const Footer = (props) => {

    const { totalPages, currentPage, onPageChange, checkedIds, onDelete, resetPageCheckbox, resetIdCheckbox } = props;

    /** Triggers when clicked on a particular pagination button */
    const onButtonClick = (e) => {
      const chosenPageNo = Number(e.target.id);
      if(chosenPageNo !== currentPage){
        onPageChange(chosenPageNo)
      }
      e.stopPropagation();
    }

    /** Triggers when clicked on a particular pagination helper buttons */
    const onForwardBackwardClick = (e) => {

      const clickedInstance = e.target.id;

      switch(clickedInstance){
        case FAST_BACKWARD:
          currentPage > 1 && onPageChange(1);
          break;
        case BACKWARD:
          currentPage > 1 && onPageChange(currentPage - 1)
          break;
        case FAST_FORWARD:
          currentPage < totalPages && onPageChange(totalPages)
          break;
        case FORWARD:
          currentPage < totalPages && onPageChange(currentPage + 1)
          break;
        default:
          //do nothing
      }

      e.stopPropagation();

    }

    /** Triggers when clicked on delete Selection button */
    const handleDeleteSelected = () => {

      if(Object.keys(checkedIds).length > 0){
        const idsToDelete = [];
        Object.keys(checkedIds).forEach((key) => {

          if(checkedIds[key]){
            idsToDelete.push({id: key})
          }

        })

        if(idsToDelete.length > 0){
          onDelete(idsToDelete);
          resetIdCheckbox();
          resetPageCheckbox();
        }

      }

    }

    /** this function will render the pagination buttons dynamically based on current page and total pages */
    const populatePages = (totalPages = 0, currentPage=1) => {

      const buttonsToShow = [];
      /** how many left pagination buttons to show from current button */
      const leftButton = currentPage - TOTAL_PAGE_BUTTONS_TO_SHOW >= 0 ? currentPage - TOTAL_PAGE_BUTTONS_TO_SHOW : 0;
      /** how many right pagination buttons to show form current button */
      const rightButton = totalPages - currentPage >= TOTAL_PAGE_BUTTONS_TO_SHOW - 1 ? (currentPage + TOTAL_PAGE_BUTTONS_TO_SHOW - 1) : totalPages; 
  
      for(let i=leftButton; i < rightButton; i++){
          buttonsToShow.push(
              <button id={i+1} key={`${i+1}-btn`} className={`round-button ${i+1 === currentPage ? 'pageSelected' : ''}`} onClick={onButtonClick}>
                  {i+1}
              </button>
          )
      }
      return buttonsToShow;
  }

    return (
      <div className="footer-wrapper">
        <div className="delete-selected">
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
        <div className="page-buttons-wrapper" onClick={onForwardBackwardClick}>
          <button id={FAST_BACKWARD} className={`round-button ${currentPage === 1 ? 'grey-btn' : ''}`}>{"<<"}</button>
          <button id={BACKWARD} className={`round-button ${currentPage === 1 ? 'grey-btn' : ''}`} >{"<"}</button>
          {populatePages(totalPages, currentPage)}
          <button id={FORWARD} className={`round-button ${currentPage === totalPages ? 'grey-btn' : ''}`} >{">"}</button>
          <button id={FAST_FORWARD} className={`round-button ${currentPage === totalPages ? 'grey-btn' : ''}`} >{">>"}</button>
        </div>
      </div>
    );

}

export default Footer;