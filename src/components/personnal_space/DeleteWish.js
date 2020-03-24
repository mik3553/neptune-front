import React from 'react';


export default function DeleteWish({itemToDelete, deleted}) {

    const deleteWhish = async () => {
        let options = {
            method: 'PUT',
            body: new URLSearchParams({
                _id: itemToDelete
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await fetch(`http://localhost:4000/whishList`, options);
        const jsonData = await response.json();
        console.log(jsonData);
        deleted();
    }
    return (
        <button
            onClick={deleteWhish}
            className='whishlist-button'
        >
            supprimer
        </button>
    )
}

