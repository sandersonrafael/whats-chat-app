import { useEffect, useState } from 'react';
import { MdDonutLarge, MdChat, MdSearch } from 'react-icons/md';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';
import Api from './Api';

import './App.css';
import { getLoginCookieUser, setLoginCookie } from './cookies';

function App() {
  const tryCookie = getLoginCookieUser('loggedUserInfos');

  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});

  const [user, setUser] = useState(tryCookie);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user !== null) {
      const unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user]);

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

    setLoginCookie('loggedUserInfos', newUser, 1);
  };

  const handleLogout = () => {
    setLoginCookie('loggedUserInfos', null, 0);
    setUser(null);
    window.location.href = '/';
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
          setChat={setActiveChat}
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
              <span onClick={handleLogout}>Sair</span>
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <MdSearch />
            <input type="search" placeholder="Procure uma conversa" />
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
        {activeChat.chatId ? (
          <ChatWindow
            user={user}
            data={activeChat}
            setActiveChat={setActiveChat}
          />
        ) : (
          <ChatIntro />
        )}
      </div>
    </div>
  );
}

export default App;
