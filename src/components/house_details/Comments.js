import React, { Component } from 'react';
import formatDate from '../../utils/formatDate'

export default class Comments extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            comments : [],
            user : {}
        }
    }
    
    componentDidMount(){
        this.getCommentsByHouse();
    }

    getCommentsByHouse= async () => {
        const options = {
            method: 'POST',
            body : new URLSearchParams({
                _id: this.props.house_id
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch('http://localhost:4000/comments', options);
        const jsonData = await response.json();

        this.setState({
            comments: jsonData
        });
    }

    render() {
        let comments = [...this.state.comments]
        .map(comment => {         
                return <div 
                    key={comment._id}
                    className='comment-details'
                >
                    <span className='comment-span'>le : {formatDate(comment.creationDate)}</span>
                    <span className='comment-span'>de : {comment.user_id.firstName}</span>
                    <p>{comment.comment}</p>
                </div> 
        })
        
        return (
            <article className='comments'>
                {comments}
            </article>
        )
    }
}
