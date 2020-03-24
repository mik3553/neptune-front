import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import AwesomeSlider from 'react-awesome-slider';
import './housedetails.css'
import Comments from './Comments';
import AddComment from './AddComment';

export default class HouseDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            details : {},
            images : [],
            services : {},
        }
    }
    
    componentDidMount(){
        this.getHouse()
    }
    getHouse = async ()=>{
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(`http://localhost:4000/house/${this.props.match.params.id}`, options);
        const jsonData = await response.json();
        const dataImage = await jsonData.images;
        const dataServices = await jsonData.services; 
        
        this.setState({
            details : jsonData,
            images : dataImage,
            services: dataServices,
        })
    }
    addTowhishList = async (event) => {
        const options = {
            method: 'POST',
            body : new URLSearchParams({
                _id: this.props.match.params.id
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization' : `bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`http://localhost:4000/whishList`, options);
        const jsonData = await response.json();
        console.log(jsonData)
    }
    
    render() {
        if(!this.state.details){
            return (
                <h3>Loading ...</h3>
            )
        }else {
            const {details} = this.state

            const images = [...this.state.images]
                .map(photo =>
                    <div
                        className='image-slide'
                        key={photo}
                        data-src={`http://localhost:4000/${photo}`} />
                )
            const services = {...this.state.services}
                
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
                                            src={require('../../images/fav.jpeg')}  alt='button favoris' title='ajouter au favoris'/>
                                    </div>
                                    <div>
                                        <p>Services :</p>
                                        <ul>
                                            {services.breakfast ? <li>Repas</li> : null}
                                            {services.landry    ? <li>Blanchisserie</li> : null}
                                            {services.animals ? <li>Animaux accéptés</li> : <li>Animaux non accéptés</li>}
                                            {services.wi_fi ? <li>Wi-fi/Internet</li> : null}
                                        </ul>
                                        <span>{details.price} euros</span>
                                        <button
                                            onClick={this.handleClick}
                                        >
                                            Réserver
                                    </button>
                                    </div>
                                </div>
                            </figure>
                        </section>

                        <section className='house-details-page'>
                            <span className='plus'></span>
                            {
                                localStorage.getItem('token') != null ? 
                                <AddComment
                                    house_id={this.props.match.params.id}
                                /> : null 
                            }
                            <Comments
                                house_id={this.props.match.params.id}
                            />
                            <span className='plus'></span>
                        </section>
                    </main>
                    <Footer />
                </Fragment>
            )
        }
    }
}
