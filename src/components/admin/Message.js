import React from 'react';
import formDate from '../../utils/formatDate';
import './admin.css';

const Message = ({ details, openMessage, btn, opened, index, deleteMessage, displayArticle}) => {


    return (
        <article 
            ref={ref => displayArticle[index] = ref}
            className='messageFlex'>
            <div
                onClick={event => openMessage(event,details._id, index)}
                className='comment-details messages'
            >
                <p
                    className={details.isOpened ? 'opened' : 'closed'}
                    ref={ref => opened[index] = ref}
                >
                    email : {details.email} / date : {formDate(details.creationDate)} / Sujet : {details.subject}</p>
                <p
                    ref={ref => btn[index] = ref}
                    className='message-close'
                >
                        {details.message}
                </p>
            </div>
            <button onClick={event => deleteMessage(event, details._id, index)}>Supprimer</button>
        </article>
    )
}

export default Message;