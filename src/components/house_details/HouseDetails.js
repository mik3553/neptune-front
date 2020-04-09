import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import AwesomeSlider from 'react-awesome-slider';
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
        const response     = await fetch(`http://localhost:4000/house/${this.props.match.params.id}`, options);
        const jsonData     = await response.json();
        const dataImage    = await jsonData.images;
        const dataServices = await jsonData.services; 
        
        this.setState({
            details : jsonData,
            images : dataImage,
            services: dataServices,
            noUser : false
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
        const response = await fetch(`http://localhost:4000/whishList`, options);
        if(response.status === 201){
            const jsonData = await response.json();
            console.log(jsonData);
        }else {
            this.setState({noUser : true})
        }
    }
    
    render() {
            const details = {...this.state.details}

            const images = [...this.state.images]
                .map(photo =>
                    <div
                        className='image-slide'
                        key={photo}
                        data-src={`http://localhost:4000/${photo}`} />
                )
            const services = [...this.state.services]
            .map(service => (
                <ul
                    key={service._id}
                >
                    {service.breakfast ? <li>Repas</li> : null}
                    {service.landry ? <li>Blanchisserie</li> : null}
                    {service.animals ? <li>Animaux accéptés</li> : <li>Animaux non accéptés</li>}
                    {service.wi_fi ? <li>Wi-fi/Internet</li> : null}
                </ul>
            ))
                
            return (
                <Fragment>
                    <Header />
                    <main>
                        <section className='house-details-page'>
                            <figure>
                                <AwesomeSlider
                                    className='slider'>
                                    {images}
                                </AwesomeSlider>
                                <h2>{details.title}</h2>
                                <figcaption>{details.description}</figcaption>
                                <div className='localisation'>
                                    <p>Adresse :</p>
                                    <p>{details.adress}</p>
                                    <p>{details.zipcode}</p>
                                    <p>{details.department}</p>
                                </div>
                                <div className='house-details-page-service'>
                                    <div>
                                        <p>nombre de chambes:{details.nbrOfRooms}</p>
                                        <p>nombre de lits:{details.nbrOfBeds}</p>
                                        <span>Note : {details.rating}/5</span>
                                        <img 
                                            onClick={this.addTowhishList}
                                            src={require('../../images/fav.jpeg')}
                                            alt='button favoris'
                                            title='ajouter au favoris'/>
                                        <span style={{color:'red', fontSize : '0.7em', marginTop: '-0.7rem'}}>
                                            {this.state.noUser ? 'Veuillez vous authentifier svp' : null}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Services :</p>
                                            {services}
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
                            {/* <span className='plus'></span> */}
                            {
                                localStorage.getItem('token') != null ? 
                                <AddComment
                                    house_id={this.props.match.params.id}
                                /> : null 
                            }
                            <Comments
                                house_id={this.props.match.params.id}
                            />
                            {/* <span className='plus'></span> */}
                        </section>
                    </main>
                    <Footer />
                </Fragment>
            )
        
    }
}
