import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Rate } from 'antd';

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
                return (`https://neptune-back.abdelkrim-sahraoui.com/${chemin}`)
            }
            catch (err) {
                return require(`../../images/background.jpg`)
            }
        }
        const image = requireImage(details.images[0])
    
        // let rate = datails.rating;
        let totalRates = (array) => {
            let somme = 0;
            for (const rating of array) {
                somme += rating
            }
            return somme / array.length;
        }
        
        return (
            <figure className='house' onClick={this.handleClick}>
                <img 
                    className='image'
                    alt={image}
                    src={image}
                />
                <h2>{details.title}</h2>
                <figcaption>{details.description}</figcaption>
                <div className='house-details'>
                    
                    <div>nombre de chambes :<span className='house-span'>{details.nbrOfRooms}</span ></div>
                    <div>nombre de lits :<span className='house-span'>{details.nbrOfBeds}</span></div>
                    {/* <p>nombre de personnes{details.nbrOfPersons}</p> */}
                    <div>Prix :<span className='house-span'>{details.price} euros</span></div>
                    
                    <div>
                        Note : ({details.rating.length })<Rate className='rate' disabled defaultValue={totalRates(details.rating)} allowHalf={true} />
                    </div>
                </div>
                
            </figure>
        )
    }
}

export default withRouter(House)
