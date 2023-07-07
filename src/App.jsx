import { MdDonutLarge, MdChat, MdMoreVert, MdSearch } from 'react-icons/md';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';

import avatarHref from './assets/imgs/user-avatar.png';
import './App.css';
import { useState } from 'react';

function App() {
  const [chatList, setChatList] = useState([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
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
            <ChatListItem key={key}/>
          ))}
        </div>
      </div>

      <div className="contentarea">
        <ChatIntro />
      </div>
    </div>
  );
}

export default App;
