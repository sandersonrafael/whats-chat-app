import avatarHref from './assets/imgs/user-avatar.png';
import './App.css';

function App() {

  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img className="header--avatar" src={avatarHref} alt="Imagem do usuário" />
          <div className="header--buttons"></div>
        </header>

        <div className="search">
          search
        </div>

        <div className="chatlist">
          chats
        </div>
      </div>

      <div className="contentarea">
        opened chat
      </div>
    </div>
  );
}

export default App;
