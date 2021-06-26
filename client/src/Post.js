import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './Header';

const Reply = () => {
  return (
    <div className="reply">
      <h5>replier</h5>
      <p>Body of a reply</p>
    </div>
  );
};

const Replies = () => {
  return (
    <div className="replies">
      <Reply />
    </div>
  );
};

const CommentBox = ({ id }) => {
  return (
    <div className="commentBox">
      <textarea rows="1" cols="1" name="text"></textarea>
    </div>
  );
};

const Comment = () => {
  return (
    <div className="comment">
      <h5>commentor</h5>
      <p>Body of a comment</p>
      <button>Reply</button>
      <CommentBox />
      <Replies />
    </div>
  );
};

const Comments = ({ id, comments }) => {
  return (
    <div className="comments">
      <Comment />
    </div>
  );
};

const Content = ({ id, likes, author, body, title, date }) => {
  return (
    <div className="content">
      <p>{`${likes} Likes`}</p>
      <h3>{title}</h3>
      <h5>{author}</h5>
      <p>{body}</p>
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

        <Content
          id={_id}
          likes={likes}
          author={author}
          body={body}
          title={title}
          date={date}
        />
        <CommentBox id={_id} />
        <Comments id={_id} comments={comments} />
      </>
    );
  }
};
