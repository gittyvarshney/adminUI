import { useEffect, useState } from "react";
import { dummyResponse } from "../resposne";
import { useMemo } from "react";
import { RECORDS_PER_PAGE } from "../constants";


/** It is a function which filter out the same data between two arrays matching by id */
const filterSameDataById = (arrOne,arrTwo) => {

    const filteredData = arrOne.filter((userData) => {
            
        for(let i=0; i< arrTwo.length; i++){
            if(userData.id === arrTwo[i].id){
                return false;
            }
        }
        return true;
    })

    return filteredData;
}

/** Return at which particular index of array the element is getting matched by the id */
const getMatchedIndexById = (id,arr) => {

    const currIndex = arr.findIndex((userData) => {
        if(userData.id === id){
            return true;
        }
        return false;
    })
    return currIndex;
}


// It is a custom hook which will provide us with the
// 1. currentUserData i.e. user info data in the form of array which is visisble on the screen for a particular page
// 2. totalPages i.e. the total number of pages exists in the user info data
// 3. currentPage i.e. the currently selected page through the bottom pagination
// 4. onDelete i.e. a function which will delete the selected row or individual row on clicking the delete or delete selected button
// 5. onEdit i.e. a function which will edit the current row when clicked on the confirm button
// 6. onPageChange i.e. a function which will change the page when clicked on a particular pagination button
// 7. onFilter i.e. a function which will apply filter on the user info when a value is entered in the search input field
const useGetData = (url) => {

    /** Parent data which we will populate by calling the provided api */
    const [allUsersData, setAllUsersData] = useState([]);

    /** It is a user data at a particular page which we will render on the screen */
    const [currentUsersData, setCurrentUsersData] = useState([]);

    /** If we applied filter we now use that filtered dataset instead of the Parent data */
    const [filteredData, setFilteredData] = useState(null);

    /** It holds the current state of the selected page */
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        new Promise((res,rej) => {
            setTimeout(() => {
                res(dummyResponse)
            },1000)
        }).then((response) => {
            console.log("response is: ", response);
            setAllUsersData(response)
        }).catch((err) => {
            console.log("something went wrong ", err);
        })

    }, []);

    /** this useEffect hook will update the page whenever there is some updates on allUsersData of filteredData  */
    useEffect(() => {

        onPageChange(currentPage);

    },[allUsersData,filteredData])


    /** When we apply the filter getNewDataSet will provide us the new data set based on the matched fields on any of the user field */
    const getNewDataSet = (input) => {

        const newDataSet = allUsersData.filter((userField) => {

            const fieldKeys = Object.keys(userField);

            for(const key of fieldKeys){

                const keyFieldValue = String(userField[key]).toLowerCase();

                if(keyFieldValue.includes(String(input).toLowerCase())){
                    return true;
                }
            }
            return false;
        })

        return newDataSet;

    }

    /** onPageChange will populate the currently selected page */
    const onPageChange = (currPage = 1) => {


        const currData = filteredData || allUsersData;
        const currLengthOfData = currData.length;


        const slicedData = currData.slice((currPage-1)*10, currLengthOfData >= currPage*RECORDS_PER_PAGE ? (currPage*10) : currLengthOfData);

        /** if somehow there is no data on this page decrease the pageNumber */
        if(currPage !== 1 && slicedData.length === 0){
            onPageChange(currPage-1);
        }else{
            setCurrentUsersData(slicedData);
            setCurrentPage(currPage);
        }
    }


    /** onFilter will trigger when we enter some data on the search bar */
    const onFilter = (input) => {

        if (input) {
          // first generate the new database based on matching fields
          const newDataSet = getNewDataSet(input);

          //then set the matched filtered dataset
          setFilteredData(newDataSet);
        } else {
          //if no input is provided it will simply make the filtered data set to null
          setFilteredData(null);
        }

    }

    // onDelete which will delete entries on the dataset which get matched by the corresponding Ids
    const onDelete = (entries) => {

        const trimmedData = filterSameDataById(allUsersData,entries);
        setAllUsersData(trimmedData);

        if(filteredData){
            const trimmedData = filterSameDataById(filteredData,entries);
            setFilteredData(trimmedData);
        }
    }

    // OnEdit will edit the particular user data matched by the Id
    const onEdit = (id,newEntry) => {

        const currIndex = getMatchedIndexById(id,allUsersData)

        if(currIndex !== -1){

            const updatedArray = allUsersData.toSpliced(currIndex,1,{id, ...newEntry})

            setAllUsersData(updatedArray)

            if(filteredData){
                const updatedArray = filteredData.toSpliced(currIndex,1,{id, ...newEntry})
                setFilteredData(updatedArray);
            }
        }

    }

    // Variable which provides the totalPages available on our current dataset
    const totalPages = useMemo(() => {

        const dataSetUsing = filteredData || allUsersData

        return Math.ceil(dataSetUsing.length/RECORDS_PER_PAGE);

    },[allUsersData,filteredData])

    return [currentUsersData, { totalPages, currentPage}, {onDelete, onEdit, onPageChange, onFilter}]
}

export default useGetData;