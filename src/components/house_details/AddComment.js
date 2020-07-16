import React, {Component} from 'react';

import 'antd/dist/antd.css';
import { Rate, Button, Alert } from 'antd';
import formatDate from '../../utils/formatDate';

export default class AddComment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            comment: '',
            value : 0,
            house_id : this.props.house_id,
            noUser : '',
            alert : null
        }
    }
    handleChange = (event) =>{
        let {name , value} = event.target;
        this.setState({[name]:value, alert : null})
    }
    handleRate = value => {
        this.setState({ value });
    };
    AddComment = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            body: new URLSearchParams({
                comment: this.state.comment,
                house_id: this.state.house_id,
                rating : this.state.value
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        };
        const response = await fetch(`https://neptune-back.abdelkrim-sahraoui.com/comment`, options);
        if (response.status === 201) {


            // const jsonData = await response.json();
            // console.log(jsonData)
            let selectArticle = document.querySelector('.comments');
            let div = document.createElement('div');
            div.classList.add('comment-details')
            selectArticle.prepend(div);
            let firstSpan = document.createElement('span');
            firstSpan.classList.add('comment-span');
            firstSpan.innerHTML = `le : ${formatDate(Date.now())}`;
            div.appendChild(firstSpan);
            let secondSpan = document.createElement('span');
            secondSpan.classList.add('comment-span');
            secondSpan.innerHTML = `de : moi`;
            div.appendChild(secondSpan);
            let comment= document.createElement('p');
            comment.innerHTML = this.state.comment;
            div.appendChild(comment);
            // console.log(div)
            this.setState({alert : true, comment:'', value:0});
            
            // firstSpan.innerHTML = this.state.comment;
            // firstSpan.classList.add('comment-span');
            // console.log(firstSpan)
            // selectDiv.appendChild(firstSpan);

        }
        if(response.status === 403){
            localStorage.removeItem('token');
            this.setState({ alert: false });
        }
        // console.log(jsonData);
    }
    render() {
        let alert = null;
        if (this.state.alert) {
            alert = <Alert
                style={{width : '100%'}}
                message="Commentaire envoyé"
                description="Merci pour votre commentaire"
                type="success"
                showIcon
            />
        } else if (this.state.alert === false){
            alert = <Alert
                message="Warning"
                description="Veuiller vus connecter pour envoyer votre message"
                type="warning"
                showIcon
                closable
            />
        }
        if (localStorage.getItem('token') == null){
            return (
                <p className='addCommentMessage'>Veuillez vous connecter pour laisser un commentaire</p>
            )
        }else{
            return (
                <form 
                    onSubmit={this.AddComment}
                    className='addComment'
                >
                    <label>laisser un commentaire</label>
                    <textarea
                        onChange={this.handleChange}
                        name='comment'
                        value= {this.state.comment}
                        required
                    >
                    </textarea>
                    {alert}
                    <Rate allowHalf  onChange={this.handleRate} value={this.state.value}   />
                    <Button className='button' htmlType='submit' type="primary" size={'middle'}>valider</Button>
                </form>
            )
        }
    }
}

