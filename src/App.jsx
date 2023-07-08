import { useState } from 'react';
import { MdDonutLarge, MdChat, MdMoreVert, MdSearch } from 'react-icons/md';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';
import Api from './Api';

import './App.css';

function App() {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const handleLoginData = async (u) => {
    const newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };

    // leva o usuário para a base de dados;
    await Api.addUser(newUser);

    setUser(newUser);
  };

  if (!user) return <Login onReceive={handleLoginData} />;

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img
            className="header--avatar"
            src={user.avatar}
            alt="Imagem do usuário"
          />
          <div className="header--buttons">
            <div className="header--btn">
              <MdDonutLarge />
            </div>
            <div className="header--btn">
              <MdChat onClick={handleNewChat} />
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
              placeholder="Procure uma conversa"
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
        {activeChat.chatId ? <ChatWindow user={user} /> : <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
