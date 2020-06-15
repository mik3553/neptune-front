import React, { Component, Fragment } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import House from './House';
import Filter from './Filter';
import './landingPage.css'

export default class LandingPage extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            houses : [],
            region : '',
            noHouses : null
        }
    }
    componentDidMount(){
        this.getHouses();
    }
    getHouses = () => {
        fetch('http://localhost:4000/houses', {methode : 'GET'})
        .then(response => {
            response.json()
            .then(response =>{
                console.log(response)
                this.setState({houses : response})
            });
        })
    }
    handelChange = (event) => {
        const {name , value} = event.target;
        this.setState({[name] : value})
    } 
    getHousesByRegion = (event) => {
        event.preventDefault();
        if (this.state.region !== '' ){
            fetch('http://localhost:4000/house/searchBar/'+this.state.region, {methode : 'GET'})
            .then(response => {
                // console.log(response)
                if(response.status === 200) {
                    response.json()
                    .then(response =>{
                        if(response.length > 0){
                            // console.log(response.length)
                            this.setState({houses : response, noHouses: null});
                        } else if (this.state.region === 'Toute les régions'){
                            this.getHouses();
                            this.setState({ noHouses: null});
                        } else {
                            this.setState({ houses : [],noHouses: 'Pas encore de maisons d\'hotes dans cette région' });
                        }
                    });
                }
                else {
                    this.getHouses();
                    this.setState({ noHouses: null });
                }
            })
            .catch(err => {
                console.log(err);
            })
        }else {
            this.getHouses();
            this.setState({  noHouses: null });
        }
    }
    
    render() {
        let noHouses = this.state.noHouses;
        const houses = [...this.state.houses]
            .map(house => {
                if(house.isAccepted === true){
                    return  <House 
                                key={house._id}
                                details={house}
                            />
                }
            })
        return (
            <Fragment>
                <Header />
                <main className='landin-page'>
                    <div className='landin-page-bg'>
                        <form onSubmit={this.getHousesByRegion} value={this.state.region}>
                            <select name="region" onChange={this.handelChange}>
                                <option value="Toute les régions">--Toutes les régions--</option>
                                <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                                <option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</option>
                                <option value="Bretagne">Bretagne</option>
                                <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                                <option value="corse">Corse</option>
                                <option value="Grand Est">Grand Est</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guyane">Guyane</option>
                                <option value="Hauts-de-France">Hauts-de-France</option>
                                <option value="Île-de-France">Île-de-France</option>
                                <option value="La Réunion">La Réunion</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Normandie">Normandie</option>
                                <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                                <option value="Occitanie">Occitanie</option>
                                <option value="Pays de la Loire">Pays de la Loire</option>
                                <option value="Provence-Alpes-Côte d'Azur">Provence-Alpes-Côte d'Azur</option>
                            </select>
                            <input type="submit"  />
                        </form>
                    </div>
                    <div className='landin-page-sections'>

                        <Filter />
                        <section className='landin-page-houses'>
                            <p>{noHouses}</p>
                            {houses}
                        </section>
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}
