import '../css/modal.css'
import PropTypes from 'prop-types';


function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;


  return (
    <div className="modal">
      <div className="modal-content">
        <div id='boton'>
          <button id='buttonModal' onClick={onClose}>Cerrar</button>
        </div>
        {children}
      </div>
    </div>
  );
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};



export {
  Modal
}