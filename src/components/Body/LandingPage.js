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
             showFilter:false
        }
    }

    showFilter = () =>{
        this.setState(prevstate => ({
            showFilter: !prevstate.showFilter,
        }));
    }
    
    render() {
        return (
            <Fragment>
                <Header />
                <main className='landin-page'>
                    <div className='landin-page-bg'>
                        <input type='text' />
                    </div>
                    <div className='landin-page-sections'>
                        <section className='landin-page-houses'>
                            <House />
                        </section>
                        <Filter />
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}
