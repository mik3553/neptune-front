import React, { Component } from 'react';
import HouseToModify from './HouseToModify';

export default class PersonalInformations extends Component {

    state = {
        isShow : false,
        details : this.props.details,
    }
    // abortController = new AbortController();
    // componentDidMount(){
    //     let options = {
    //         signal: this.abortController.signal,
    //         method : 'GET',
    //         headers : {
    //             'Content-type': 'application/x-www-form-urlencoded',
    //         }
    //     }
    //     let services = this.state.details.services
    //     console.log(services)
    //     fetch(`https://neptune-back.abdelkrim-sahraoui.com/service/${services}`, options)
    //     .then(response => {
    //         response.json()
    //         .then(response =>{
    //             this.setState({services : response});
    //         })
    //     })
    // }
    // componentWillUnmount() {
    //     this.abortController.abort();
    // }

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
       
        const {details}=this.state;
        let creationDate = details.creationDate
        let date = new Date(creationDate)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let house_creation_date = `${day}-${month}-${year}`
        const services = this.state.details.services

        const images = details.images
        .map( (photo,index) => (
            <img key={index} src={`https://neptune-back.abdelkrim-sahraoui.com/${photo}`} alt={photo} />
        ));
        return (
            <article className='houseInformations'>
                <div>
                    <h2>Informations de ma maison d'hôtes ({details.title})</h2>
                    <p><span>date d'ajoût : </span>{house_creation_date}</p>
                    <p><span>est en ligne : </span>{details.isAccepted === true ? 'Oui' : 'Non'}</p>
                    <p><span>description : </span>{details.description}</p>
                    <p><span>addresse : </span>{details.adress}</p>
                    <p><span>code postal : </span>{details.zipcode}</p>
                    <p><span>region : </span>{details.region}</p>
                    <p><span>nombre de chambres : </span>{details.nbrOfRooms}</p>
                    <p><span>nombre de lits : </span>{details.nbrOfBeds}</p>
                    <p><span>prix  : </span>{details.price} euros</p>
                    <h3><span>Services</span></h3>
                        <ul>
                            {services[0] !== 'undefined' ? <li>Repas</li> : null}
                            {services[1] !== 'undefined' ? <li>Blanchisserie</li> : null}
                            {services[2] !== 'undefined' ? <li>Animaux acceptés</li> : <li>Animaux non accéptés</li>}
                            {services[3] !== 'undefined' ? <li>Wi-fi/Internet</li> : null}
                            {services[4] !== 'undefined' ? <li>Piscine</li> : null}
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