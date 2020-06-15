import React  from 'react';
import formDate from '../../utils/formatDate';
import './admin.css';

const GetClients = ({ client, deleteUser, btn, index}) => {
    
    let adminStyle = client.isAdmin ? { backgroundColor: 'red' } : { backgroundColor: 'initial' } ;
    return (
    
            <tr
                style={adminStyle}
                ref={(ref) => btn[index] = ref}
            >
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.email}</td>
                <td>{formDate(client.creationDate).length === 8 ? '0'+formDate(client.creationDate) : formDate(client.creationDate) }</td>
                <td><button onClick={() => deleteUser(client._id, index)}>Supprimer</button></td>
            </tr>
        
    )
}

export default GetClients;
