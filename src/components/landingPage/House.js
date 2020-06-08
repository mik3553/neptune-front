import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import './house.css'

class House extends Component {
   
    handleClick = (event) =>{
        event.preventDefault()
        this.props.history.push({
            pathname: `/house_details/${this.props.details._id}`,
        })
    }
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
        .map(image =>
            <div
                className='image-slide'
                key={image}
                data-src={requireImage(image)} />
        )

        return (
            <figure className='house' onClick={this.handleClick}>
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
                        {/* <p>nombre de personnes{details.nbrOfPersons}</p> */}
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

export default withRouter(House)
