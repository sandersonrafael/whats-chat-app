import logoImg from '../assets/imgs/intro-logo.png';

import './ChatIntro.css';

export default function ChatIntro() {
  return (
    <div className="chatintro">
      <img src={logoImg} alt="Whatschat App" />
      <h1>Whatschat Web</h1>
      <h2>Envie e receba mensagens sem necessitar manter seu celular online.<br />Use Whatschat em até 4 dispositivos conectados e até um telefone ao mesmo tempo.</h2>
    </div>
  );
}
