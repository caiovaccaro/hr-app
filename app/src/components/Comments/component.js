import React from "react";
import './style.css';

export default function CommentsComponent(props) {
  return (
    <div className={'CommentsComponent'}>
      <textarea
        placeholder="Digite um comentário e pressione 'Enter'..."
        className={'CommentsComponentTextArea'}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            props.createComment(e.target.value);
            e.target.value = '';
          }
        }}
      ></textarea>
      {props.comments &&
        <ul>
          {props.comments.map((comment, i) => {
            return (
              <li
                className={'CommentsComponentListItem'}
                key={i}
              >
                {comment.value}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}
