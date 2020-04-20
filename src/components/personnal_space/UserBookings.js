import React from 'react';
import {Link} from 'react-router-dom';
import formatDate from '../../utils/formatDate';

export default function UserBookings({details}) {
    let dateArrival = details.booking_details_id.arrival
    let dateDeparture = details.booking_details_id.departure

    return (
        <li>
            arrivé le {formatDate(dateArrival)} départ le {formatDate(dateDeparture)}, nombre de personne ({ details.booking_details_id.nbrOfPersons}), montant du séjour {details.booking_details_id.total_price} euros
            <div><Link to={`/house_details/${details.house_id}`}>lien vers la maison d'hôte</Link></div>
        </li>
    )
}

