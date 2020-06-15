import React from 'react';
import formDate from '../../utils/formatDate'

const GetAdvertisers = ({ advertiser, deleteUser, btn, index, checkHouse, validateHouse }) => {

    let isAccepted = advertiser.advertiser[0].isAccepted === false ? 'mettre en ligne' : 'mettre hors ligne' ;
   
    return (
            <tr 
                data-advertiser={advertiser.advertiser[0]}
                ref={(ref) => btn[index] = ref}
                style = {advertiser.advertiser[0].isAccepted === false ? { backgroundColor: 'orange' } : { backgroundColor: 'initial' }}
            >
                <td>{advertiser.firstName}</td>
                <td>{advertiser.lastName}</td>
                <td>{advertiser.email}</td>
                <td>{formDate(advertiser.creationDate).length === 8 ? '0' + formDate(advertiser.creationDate) : formDate(advertiser.creationDate)}</td>
                <td>
                    <form onSubmit={(e) => validateHouse(e,advertiser.advertiser[0]._id, !advertiser.advertiser[0].isAccepted, index)} >
                        <input type='submit' value={isAccepted}/>
                    </form>
                </td>
                <td><button onClick={() => checkHouse(advertiser.advertiser[0]._id)}>check</button></td>
                <td><button onClick={() => deleteUser(advertiser._id, index )}>Supprimer</button></td>
            </tr>
    )
}

export default GetAdvertisers;