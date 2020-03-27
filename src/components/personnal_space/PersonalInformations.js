import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DeleteWish from './DeleteWish';
// import { TransitionGroup } from 'react-transition-group';

export default class PersonalInformations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deleteWish : false
        }
    }

    deleteWish = (event) => {
        this.setState({
            deleteWish : true
        })
    }
    render() { 
        const {user} = this.props
        let creationDate = user.creationDate
        let date = new Date(creationDate)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let user_creation_date = `${day}-${month}-${year}`

        const wishList = [...this.props.wishList]
            .map(wish => {
                const wishLists = [...this.props.wishList]
                if (wishLists.length > 0) {
                    return  <li
                                style={{ display: this.state.deleteWish ? 'none' : null }  }
                                key={wish._id}
                                className='whishlist'
                            >
                                <Link
                                to={`/house_details/${wish._id}`}
                                >
                                    <p><span>{wish.title}</span> ({wish.description})</p>
                                </Link>
                                <DeleteWish
                                    wish_id={wish._id}
                                    deleted={this.deleteWish}
                                />
                            </li>            
                }else{
                    return <li>Vous n'avez enregistrer aucun favoris pour le moment</li>
                }
            });
        
        return (
            <article className='personalInformations'>
                <div>
                    <h2>Mes informations personnels</h2>
                    <p><span>date d'inscription : </span>{user_creation_date}</p>
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




// class App extends React.Component {
//     constructor(props) {
//         super(props);

//         this.username = React.createRef();
//         this.password = React.createRef();
//         this.state = {
//             errors: []
//         };
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         const username = this.username.current.value;
//         const password = this.password.current.value;
//         const errors = this.handleValidation(username, password);

//         if (errors.length > 0) {
//             this.setState({ errors });
//             return;
//         }
//         // Submit data
//     };

//     handleValidation = (username, password) => {
//         const errors = [];
//         // Require username to have a value on submit
//         if (username.length === 0) {
//             errors.push("Username cannot be empty");
//         }

//         // Require at least six characters for the password
//         if (password.length < 6) {
//             errors.push("Password should be at least 6 characters long");
//         }

//         // If those conditions are met, then return error messaging
//         return errors;
//     };

//     render() {
//         const { errors } = this.state;
//         return (
//             <div>
//                 <h1>React Ref Example</h1>
//                 <form onSubmit={this.handleSubmit}>
//                     // If requirements are not met, then display errors
//                     {errors.map(error => <p key={error}>{error}</p>)}
//                     <div>
//                         <label>Username:</label>
//                         // Input for username containing the ref
//                         <input type="text" ref={this.username} />
//                     </div>
//                     <div>
//                         <label>Password:</label>
//                         // Input for password containing the ref
//                         <input type="text" ref={this.password} />
//                     </div>
//                     <div>
//                         <button>Submit</button>
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }
