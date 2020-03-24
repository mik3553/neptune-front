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
            houses : []
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
                this.setState({houses : response})
            });
        })
    }
    

    render() {
        const houses = [...this.state.houses]
            .map(house =>
                <House 
                    key={house._id}
                    details={house}/>
            )
        return (
            <Fragment>
                <Header />
                <main className='landin-page'>
                    <div className='landin-page-bg'>
                        <input type='text' />
                    </div>
                    <div className='landin-page-sections'>

                        <Filter />
                        <section className='landin-page-houses'>
                            {houses}
                        </section>
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}
