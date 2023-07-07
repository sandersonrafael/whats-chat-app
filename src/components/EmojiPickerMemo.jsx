import { useMemo } from 'react';
import PropTypes from 'prop-types';
import EmojiPicker from 'emoji-picker-react';

import './EmojiPickerMemo.css';

export default function EmojiPickerMemo({ emojiView, setText }) {
  const handleEmojiClick = (e) => {
    setText((value) => value + e.emoji);
  };

  const emojiPicker = useMemo(() => (
    <EmojiPicker
      onEmojiClick={handleEmojiClick}
      searchDisabled
      skinTonesDisabled
      previewConfig={{showPreview: false}}
      height={emojiView ? 250 : 0}
    />
  ), [emojiView]);

  return (
    <>
      {emojiPicker}
    </>
  );
}

EmojiPickerMemo.propTypes = {
  emojiView: PropTypes.bool.isRequired,
  setText: PropTypes.func.isRequired,
};
