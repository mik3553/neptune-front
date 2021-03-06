import React, { Component, Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import GetClients from './GetClients';
import GetAdvertisers from './GetAdvertisers';
import Messages from './Message';
import './admin.css';
// import formatDate from '../../utils/formatDate';

export default class Admin extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isAuthorised : false,
            clients : [],
            advertisers : [],
            houses : [],
            messages : [],
            countMessage : null
            // toogleValidateHouse : false
        }

        // this.displayNone = null;

        // this.setDisplayNone = element => {
        //     this.displayNone = element;
        // }
        // this.displayElement = () => {
        //     this.displayNone.classList.add('displayNone');
        // }

        this.btn = [];
        this.btnDeleteClient = [];
        // this.btnDeleteAdvertiser = [];
        this.opened = [];
        this.displayArticle = [];
    }
    
    componentDidMount(){
        this.getUsers();
        this.messages();
        this.countMessages();
    }
    // componentDidUpdate(prevProps, prevState){
    //     console.log(prevState.advertisers)
    //     console.log(this.state.advertisers)
    //     // let advertisers = this.state.advertisers
    //     // console.log(advertisers);
    //     // if (advertisers !== prevState.advertisers){
    //     //     // this.getUsers();
    //     //     // this.setState({advertisers});
    //     // }
    // }
    messages = async (event) => {
        if (!localStorage.getItem('token')) {
            this.setState({ isAuthorised: false })
        } else {
            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            };
            const response = await fetch('https://neptune-back.abdelkrim-sahraoui.com/messages', options);
            if (response.status === 200) {
                const jsonResponse = await response.json();
                this.setState({messages : jsonResponse})
               
                this.setState({ isAuthorised: true });
            } else {
                this.setState({ isAuthorised: false });
            }
        }
    }
    countMessages = async (event) => {
        if (!localStorage.getItem('token')) {
            this.setState({ isAuthorised: false })
        } else {
            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            };
            const response = await fetch('https://neptune-back.abdelkrim-sahraoui.com/countMessage', options);
            if (response.status === 200) {
                const jsonResponse = await response.json();
               
                this.setState({ countMessage: jsonResponse })
                this.setState({ isAuthorised: true });
            } else {
                this.setState({ isAuthorised: false });
            }
        }
    }  
 

    getUsers = async (event) => {
        if (!localStorage.getItem('token')){
            this.setState({isAuthorised : false})
        }else{
            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            };
            const response = await fetch('https://neptune-back.abdelkrim-sahraoui.com/users', options);
            if (response.status === 200) {
                const jsonResponse = await response.json();
                jsonResponse.forEach(user => {
                    if(user.role === 1){
                        let clients = [...this.state.clients, user];
                        this.setState({clients});
                    }else {
                        let advertisers = [...this.state.advertisers, user];
                        this.setState({ advertisers }); 
                    }
                })
                this.setState({ isAuthorised: true});
            }else {
                this.setState({ isAuthorised: false });
            }
        }
    } 
    deleteUser =  (id) => {
        const options = {
            method : 'DELETE',
            body: new URLSearchParams({
                _id : id
            }),
            headers : {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('https://neptune-back.abdelkrim-sahraoui.com/deleteUser', options);
        //supprimer le visu 
        // this.btn[index].classList.add('displayNone');
        // this.btnDeleteAdvertiser[index].classList.add('displayNone');
        this.btnDeleteClient[id].classList.add('displayNone');
    }
    checkHouse = (id) => {
        this.props.history.push({
            pathname: `/house_details/${id}`
        })
    }
    validateHouse = (e,id, isAccepted, index) => {
        e.preventDefault();
        const options = {
            method: 'PUT',
            body: new URLSearchParams({
                _id: id,
                isAccepted: isAccepted
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('https://neptune-back.abdelkrim-sahraoui.com/validateHouse', options)
        // .then(response => {
        //     if(response.status === 200){
        //         // this.setState({toogleValidateHouse : true})
        //         response.json()
        //         .then(response => {
                    
        //             console.log(response)
        //             // if(response === true){
        //             //     // this.btnDeleteClient[index].classList.remove('notOnLine');
        //             //     // this.btnDeleteClient[index].classList.add('onLine');
        //             //     this.btnDeleteClient[id].classList.toggle('onLine');
        //             // }
        //             // else {
        //             //     this.btnDeleteClient[id].classList.toggle('notOnLine');
        //             //     // this.btnDeleteClient[index].classList.add('notOnLine');
        //             //     // this.btnDeleteClient[index].classList.remove('onLine');
        //             // }
        //         })
        //     }
        // })
        // // this.btnDeleteClient[index].classList.remove('notOnLine');
        // this.btnDeleteClient[index].classList.add('onLine');
        
    }
    openMessage = (event,id, index) => {
        event.preventDefault()
        const options = {
            method: 'PUT',
            body: new URLSearchParams({
                _id: id,
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('https://neptune-back.abdelkrim-sahraoui.com/opened', options)
            // .then(response => {

            //     if (response.status === 200) {
            //         this.setState({countMessage : this.state.countMessage - 1})
            //     }
            // })
        this.btn[index].classList.toggle('open');
        this.opened[index].classList.remove('opened');
        this.opened[index].classList.add('message-blue');
        this.countMessages();
    }
    deleteMessage = (event, id, index) => {
        event.preventDefault()
        const options = {
            method: 'DELETE',
            body: new URLSearchParams({
                _id: id,
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        fetch('https://neptune-back.abdelkrim-sahraoui.com/deleteMessage', options)
        // .then(response => {

        //     if (response.status === 200) {
        //         this.setState({countMessage : this.state.countMessage - 1})
        //     }
        // })
        this.displayArticle[index].classList.remove('messageFlex');
        this.displayArticle[index].classList.add('displayArticle');

    }

    render() {
        let {isAuthorised} = this.state;
        let clients = [...this.state.clients]
            .map((client, index) => {
                return (
                        <GetClients
                            key={client._id}
                            btn={this.btn}
                            btnDeleteClient={this.btnDeleteClient}
                            index={index}
                            deleteUser={this.deleteUser}
                            client={client} />
                        /* <td><button ref={(ref) => this.btn[index] = ref } onClick={()=>this.deletUserFront(index)}>Run</button></td> */
                )
            })
        let advertisers = [...this.state.advertisers]
            .map((advertiser, index) => {
                return (
                    <GetAdvertisers
                        getUsers={this.getUsers}
                        validateHouse={this.validateHouse}
                        checkHouse={this.checkHouse}
                        btnDeleteClient={this.btnDeleteClient}
                        index={index}
                        deleteUser={this.deleteUser}
                        key={advertiser._id}
                        advertiser={advertiser} />
                )
            })
        let messages = [...this.state.messages]
            .map((message, index) => {
                return (
                    <Messages
                        opened={this.opened}
                        btn={this.btn}
                        key={message._id}
                        index={index}
                        details={message}
                        openMessage={this.openMessage}
                        deleteMessage={this.deleteMessage}
                        displayArticle={this.displayArticle}
                    />
                )
            })

    
        if(isAuthorised === false){
            return (
                <Fragment>
                    <Header />
                    <main>
                        <img alt='accés refuser' src={require('../../images/403.jpg')} />
                    </main>
                    <Footer />
                </Fragment>
            )
        }else {
            return (
                <Fragment>
                    <Header />
                    <main>
                        <section className="getUsers">
                            <article className="clients">
                                <h2>Liste des clients</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Prénom</td>
                                            <td>Nom</td>
                                            <td>email</td>
                                            <td>inscrit le</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients}
                                    </tbody>
                                </table>
                            </article>
                            <article className="advertisers">
                                <h2>Liste des annonceurs</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Prénom</td>
                                            <td>Nom</td>
                                            <td>email</td>
                                            <td>inscrit le</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {advertisers}
                                    </tbody>
                                </table>
                            </article>
                        </section>
                        <section className='getMessages'>
                            <h2>Boite de réception</h2>
                            <p className='messageLength'>Vous avez {this.state.countMessage} nouveaux messages</p>
                            {messages}
                        </section>
                    </main>
                    <Footer />
                </Fragment>
            )   
        }
    }
}
