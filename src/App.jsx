import { useState } from 'react';
import { MdDonutLarge, MdChat, MdMoreVert, MdSearch } from 'react-icons/md';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';

import './App.css';

function App() {
  const [chatList, setChatList] = useState([
    { chatId: 1, title: 'Jurandir Ferreira', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
    { chatId: 2, title: 'Marcielle Lacena', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
    { chatId: 3, title: 'Pedro Amorim', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
    { chatId: 4, title: 'André Ricardo Carvalho', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
  ]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState({
    id: 1234,
    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    name: 'Fulano de Tal',
  });
  const [showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    setShowNewChat(true);
  };

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
