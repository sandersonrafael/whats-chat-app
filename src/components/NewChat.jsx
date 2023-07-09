import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdArrowBack } from 'react-icons/md';

import Api from '../Api';
import './NewChat.css';

export default function NewChat({chatList, user, show, setShow, setChat}) {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        const results = await Api.getContactList(user.id);
        setContactList(results);
      }
    };
    getList();
  }, [user]);

  const handleShowClose = () => {
    setShow(false);
  };

  const addNewChat = async (user2) => {
    for (let chat of chatList) {
      if (chat.with === user2.id) {
        setChat(chat);
        return handleShowClose();
      }
    }
    await Api.addNewChat(user, user2);
    return handleShowClose();
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
          <div onClick={() => addNewChat(contact)} className="newchat--item" key={index}>
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
      chatId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  setChat: PropTypes.func.isRequired,
};
