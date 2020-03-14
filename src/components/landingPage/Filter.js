import React, { Component } from 'react'
import './filter.css'

export default class Filter extends Component {
    constructor(props) {
        super(props)
        this.wrapperFilterRef = React.createRef();
    }
    
    handleClick = ()=> {
        const wrapper = this.wrapperFilterRef.current;
        wrapper.classList.toggle('open-filter')
    }
    
    render() {
        return (
            <section
                ref={this.wrapperFilterRef}
                className='landin-page-filter'>
                <div>
                    <h3>Filtre</h3>
                    <article className='filtre'>
                        <fieldset>
                            <label>Restauration</label>
                            <input type='checkbox' />
                        </fieldset>
                        <fieldset>
                            <label>piscine</label>
                            <input type='checkbox' />
                        </fieldset>
                        <fieldset>
                            <label>Blanchisserie</label>
                            <input type='checkbox' />
                        </fieldset>
                        <fieldset>
                            <label>Animaux</label>
                            <input type='checkbox' />
                        </fieldset>
                    </article>
                </div>
                <div
                    className='showFilter'
                    onClick={this.handleClick}
                >
                    >
                </div>
            </section>
        )
    }
}
