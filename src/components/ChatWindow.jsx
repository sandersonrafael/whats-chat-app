import { useState } from 'react';
import {
  MdSearch,
  MdAttachFile,
  MdMoreVert,
  MdInsertEmoticon,
  MdClose,
  MdSend,
  MdMic,
} from 'react-icons/md';

import EmojiPickerMemo from '../components/EmojiPickerMemo';
import './ChatWindow.css';

export default function ChatWindow() {
  const [emojiView, setEmojiView] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="chatwindow">
      <div className="chatwindow--header">
        <div className="chatwindow--headerinfo">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
            className="chatwindow--avatar"
          />
          <div className="chatwindow--name">Fulano de Tal</div>
        </div>

        <div className="chatwindow--headerbuttons">
          <div className="chatwindow--btn">
            <MdSearch style={{ color: '#919191', fontSize: 24 }} />
          </div>

          <div className="chatwindow--btn">
            <MdAttachFile style={{ color: '#919191', fontSize: 24 }} />
          </div>

          <div className="chatwindow--btn">
            <MdMoreVert style={{ color: '#919191', fontSize: 24 }} />
          </div>
        </div>
      </div>

      <div className="chatwindow--body"></div>

      <div className="chatwindow--emojiarea">
        <EmojiPickerMemo emojiView={emojiView} setText={setText} />
      </div>

      <div className="chatwindow--footer">
        <div className="chatwindow--pre">
          {emojiView && <div className="chatwindow--btn">
            <MdClose
              style={{ color: '#919191', fontSize: 26 }}
              onClick={() => setEmojiView(false)}
            />
          </div>}

          <div className="chatwindow--btn">
            <MdInsertEmoticon
              style={{ color: emojiView ? '#009688' : '#919191', fontSize: 26 }}
              onClick={() => setEmojiView(true)}
            />
          </div>

        </div>

        <div className="chatwindow--inputarea">
          <input 
            type="text"
            className="chatwindow--input"
            placeholder="Digite sua mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="chatwindow--pos">
          <div className="chatwindow--btn">
            {text ? 
              <MdSend style={{ color: '#919191', fontSize: 26 }} /> :
              <MdMic style={{ color: '#919191', fontSize: 26 }} /> 
            }
          </div>


        </div>
      </div>
    </div>
  );
}
