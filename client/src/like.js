import { useEffect, useState } from 'react';

export const LikeButton = ({ totalLikes, usersLiked, postId }) => {
  const [likes, setLikes] = useState(totalLikes); // total like count of post
  const [isLiked, setIsLiked] = useState(false); // is post liked by user
  const [users, setUsers] = useState([]); // all users that liked post
  const user = localStorage.getItem('name');

  const handleClick = () => {
    const userLikeInfo = {
      postId,
      username: user,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userLikeInfo),
    };

    if (user) {
      if (isLiked) {
        setLikes(likes - 1);
        setUsers(users.filter((name) => name !== user));

        fetch('http://localhost:3001/be/unlikePost', options).then((response) =>
          response.json()
        );
      } else {
        setLikes(likes + 1);
        setUsers((oldUsers) => [...oldUsers, user]);

        fetch('http://localhost:3001/be/likePost', options).then((response) =>
          response.json()
        );
      }

      setIsLiked(!isLiked);
    } else {
      // not logged in, alert user of error
      const alertModal = document.getElementById('alertModal');
      const alertText = document.getElementById('alertText');

      alertText.innerHTML = 'You need to login to like posts!';
      alertModal.style.display = 'block';
    }
  };

  useEffect(() => {
    if (usersLiked) {
      setUsers(usersLiked);
      setIsLiked(usersLiked.indexOf(user) >= 0);
    }
  }, [usersLiked, user]);

  return (
    <>
      <div className="postLikes" onClick={handleClick}>
        <svg width="50" height="45" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>Like</title>
            <path
              className={isLiked ? 'fullHeart' : 'emptyHeart'}
              d="m24.95551,11.32701c9.87674,-25.35266 48.57414,0 0,32.59628c-48.57414,-32.59628 -9.87674,-57.94894 0,-32.59628z"
            />
          </g>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dy=".3em"
            fill={isLiked ? '#fff' : '#000'}
          >
            {likes}
          </text>
        </svg>
      </div>
    </>
  );
};
