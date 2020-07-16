import React from 'react';


export default function DeleteWish({wish_id, reference,index}) {

    console.log(reference)

    const deleteWhish = async () => {
        let options = {
            method: 'PUT',
            body: new URLSearchParams({
                _id: wish_id
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await fetch(`https://neptune-back.abdelkrim-sahraoui.com/whishList`, options);
        const jsonData = await response.json();
        console.log(jsonData);
        // supprimer le visu

        reference[index].classList.add('displayWish');
        // this.btn[index].classList.add('displayNone');

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

