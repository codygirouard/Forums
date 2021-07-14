import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from './header';
import { dateToString } from './postDate';
import { LikeButton } from './like';
import Alert from './alert';

const NewPostButton = () => {
  const nav = useNavigate();
  const handleClick = () => {
    if (localStorage.getItem('name')) {
      nav('/newPost');
    } else {
      const alertModal = document.getElementById('alertModal');
      const alertText = document.getElementById('alertText');
      alertText.innerHTML = 'You need to login to make new posts!';
      alertModal.style.display = 'block';
    }
  };
  return (
    <button className="newPostButton" onClick={handleClick}>
      +
    </button>
  );
};

const Post = ({ id, author, title, commentCount, likes, usersLiked, date }) => {
  const dateString = dateToString(date);

  return (
    <div className="post">
      <LikeButton totalLikes={likes} usersLiked={usersLiked} postId={id} />
      <Link to={`post/${id}`} className="commentLink">
        <div className="postContents">
          <h3 className="postTitle">{title}</h3>
          <h4 className="postAuthor">{`Posted by ${author} ${dateString}`}</h4>
          <p className="postComments">{`${commentCount} comments`}</p>
        </div>
      </Link>
    </div>
  );
};

const Posts = ({ pageNum }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/be/getPosts/${pageNum}`)
      .then((response) => response.json())
      .then((posts) => {
        if (!posts.err) {
          setData((d) => {
            if (d) {
              return [...d, ...posts];
            } else {
              return posts;
            }
          });
        }
      });
  }, [pageNum]);

  if (!data) {
    return <div className="loader"></div>;
  } else {
    return data.map(
      ({ _id, author, title, commentCount, likes, usersLiked, date }) => (
        <Post
          key={_id}
          id={_id}
          author={author}
          title={title}
          commentCount={commentCount}
          likes={likes}
          usersLiked={usersLiked}
          date={date}
        />
      )
    );
  }
};

const Page = () => {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  let timeout = null;

  const nextPage = () => {
    setCurrPage(currPage + 1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2 &&
      !loading
    ) {
      setLoading(true);
      nextPage();
      timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div className="posts">
      <Posts pageNum={currPage} />
    </div>
  );
};

export const Feed = () => {
  return (
    <>
      <Header scroll={true} />
      <Page />
      <NewPostButton />
      <Alert />
    </>
  );
};
