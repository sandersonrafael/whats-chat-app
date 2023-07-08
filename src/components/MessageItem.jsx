import PropTypes from 'prop-types';

import './MessageItem.css';

export default function MessageItem({data, user}) {
  return (
    <div className="messageline" style={{
      justifyContent: `flex-${user.id === data.author ? 'end' : 'start'}`,
    }}>
      <div className="messageitem" style={{
        backgroundColor: user.id === data.author ? '#dcf8c6' : '#fff',
      }}>
        <div className="messagetext">{data.body}</div>
        <div className="messagedate">{data.date}</div>
      </div>

    </div>
  );
}

MessageItem.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string.isRequired,
    date: PropTypes.any.isRequired,
    author: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
