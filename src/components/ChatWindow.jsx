import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
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
import MessageItem from './MessageItem';
import './ChatWindow.css';

export default function ChatWindow({ user }) {
  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) recognition = new SpeechRecognition;

  const messageBody = useRef(null);
  const [emojiView, setEmojiView] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [msgList, setMsgList] = useState([
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
    {author: 11, body: 'bla bla bla bla', date: '19:00'},
    {author: 11, body: 'ble ble ble ble ble ble ble ble', date: '19:15'},
    {author: 1234, body: 'bli bli bli', date: '19:17'},
  ]);

  useEffect(() => {
    if (messageBody.current.scrollHeight > messageBody.current.offsetHeight) {
      messageBody.current.scrollTop = (
        messageBody.current.scrollHeight - messageBody.current.offsetHeight
      );
    }
  }, [msgList]);

  const handleSendClick = () => {

  };

  const handleMicClick = () => {
    if (recognition) {
      recognition.lang = 'pt-BR';

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };

      recognition.start();
    }
  };

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

      <div className="chatwindow--body" ref={messageBody}>
        {msgList.map((item, key) => (
          <MessageItem data={item} key={key} user={user} />
        ))}
      </div>

      <div className="chatwindow--emojiarea">
        <EmojiPickerMemo emojiView={emojiView} setText={setText} />
      </div>

      <div className="chatwindow--footer">
        <div className="chatwindow--pre">
          {emojiView && (
            <div className="chatwindow--btn">
              <MdClose
                style={{ color: '#919191', fontSize: 26 }}
                onClick={() => setEmojiView(false)}
              />
            </div>
          )}

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
            {text ? (
              <MdSend style={{ color: '#919191', fontSize: 26 }} onClick={handleSendClick} />
            ) : (
              <MdMic style={{ color: listening ? '#126ece' : '#919191', fontSize: 26 }} onClick={handleMicClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  user: PropTypes.shape({}).isRequired,
};
