import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';

const Post = ({ id, author, title, commentCount, likes }) => {
  const handleClick = (e) => {
    if (e.target.id !== 'likes') {
      console.log(`${id} clicked`);
    }
  };

  return (
    <div className="post" onClick={handleClick}>
      <Link to={id}>
        <div className="postContents">
          <h3 className="postTitle">{`${author}: ${title}`}</h3>
          <p className="postComments">{`${commentCount} comments`}</p>
        </div>
      </Link>
      <p className="postLikes">
        <i className="far fa-thumbs-up" id="likes">
          {` ${likes}`}
        </i>
      </p>
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
    return <h1>Loading...</h1>;
  } else {
    return data.map(({ _id, author, title, commentCount, likes }) => (
      <Post
        key={_id}
        id={_id}
        author={author}
        title={title}
        commentCount={commentCount}
        likes={likes}
      />
    ));
  }
};

const Page = () => {
  const [currPage, setCurrPage] = useState(1);
  const [loading, toggleLoading] = useReducer((loading) => !loading, false);

  const nextPage = () => {
    setCurrPage(currPage + 1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2 &&
      !loading
    ) {
      toggleLoading();
      nextPage();
      setTimeout(toggleLoading, 500);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
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
      <Header />
      <Page />
    </>
  );
};
