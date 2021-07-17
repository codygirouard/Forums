import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Header from './header';

export const NewPost = () => {
  const titleErrors = {
    required: 'A title is required to make a post',
    minLength: 'Title must be at least 5 characters long',
    maxLength: 'Title must be 40 characters long maximum',
    err: 'Error trying to post, please try again later',
  };
  const bodyErrors = {
    required: 'Post body is required to make a post',
    minLength: 'Post body must be at least 3 characters long',
    maxLength: 'Post body must be 501 characters long maximum',
    err: 'Error trying to post, please try again later',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [titleError, setTitleError] = useState(null);
  const [bodyError, setBodyError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'New Post - Denton Forums';
    if (!localStorage.getItem('name')) {
      navigate('/');
    }
  });

  const onSubmit = async (data) => {
    setTitleError(null);
    setBodyError(null);
    const user = localStorage.getItem('name');

    const postInfo = {
      author: user,
      title: data.title,
      body: data.body,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postInfo),
    };
    const res = await fetch('/be/newPost', options).then((response) =>
      response.json()
    );

    if (res.succ) {
      navigate('/');
    } else {
      setTitleError('err');
      setBodyError('err');
    }
  };

  const handleInput = ({ target }) => {
    target.style.height = '';
    target.style.height = target.scrollHeight + 6 + 'px';
  };

  const onErrors = (errors) => {
    setTitleError(errors.title ? errors.title.type : null);
    setBodyError(errors.body ? errors.body.type : null);
  };

  return (
    <div className="centerScreen">
      <Header />
      <div className="loginContainer">
        <h2 className="formTitle">Make a Post</h2>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className="formGroup">
            <input
              id="title"
              className="formField"
              type="text"
              placeholder="Title"
              aria-invalid={errors.title ? 'true' : 'false'}
              {...register('title', {
                required: true,
                minLength: 5,
                maxLength: 40,
              })}
            />
            <label className="formLabel" htmlFor="title">
              Title
            </label>
          </div>

          {titleError && (
            <span role="alert" className="fieldError">
              {titleErrors[titleError]}
            </span>
          )}

          <div className="formGroup textField">
            <textarea
              id="body"
              className="formField textField"
              type="text"
              placeholder="Body"
              maxLength="500"
              aria-invalid={errors.body ? 'true' : 'false'}
              onInput={handleInput}
              {...register('body', {
                required: true,
                minLength: 3,
                maxLength: 500,
              })}
            />
            <label className="formLabel textField" htmlFor="body">
              Body
            </label>
          </div>

          {bodyError && (
            <span role="alert" className="fieldError">
              {bodyErrors[bodyError]}
            </span>
          )}

          <div className="newPost">
            <button type="submit" className="btn">
              <svg
                width="180px"
                height="60px"
                viewBox="0 0 180 60"
                className="border"
              >
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="bg-line"
                />
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="hl-line"
                />
              </svg>
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
