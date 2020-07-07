import React, {Component} from 'react';

import 'antd/dist/antd.css';
import { Rate, Button } from 'antd';

export default class AddComment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            comment: '',
            value : 0,
            house_id : this.props.house_id,
            noUser : ''
        }
    }
    handleChange = (event) =>{
        let {name , value} = event.target;
        this.setState({[name]:value})
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
        const response = await fetch(`http://localhost:4000/comment`, options);
        const jsonData = await response.json();
        if(response.status === 403){
            localStorage.removeItem('token');
        }
        console.log(jsonData);
    }
    render() {
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
                        required
                    >
                    </textarea>
                    <Rate allowHalf  onChange={this.handleRate} value={this.state.value}   />
                    <Button className='button' htmlType='submit' type="primary" size={'middle'}>valider</Button>
                </form>
            )
        }
    }
}

