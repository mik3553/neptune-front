import React, { Component,Fragment } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import formatDate from '../../utils/formatDate'

import './booking.css'

export default class Finalize extends Component {

    // static propTypes = {
    //     name: PropTypes.string,
    // };

    state = {
        recap: this.props.history.location.state.booking
    }
    // async componentDidMount(){
    //     let options = {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/x-www-form-urlencoded',
    //             'Authorization': `bearer ${localStorage.getItem('token')}`
    //         }
    //     };
    //     const res = await fetch(`https://neptune-back.abdelkrim-sahraoui.com/booking/${this.state.booking_id}`, options);
    //     const recap = await res.json();
    //     this.setState(prevState => ({
    //         recap
    //     }))
    // }
    // componentDidUpdate(prevProps,prevState){
    //     if(prevState.recap !== this.state.recap){
    //         this.setState(prevState => ({
    //             recap: prevState.recap
    //         }))
    //     }
    //     console.log('update')
    // }
    

    render() {
        const recap = {...this.state.recap};
        // const booking_details = recap.booking_details_id;
        return (
            <Fragment>
                <Header />
                <main className='finalize'>
                    <section className='recap'>
                        <article>
                            <h2>Récapitulatif</h2>
                            <ul>
                                <li>Réservé le {formatDate(recap.creationDate)}</li>
                                <li>Arrivé le {formatDate(recap.booking_details_id.arrival)}</li>
                                <li>Départ le {formatDate(recap.booking_details_id.departure)}</li>
                                <li>Nombre de personne {recap.booking_details_id.nbrOfPersons}, prix par personne {recap.booking_details_id.priceEach} euros </li>
                                <li>Prix total {recap.booking_details_id.total_price} euros </li>
                            </ul>
                        </article>
                    </section>
                    <section className='payment'>
                        <article>
                            <img src={require('../../images/paypal.png') } alt='paypal' title='paypal' />
                        </article>
                    </section>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

