import React, { Component } from 'react';
import BookingDetails from './BookingDetails'

export default class PersonalInformations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookings : []
        }
    }
    componentDidMount(){
        let options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization' : `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch(`http://localhost:4000/houseBookings`, options)
            .then(response => {
                response.json()
                    .then(response => {
                        console.log(response)
                        // let bookings = [...this.state.bookings, response];
                        this.setState({bookings: response})
                    })
            })
    }

    render() {
        const bookings = [...this.state.bookings]
        .map(booking => (
            <BookingDetails
                key={booking._id}
                details={booking}
            />
        ))
        console.log(this.state.bookings)
        return (
            <article className='houseBookings'>
                <h2>Réservations clients</h2>
                <table>
                    <thead>
                        <tr>
                            {/* <td>réserver le:</td> */}
                            <td>Mme/Mr</td>
                            <td>arr</td>
                            <td>dép</td>
                            <td>Nbr/p</td>
                            <td>prix</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings}
                    </tbody>
                </table>
            </article>
        )
    }
}