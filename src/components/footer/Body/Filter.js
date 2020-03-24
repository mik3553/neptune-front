import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <section
                onClick={this.props.showFilter}
                className='landin-page-filter'>
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
            </section>
        )
    }
}
