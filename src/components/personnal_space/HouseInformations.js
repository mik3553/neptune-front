import React, { Component } from 'react';
import HouseToModify from './HouseToModify';

export default class PersonalInformations extends Component {

    state = {
        isShow : false,
        details : this.props.details,
        services : {}
    }
    componentDidMount(){
        let options = {
            method : 'GET',
            headers : {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        }
        let services = this.state.details.services
        fetch(`http://localhost:4000/service/${services}`, options)
        .then(response => {
            response.json()
            .then(response =>{
                this.setState({services : response});
            })
        })
    }

    handleShow = () => {
        let isShow = !this.state.isShow;
        this.setState({isShow});
    }
    
    render() {
        let isShow = this.state.isShow;
        let houseToModify = null;
        if(isShow){
            houseToModify = <HouseToModify
                                details={this.state.details}
                            />
        }
       
        const {details}=this.state
        const services = {...this.state.services}
            // .map(service => (
            //     <ul key={service._id}>
            
            //     </ul>
            // ))
            console.log(services);
        const images = details.images
        .map( (photo,index) => (
            <img key={index} src={`http://localhost:4000/${photo}`} alt={photo} />
        ));
        return (
            <article className='houseInformations'>
                <div>
                    <h2>Informations de ma maison d'hôtes ({details.title})</h2>
                    <p><span>date d'ajoût : </span>{details.creationDate}</p>
                    <p><span>est en ligne : </span>{details.isAccepted === true ? 'Oui' : 'Non'}</p>
                    <p><span>description : </span>{details.description}</p>
                    <p><span>addresse : </span>{details.adress}</p>
                    <p><span>code postal : </span>{details.zipcode}</p>
                    <p><span>département : </span>{details.department}</p>
                    <p><span>nombre de chambres : </span>{details.nbrOfRooms}</p>
                    <p><span>nombre de lits : </span>{details.nbrOfBeds}</p>
                    <p><span>prix  : </span>{details.price} euros</p>
                    <h3><span>Services</span></h3>
                        <ul>
                            {services.breakfast ? <li>Repas</li> : null}
                            {services.landry ? <li>Blanchisserie</li> : null}
                            {services.animals ? <li>Animaux accéptés</li> : <li>Animaux non accéptés</li>}
                            {services.wi_fi ? <li>Wi-fi/Internet</li> : null}
                        </ul>
                    <h3><span>Photos</span></h3>
                    <div className='houseInformations-images'>{images}</div>
                </div>
                <button
                    className='button-modify'
                    onClick={this.handleShow}>
                    Modifier
                </button>
                {houseToModify}
            </article>
        )
    }
}