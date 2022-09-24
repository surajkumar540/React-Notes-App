import React, { useEffect, useState } from 'react'
import './App.css';

// get the all item in local storage




const App = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const [allItems, setAllItems] = useState([]);


    const getLocalItems = () => {
        // console.log(list);
        let response = localStorage.getItem("lists");
        let data = JSON.parse(response)
        if (data) {
            setItems(data);
            setAllItems(data);
        }
    }

    const searchItems = (e) => {
        let searchArr = allItems.filter((data) => {
            return data.name.includes(e.target.value)
        })
        console.log(searchArr);
        setItems(searchArr);
    }

    const updateLocalItems = (array) => {
        localStorage.setItem('lists', JSON.stringify(array));
        setItems(array);
        setAllItems(array);
    }

    const inputHandler = (event) => {
        // console.log(event.target.value);
        setInputData(event.target.value);
    }



    const addItem = () => {

        if (!inputData) {
            alert("plz fill the data")
        }
        else if (inputData && !toggleSubmit) {

            let modifyArr = items.map((elem) => {
                if (elem.id === isEditItem) {
                    return { ...elem, name: inputData }
                }
                return elem;
            })
            updateLocalItems(modifyArr);
            setToggleSubmit(true);
            setInputData("");
            setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toLocaleString(), name: inputData }
            let arr = [...items, allInputData];
            updateLocalItems(arr);
            setInputData("");
        }
    }

    const deleteItems = (index) => {
        //match same id and delete same id 
        const updateItems = items.filter((elem) => {
            return index !== elem.id;
        });
        updateLocalItems(updateItems);
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        // console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    // Set Item in Local Storage.....
    useEffect(() => {
        getLocalItems();
    }, []);
    return (
        <>
            <div className='main_div'>
                <div className='center_div'>
                    <input className='input' type='text' placeholder='Add the task' value={inputData} onChange={inputHandler} />
                    {
                        toggleSubmit ? <button className='button' onClick={addItem}> + </button> :
                            <i className='fa fa-edit button-ji' onClick={addItem} />
                    }
                    <input className='search-bar' type='text' placeholder='search' onChange={searchItems} />
                    <ol>
                        {
                            items.map((elem) => {
                                return (
                                    <div className='todo_style' key={elem.id}>
                                        <li className=' fa-times fa fa-wrong' aria-hidden='true' onClick={() => { deleteItems(elem.id) }}></li>
                                        <i className='fa fa-edit' onClick={() => { editItem(elem.id) }} />
                                        <li>{elem.name}</li>
                                    </div>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        </>
    )
}

export default App
