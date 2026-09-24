function Modal({ title, children, close }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={close}>
          ×
        </button>

        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default Modal;