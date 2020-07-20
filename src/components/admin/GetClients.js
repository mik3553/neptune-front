import React  from 'react';
import formDate from '../../utils/formatDate';
import './admin.css';

const GetClients = ({ client, deleteUser, index, btnDeleteClient}) => {
    
    let adminStyle = client.isAdmin ? { backgroundColor: 'red' } : { backgroundColor: 'initial' } ;
    return (
    
            <tr
                style={adminStyle}
                ref={(ref) => btnDeleteClient[client._id] = ref}
                className='lol'
            >
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.email}</td>
                <td>{formDate(client.creationDate) }</td>
                <td><button onClick={() => deleteUser(client._id)}>Supprimer</button></td>
            </tr>
        
    )
}

export default GetClients;
