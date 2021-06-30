import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { dateToString } from './postDate';

const Reply = ({ reply }) => {
  const { author, body, date } = reply;

  const time = dateToString(date);

  return (
    <div className="reply">
      <div className="authorTime">
        <h5>{author}</h5>
        <p className="time">{time}</p>
      </div>

      <p className="bodyText">{body}</p>
    </div>
  );
};

const Replies = ({ replies }) => {
  replies = replies.reverse();
  return (
    <div className="replies">
      {replies.map((reply) => {
        return <Reply key={reply._id} reply={reply} />;
      })}
    </div>
  );
};

const Comment = ({ postId, commentId, comment }) => {
  const { author, body, replies, date } = comment;
  const time = dateToString(date);

  const [hideCommentBox, toggleHideCommentBox] = useReducer(
    (hideCommentBox) => {
      return !hideCommentBox;
    },
    true
  );

  const handleClick = () => {
    toggleHideCommentBox();
  };

  return (
    <div className="comment">
      <div className="authorTime">
        <h5>{author}</h5>
        <p className="time">{time}</p>
      </div>
      <p className="bodyText">{body}</p>
      <button className="replyButton" onClick={handleClick}>
        Reply
      </button>
      <div
        className="comment"
        style={{ display: hideCommentBox ? 'none' : 'block' }}
      >
        <textarea
          className="commentBox"
          aria-label="Comment Box"
          rows="1"
          cols="1"
          name="text"
        >
          Type reply here...
        </textarea>
        <button className="submitButton">Submit Reply</button>
      </div>
      <Replies replies={replies} />
    </div>
  );
};

const Comments = ({ id, comments }) => {
  comments = comments.reverse();
  return (
    <div className="comments">
      {comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            postId={id}
            commentId={comment._id}
            comment={comment}
          />
        );
      })}
    </div>
  );
};

const Content = ({ likes, author, body, title, date }) => {
  const time = dateToString(date);
  return (
    <div className="content">
      <i className="far fa-thumbs-up likes">{` ${likes}`}</i>
      <div className="contentPost">
        <h3>{title}</h3>
        <div className="authorTime">
          <h5>{author}</h5>
          <p className="time">{time}</p>
        </div>
        <p className="bodyText">{body}</p>
      </div>
    </div>
  );
};

export const Post = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/be/getPost/${id}`)
      .then((response) => response.json())
      .then(setData);
  }, [id]);

  if (!data) {
    return (
      <>
        <Header />
        <h1>Loading...</h1>
      </>
    );
  } else {
    const { _id, likes, author, body, title, date, comments } = data;
    return (
      <>
        <Header />
        <div className="postContainer">
          <Content
            likes={likes}
            author={author}
            body={body}
            title={title}
            date={date}
          />
          <div className="comment">
            <textarea
              className="commentBox"
              aria-label="Comment Box"
              rows="1"
              cols="1"
              name="text"
            >
              Type comment here...
            </textarea>
            <button className="submitButton">Submit Reply</button>
          </div>
          <Comments id={_id} comments={comments} />
        </div>
      </>
    );
  }
};
