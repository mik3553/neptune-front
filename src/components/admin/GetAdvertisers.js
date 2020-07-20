import React  from 'react';
import formDate from '../../utils/formatDate'

const GetAdvertisers = ({ advertiser, deleteUser, btnDeleteClient, index, checkHouse, validateHouse }) => {

    let isAccepted = advertiser.advertiser[0].isAccepted === false ? 'mettre en ligne' : 'mettre hors ligne' ;
   
    // useEffect(() => {
        // getUsers();
    // }, [advertiser]); 

    
    return (
            <tr 
                ref={(ref) => btnDeleteClient[advertiser._id] = ref}
                className={advertiser.advertiser[0].isAccepted ? 'onLine' : 'notOnLine'}
                style = {advertiser.advertiser[0].isAccepted === false ? { backgroundColor: 'orange' } : { backgroundColor: 'initial' }}
            >
                <td>{advertiser.firstName}</td>
                <td>{advertiser.lastName}</td>
                <td>{advertiser.email}</td>
                <td>{formDate(advertiser.creationDate)}</td>
                <td>
                    <form onSubmit={(e) => validateHouse(e,advertiser.advertiser[0]._id, !advertiser.advertiser[0].isAccepted)} >
                        <input type='submit' value={isAccepted}/>
                    </form>
                </td>
                <td><button onClick={() => checkHouse(advertiser.advertiser[0]._id)}>check</button></td>
                <td><button onClick={() => deleteUser(advertiser._id )}>Supprimer</button></td>
            </tr>
    )
}

export default GetAdvertisers;