import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { dateToString } from './postDate';

const Post = ({ id, author, title, commentCount, likes, date }) => {
  const dateString = dateToString(date);

  return (
    <div className="post">
      <Link to={`post/${id}`}>
        <div className="postContents">
          <h3 className="postTitle">{`${author}: ${title}`}</h3>
          <p className="postComments">
            {`${commentCount} comments`}
            <span> &#x25CF; {dateString}</span>
          </p>
        </div>
      </Link>
      <p className="postLikes">
        <i className="far fa-thumbs-up">{` ${likes}`}</i>
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
    return <div className="loader"></div>;
  } else {
    return data.map(({ _id, author, title, commentCount, likes, date }) => (
      <Post
        key={_id}
        id={_id}
        author={author}
        title={title}
        commentCount={commentCount}
        likes={likes}
        date={date}
      />
    ));
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
      <Header posts={true} />
      <Page />
    </>
  );
};
