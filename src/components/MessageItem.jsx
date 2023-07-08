import PropTypes from 'prop-types';

import './MessageItem.css';

export default function MessageItem({data}) {
  return (
    <div className="messageline" style={{
      justifyContent: 'flex-start',
    }}>
      <div className="messageitem">
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
  }).isRequired,
};
