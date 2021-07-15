const Alert = () => {
  // close alert modal on pressing 'X'
  const closeButton = () => {
    document.getElementById('alertModal').style.display = 'none';
  };

  // close alert modal on pressing black background
  const clickOutside = (e) => {
    const modal = document.getElementById('alertModal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };

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
