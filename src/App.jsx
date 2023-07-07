import { useState } from 'react';
import { MdDonutLarge, MdChat, MdMoreVert, MdSearch } from 'react-icons/md';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';

import avatarHref from './assets/imgs/user-avatar.png';
import './App.css';

function App() {
  const [chatList, setChatList] = useState([
    { chatId: 1, title: 'Jurandir Ferreira', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
    { chatId: 2, title: 'Marcielle Lacena', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
    { chatId: 3, title: 'Pedro Amorim', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
    { chatId: 4, title: 'André Ricardo Carvalho', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
  ]);
  const [activeChat, setActiveChat] = useState({});

  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img
            className="header--avatar"
            src={avatarHref}
            alt="Imagem do usuário"
          />
          <div className="header--buttons">
            <div className="header--btn">
              <MdDonutLarge />
            </div>
            <div className="header--btn">
              <MdChat />
            </div>
            <div className="header--btn">
              <MdMoreVert />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <MdSearch />
            <input
              type="search"
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </div>

        <div className="chatlist">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === item.chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>

      <div className="contentarea">
        {activeChat.chatId ? <ChatWindow /> : <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
