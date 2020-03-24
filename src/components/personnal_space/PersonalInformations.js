import React, { Component } from 'react'
import DeleteWish from './DeleteWish'

export default class PersonalInformations extends Component {

    constructor(props) {
        super(props)

        this.wishDeleted = React.createRef();
    }
    deleted = () => {
        const wishDeleted = this.wishDeleted.current;
        wishDeleted.classList.add('displayWish');
    }
    render() {
        const {user} = this.props
        const wishList = [...this.props.wishList]
            .map(wish => 
                <li 
                    ref={this.wishDeleted}
                    key={wish._id}
                    className='whishlist'>
                    <p><span>{wish.title}</span> ({wish.description})</p>
                    <DeleteWish 
                        itemToDelete={wish._id}
                        deleted = {this.deleted}
                    />
                </li>
            );
        
        return (
            <article className='personalInformations'>
                <div>
                    <h2>Mes informations personnels</h2>
                    <p><span>date d'inscription : </span>{user.creationDate}</p>
                    <p><span>Prénom : </span>{user.firstName}</p>
                    <p><span>Nom : </span>{user.lastName}</p>
                    <p><span>e-mail : </span>{user.email}</p>
                </div>
                <div className='whishlists'>
                    <h2>Mes favoris</h2>
                    <ul>
                        {wishList}
                    </ul>
                </div>
            </article>
        )
    }
}
