import React, { Component } from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import './house.css'

export default class House extends Component {
    render() {

        const {details} = this.props;

        const requireImage = (chemin) => {
            try {
                return (`http://localhost:4000/${chemin}`)
            }
            catch (err) {
                return require(`../../images/background.jpg`)
            }
        }
        const images = details.images
            .map(item =>
                <div
                    className='image-slide'
                    key={item}
                    data-src={requireImage(item)} />
                )

        return (
            <figure className='house'>
                <AwesomeSlider 
                    className='slider'>
                    {images}
                </AwesomeSlider>
                <h2>{details.title}</h2>
                <figcaption>{details.description}</figcaption>
                <div className='house-details'>
                    <div>
                        <p>nombre de chambes{details.nbrOfRooms}</p>
                        <p>nombre de lits{details.nbrOfBeds}</p>
                        <p>nombre de personnes{details.nbrOfPersons}</p>
                        <span>Note : {details.rating}/5</span>
                    </div>
                    <div>
                        <span>{details.price} euros</span>
                        <button
                            onClick={this.handleClick}
                        >
                            details
                        </button>
                    </div>
                </div>
            </figure>
        )
    }
}
