import PropTypes from 'prop-types';
import { MdArrowBack } from 'react-icons/md';

import './NewChat.css';
import { useState } from 'react';

export default function NewChat({chatList, user, show, setShow}) {
  const [contactList, setContactList] = useState([
    { id: 123, avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', name: 'Ciclano Macedo'},
    { id: 123, avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', name: 'Ciclano Macedo'},
    { id: 123, avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', name: 'Ciclano Macedo'},
    { id: 123, avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', name: 'Ciclano Macedo'},
  ]);

  const handleShowClose = () => {
    setShow(false);
  };

  return (
    <div className="newchat" style={{ left: show ? 0 : -415 }}>
      <div className="newchat--head">
        <div className="newchat--backbutton" onClick={handleShowClose}>
          <MdArrowBack style={{ color: '#fff', fontSize: 26 }}/>
        </div>
        <div className="newchat--headtitle">Nova conversa</div>
      </div>
      <div className="newchat--list">
        {contactList.map((contact, index) => (
          <div className="newchat--item" key={index}>
            <img className="newchat--itemavatar" src={contact.avatar} alt={contact.name} />
            <div className="newchat--itemname">{contact.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

NewChat.propTypes = {
  chatList: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
