import { useState } from 'react';
import { styles } from './MessageBubble.styles';

function MessageBubble({ message }) {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            style={styles.messageBubble}
            className="flex items-center justify-between bg-gray-800 text-white rounded-lg shadow-lg"
        >
            <div className="flex-1 p-4">
                {message}
            </div>
            <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-700 rounded-r-lg transition-colors"
            >
                ×
            </button>
        </div>
    );
}

export default MessageBubble;