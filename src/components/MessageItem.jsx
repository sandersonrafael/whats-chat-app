import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './MessageItem.css';

export default function MessageItem({data, user}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.date > 0) {
      const dateTime = new Date(data.date.seconds * 1000);
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      setTime(`
        ${hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}
      `);
    }
  }, [data]);

  return (
    <div className="messageline" style={{
      justifyContent: `flex-${user.id === data.author ? 'end' : 'start'}`,
    }}>
      <div className="messageitem" style={{
        backgroundColor: user.id === data.author ? '#dcf8c6' : '#fff',
      }}>
        <div className="messagetext">{data.body}</div>
        <div className="messagedate">{time}</div>
      </div>

    </div>
  );
}

MessageItem.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
