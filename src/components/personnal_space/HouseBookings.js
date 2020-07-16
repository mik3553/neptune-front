import React, { Component } from 'react';
import BookingDetails from './BookingDetails'

export default class PersonalInformations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookings : []
        }
    }
    abortController = new AbortController();
    componentDidMount(){
        let options = {
            signal: this.abortController.signal,
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization' : `bearer ${localStorage.getItem('token')}`
            },
            
        }
        if(localStorage.getItem('token') !== null){
            fetch(`https://neptune-back.abdelkrim-sahraoui.com/houseBookings`, options)
                .then(response => {
                    response.json()
                        .then(response => {
                            // let bookings = [...this.state.bookings, response];
                            this.setState({ bookings: response })
                        })
                        .catch(err => {
                            this.setState({ bookings: [] })
                        })
                })
                .catch(err => {
                    this.setState({ bookings: [] })
                })
        }
        
    }
    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        let bookings = []
        if(this.state.bookings.length > 0){
             bookings = [...this.state.bookings]
            .map(booking => (
                <BookingDetails
                    key={booking._id}
                    details={booking}
                />
            ))
        }
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