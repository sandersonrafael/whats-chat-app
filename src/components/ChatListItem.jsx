import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './ChatListItem.css';

export default function ChatListItem({ onClick, active, data }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.lastMessageDate > 0) {
      const dateTime = new Date(data.lastMessageDate.seconds * 1000);
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      setTime(`
        ${hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}
      `);
    }
  }, [data]);

  return (
    <div className={`chatlistitem ${active? 'active' : ''}`} onClick={onClick}>
      <img
        src={data.image}
        alt={data.title}
        className="chatlistitem--avatar"
      />
      <div className="chatlistitem--lines">
        <div className="chatlistitem--line">
          <div className="chatlist--name">{data.title}</div>
          <div className="chatlistitem--date">{time}</div>
        </div>
        <div className="chatlistitem--line">
          <div className="chatlistitem--lastmsg">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ChatListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    lastMessageDate: PropTypes.shape({
      seconds: PropTypes.number,
    }),
  }).isRequired,
};
