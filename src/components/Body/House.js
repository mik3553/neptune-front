import React, { Component } from 'react'
import './house.css'

export default class House extends Component {
    render() {

        // const requireImage = (chemin) => {
        //     try {
        //         return require(`../img/${chemin}`)
        //     }
        //     catch (err) {
        //         return require(`../img/default.jpeg`)
        //     }
        // }

        return (
            <figure className='house'>
                <img src={require('../../images/background.jpg')} alt='h'/>
                <h2>title</h2>
                <figcaption>
                    descriptif qjkfnjkef  aefnkz jkf nzjknjkaf  akfan,az ofkzafl 
                </figcaption>
                <div className='house-details'>
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                    <div>
                    <span>4.5 euro</span>
                    <button>
                        Réserver
                    </button>
                    </div>
                </div>
            </figure>
        )
    }
}
