// importing external style
import { styles } from "./styles";
// import icon
import { BsFillChatFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
//import ModalWindow
import ModalWindow from "./ModalWindow";




function ChatWidget({ isOpen, isPermanent }) {
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(isOpen);
    const [perm, setPerm] = useState(isPermanent);
    const widgetRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (widgetRef.current && !widgetRef.current.contains(event.target) && !perm) {
                setVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [widgetRef, perm]);

    useEffect(() => {
        setVisible(isOpen);
        setPerm(isPermanent);
    }, [isOpen, isPermanent]);

    return (
        <div ref={widgetRef}>
            <ModalWindow visible={visible} />
            <div
                onClick={() => setVisible(!visible)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    ...styles.chatWidget,
                    ...{ border: hovered ? "1px solid black" : "" },
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <BsFillChatFill size={20} color="white" />
                    <span style={styles.chatWidgetText}>Chat Now!!</span>
                </div>
            </div>
        </div>
    );
}


export default ChatWidget;