import { useEffect } from 'react';

const Alert = () => {
  const closeButton = () => {
    document.getElementById('alertModal').style.display = 'none';
  };

  const clickOutside = (e) => {
    const modal = document.getElementById('alertModal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };

  useEffect(() => {});
  return (
    <div id="alertModal" onClick={clickOutside}>
      <div className="alertContent">
        <span className="close" onClick={closeButton}>
          &times;
        </span>
        <p id="alertText">You need to login to like posts!</p>
      </div>
    </div>
  );
};

export default Alert;
