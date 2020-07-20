import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'

import 'antd/dist/antd.css';
import { Carousel } from 'antd';

import Comments from './Comments';
import AddComment from './AddComment';
import Booking from '../booking/Booking';

import './housedetails.css'

export default class HouseDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            details : {},
            images : [],
            services : [],
        }
    }
    
    componentDidMount(){
        this.getHouse()
    }
    getHouse = async () =>{
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        };
        const response     = await fetch(`https://neptune-back.abdelkrim-sahraoui.com/house/${this.props.match.params.id}`, options);
        const jsonData     = await response.json();
        const dataImage    = await jsonData.images;
        const dataServices = await jsonData.services; 
        
        this.setState({
            details : jsonData,
            images : dataImage,
            services: dataServices,
            noUser : null
        })
    }
    addTowhishList = async () => {
        
        const options = {
            method: 'POST',
            body : new URLSearchParams({
                house_id: this.props.match.params.id
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization' : `bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`https://neptune-back.abdelkrim-sahraoui.com/whishList`, options);
        if(response.status === 201){
            // const jsonData = await response.json();
            // console.log(jsonData);
            this.setState({ noUser: 'Ajoutée à votre favoris avec succé' });
        }else if (response.status === 204) {
            this.setState({noUser : 'Existe déja dans vos favoris'});
        }else if (response.status === 403){
            this.setState({ noUser: 'Veuillez vous authentifier svp !' });
        }else {
            this.setState({ noUser: 'probléme avec la maison d\'hote' });
        }
    }
    
    render() {
            const details = { ...this.state.details}
            console.log(details)

            const images = [...this.state.images]
                .map(photo =>
                    <img
                        alt= {photo}
                        className='image-slide'
                        key={photo}
                        src={`https://neptune-back.abdelkrim-sahraoui.com/${photo}`} />
                )
            const services = [...this.state.services];
            services.map(service => {
                // console.log(service)
                if(service != null){
                    return (
                        <li key={service}>{service}</li>
                    )
                }
            })
            

        
            return (
                <Fragment>
                    <Header />
                    <main>
                        <section className='house-details-page'>
                            <figure>
                                <Carousel
                                    autoplay
                                >
                                    {images}
                                </Carousel>
                               
                                <div className='house-details-page-service'>
                                    <h2>{details.title}</h2>
                                    <figcaption>{details.description}</figcaption>
                                    <div className='localisation'>
                                        <div>
                                            <p>Adresse :</p>
                                            <p>{details.adress}</p>
                                            <p>{details.zipcode}</p>
                                            <p>{details.region}</p>
                                        </div>
                                        <div className='favoris'>
                                            <img
                                                onClick={this.addTowhishList}
                                                src={require('../../images/fav.jpeg')}
                                                alt='button favoris'
                                                title='ajouter au favoris'
                                            />
                                            <span style={{ color: 'red', fontSize: '0.7em', marginTop: '-0.5rem' }}>
                                                {this.state.noUser != null ? this.state.noUser : null}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>nombre de chambes: {details.nbrOfRooms}</p>
                                        <p>nombre de lits: {details.nbrOfBeds}</p>
                                        {/* <span>Note : {details.rating}/5</span> */}
                                        
                                    </div>
                                    <div>
                                        <p>Services :</p>
                                        <ul>
                                            {/* {services} */}
                                            {services[0] !== 'undefined' ? <li>Repas</li> : null}
                                            {services[1] !== 'undefined' ? <li>Blanchisserie</li> : null}
                                            {services[2] !== 'undefined' ? <li>Animaux acceptés</li> : <li>Animaux non accéptés</li>}
                                            {services[3] !== 'undefined' ? <li>Wi-fi/Internet</li> : null}
                                            {services[4] !== 'undefined' ? <li>Piscine</li> : null}
                                        </ul>
                                        <span>Prix par personne: {details.price} euros</span>
                                    </div>
                                </div>
                            </figure>
                            <article>
                                <Booking 
                                    house_id = {this.props.match.params.id}
                                    house = {details}
                                />
                            </article>
                        </section>

                        <section className='house-details-page'>
                            <AddComment
                                house_id={this.props.match.params.id}
                            />
                            <Comments
                                house_id={this.props.match.params.id}
                            />
                        </section>
                    </main>
                    <Footer />
                </Fragment>
            )
        
    }
}
