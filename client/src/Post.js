import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './header';
import { dateToString } from './postDate';
import { LikeButton } from './like';
import Alert from './alert';

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
  return (
    <div className="replies">
      {replies
        .slice()
        .reverse()
        .map((reply) => {
          return <Reply key={reply._id} reply={reply} />;
        })}
    </div>
  );
};

const Comment = ({ postId, commentId, comment }) => {
  const { author, body, date } = comment;
  const [replies, setReplies] = useState(comment.replies);
  const time = dateToString(date);
  const [replyText, setText] = useState('Type reply here...');

  const [hideCommentBox, toggleHideCommentBox] = useReducer(
    (hideCommentBox) => {
      return !hideCommentBox;
    },
    true
  );

  const toggleReplyBox = () => {
    const user = localStorage.getItem('name');
    const alertModal = document.getElementById('alertModal');
    const alertText = document.getElementById('alertText');

    if (!user) {
      alertText.innerHTML = 'You need to login to reply!';
      alertModal.style.display = 'block';
    } else {
      toggleHideCommentBox();
    }
  };

  // reply box submit button clicked
  const handleClick = ({ target }) => {
    const user = localStorage.getItem('name');
    const alertModal = document.getElementById('alertModal');
    const alertText = document.getElementById('alertText');

    if (!user) {
      alertText.innerHTML = 'You need to login to submit replies!';
      alertModal.style.display = 'block';
    } else if (replyText === 'Type reply here...') {
      alertText.innerHTML = 'You need to enter text to post a reply!';
      alertModal.style.display = 'block';
    } else {
      const replyInfo = {
        postId,
        commentId,
        author: user,
        body: replyText,
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyInfo),
      };

      fetch('/be/newReply', options);
      setReplies((oldReplies) => [
        ...oldReplies,
        {
          _id: Math.floor(Math.random() * 100000),
          date: 'A few seconds ago...',
          author: user,
          body: replyText,
        },
      ]);
      setText('Type reply here...');
    }
    target.blur();
    toggleHideCommentBox();
  };

  const handleInput = ({ target }) => {
    target.style.height = '';
    target.style.height = target.scrollHeight + 5 + 'px';
    setText(target.value);
  };

  const handleFocus = ({ target }) => {
    if (target.value === 'Type reply here...') {
      target.value = '';
    }
  };

  const handleBlur = ({ target }) => {
    if (target.value === '') {
      target.value = 'Type reply here...';
    }
  };

  return (
    <div className="comment">
      <div className="authorTime">
        <h5>{author}</h5>
        <p className="time">{time}</p>
      </div>
      <p className="bodyText">{body}</p>
      <button className="replyToggleBtn" onClick={toggleReplyBox}>
        Reply
      </button>
      <div
        className="replyContainer"
        style={{ display: hideCommentBox ? 'none' : 'block' }}
      >
        <textarea
          className="commentBox"
          aria-label="Reply Box"
          rows="1"
          cols="1"
          name="Reply Box"
          value={replyText}
          maxLength={500}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
        ></textarea>
        <button className="commentBtn" onClick={handleClick}>
          <svg
            width="100px"
            height="30px"
            viewBox="0 0 100 30"
            className="border"
          >
            <polyline points="99,1 99,29 1,29 1,1 99,1" className="bg-line" />
            <polyline points="99,1 99,29 1,29 1,1 99,1" className="hl-line" />
          </svg>
          <span>Submit</span>
        </button>
      </div>
      <Replies replies={replies} />
    </div>
  );
};

const Comments = ({ id, comments }) => {
  return (
    <div className="comments">
      {comments
        .slice()
        .reverse()
        .map((comment) => {
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

const Content = ({ postId, likes, usersLiked, author, body, title, date }) => {
  const time = dateToString(date);
  return (
    <div className="content">
      <LikeButton totalLikes={likes} usersLiked={usersLiked} postId={postId} />
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
  const [commentText, setText] = useState('Type comment here...');
  const nav = useNavigate();

  useEffect(() => {
    fetch(`/be/getPost/${id}`)
      .then((response) => response.json())
      .then((response) => {
        // post id not found
        if (!response || response.err) {
          nav('/oops');
        } else {
          setData(response);
          document.title = `${response.title} - Denton Forums`;
        }
      });
  }, [nav, id]);

  const handleInput = ({ target }) => {
    target.style.height = '';
    target.style.height = target.scrollHeight + 5 + 'px';
    setText(target.value);
  };

  const handleFocus = ({ target }) => {
    if (target.value === 'Type comment here...') {
      target.value = '';
    }
  };

  const handleBlur = ({ target }) => {
    if (target.value === '') {
      target.value = 'Type comment here...';
    }
  };

  // comment submit button clicked
  const handleClick = ({ target }) => {
    const user = localStorage.getItem('name');
    const alertModal = document.getElementById('alertModal');
    const alertText = document.getElementById('alertText');

    if (!user) {
      alertText.innerHTML = 'You need to login to submit comments!';
      alertModal.style.display = 'block';
    } else if (commentText === 'Type comment here...') {
      alertText.innerHTML = 'You need to enter text to post a comment!';
      alertModal.style.display = 'block';
    } else {
      const commentInfo = {
        postId: id,
        author: user,
        body: commentText,
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentInfo),
      };

      fetch('/be/newComment', options)
        .then((response) => response.json())
        .then((response) => setData(response.result));
      setText('Type comment here...');
    }
    target.blur();
  };

  if (!data) {
    return (
      <>
        <Header />
        <div className="loader"></div>
      </>
    );
  } else {
    const { _id, likes, usersLiked, author, body, title, date, comments } =
      data;
    return (
      <>
        <Header scroll={true} />
        <div className="postContainer">
          <Content
            postId={_id}
            likes={likes}
            usersLiked={usersLiked}
            author={author}
            body={body}
            title={title}
            date={date}
          />
          <div className="commentContainer">
            <textarea
              className="commentBox"
              aria-label="Comment Box"
              rows="1"
              cols="1"
              name="Comment Box"
              value={commentText}
              maxLength="500"
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></textarea>
            <button className="commentBtn" onClick={handleClick}>
              <svg
                width="100px"
                height="40px"
                viewBox="0 0 100 40"
                className="border"
              >
                <polyline
                  points="99,1 99,39 1,39 1,1 99,1"
                  className="bg-line"
                />
                <polyline
                  points="99,1 99,39 1,39 1,1 99,1"
                  className="hl-line"
                />
              </svg>
              <span>Submit</span>
            </button>
          </div>
          {comments.length > 0 ? (
            <Comments id={_id} comments={comments} />
          ) : (
            <h1 className="noComments">Be the first to comment!</h1>
          )}
        </div>
        <Alert />
      </>
    );
  }
};
