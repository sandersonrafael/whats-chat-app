import './ChatListItem.css';

export default function ChatListItem({nameNameNameName}) {
  return (
    <div className="chatlistitem">
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt={nameNameNameName}
        className="chatlistitem--avatar"
      />
      <div className="chatlistitem--lines">
        <div className="chatlistitem--line">
          <div className="chatlist--name">Fulano de Tal</div>
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
