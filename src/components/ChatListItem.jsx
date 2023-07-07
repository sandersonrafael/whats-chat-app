import PropTypes from 'prop-types';

import './ChatListItem.css';

export default function ChatListItem({ onClick, active, data }) {
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
          <div className="chatlistitem--date">08:00</div>
        </div>
        <div className="chatlistitem--line">
          <div className="chatlistitem--lastmsg">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio corrupti unde nobis illo vel amet obcaecati similique necessitatibus temporibus aspernatur explicabo voluptas, pariatur minima aperiam accusamus laudantium, sapiente natus eaque.</p>
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
  }).isRequired,
};
