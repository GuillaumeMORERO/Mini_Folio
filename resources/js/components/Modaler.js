import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { resetOpenModal } from '../redux/actions/userActions';

import { useHistory } from 'react-router-dom';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";


export default function Modaler() {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.userReducer);

  const [openModal, setOpenModal] = React.useState(false);
  const [modalTxt, setModalTxt] = React.useState({title: '', message: ''});

  React.useEffect(()=>{
      // ici on check à chaque changement d'état si on doit ouvrir la modal, et set les messages au cas ou
      user.openModal.open ? 
      setModalTxt({title: user.openModal.title, message: user.openModal.message })  : setModalTxt({title: '', message: ''});

      user.openModal.open ? setOpenModal(true) : setOpenModal(false);
  }, [user.openModal]);

  const handleClose = () => { 
      setOpenModal(false); 
      dispatch(resetOpenModal())
      let route = (user.openModal.type == 'loginError') ? "/login" 
      : (user.openModal.type == 'registerError') ? "/register" 
      : (user.openModal.type == 'filmError') ? "/films"
      : (user.openModal.type == 'bookError') ? "/livres"
      : (user.openModal.type == 'jvError') ? "/jv"
      : (user.openModal.type == 'newsError') ? "/"
      : "/";
      history.push(route);
  };

  return (
    <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
    >
        <div className='modalStyle'>
            <Typography id="modalTitle" sx={{m:1}} component="h2">
                {modalTxt.title}
            </Typography>
            <Typography id="modalDescription" sx={{ mt: 2, textAlign: 'center' }}>
                {modalTxt.message}
            </Typography>
        </div>
    </Modal>
  );
}