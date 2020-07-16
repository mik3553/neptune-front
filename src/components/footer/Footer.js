import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer className='footer'>
                <h4>Neptune</h4>
                <section>
                    <article>
                        <ul>
                            <li className='list'>Condition et Usage</li>
                            <li><Link to='/'>Conditions générales d'utilisation</Link></li>
                            <li><Link to='/'>Conditions générales de vente</Link></li>
                            <li><Link to='/'>Mentions légales</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                        </ul>
                    </article>
                    <article>
                        <ul>
                            <li className='list'>Suivez nous sur</li>
                            <li><Link to='/'>Google+</Link></li>
                            <li><Link to='/'>Facebook</Link></li>
                            <li><Link to='/'>Twitter</Link></li>
                            <li><Link to='/'>Instagram</Link></li>
                        </ul>
                    </article>

                </section>
            </footer>
        )
    }
}
