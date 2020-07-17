import React from 'react';
import formatDate from '../../utils/formatDate'

export default function BookingDetails({details}) {
    return (
        <tr>
            <td>{details.user_id.firstName} {details.user_id.lastName}</td>
            <td>{formatDate(details.booking_details_id.arrival)}</td>
            <td>{formatDate(details.booking_details_id.departure)}</td>
            <td>{details.booking_details_id.nbrOfPersons}</td>
            <td>{details.booking_details_id.total_price}</td>
        </tr>
    )
}
