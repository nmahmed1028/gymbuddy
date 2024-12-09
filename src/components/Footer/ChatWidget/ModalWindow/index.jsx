// importing external style
import { styles } from "./../styles";
import { useState, useEffect, useRef } from "react";
import { model } from "./../../../../firebase";

function ModalWindow(props) {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", fromUser: false },
    ]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const formatConversationHistory = (messages) => {
        return messages.map(msg => 
            `${msg.fromUser ? 'User' : 'Gemini'}: ${msg.text}`
        ).join('\n\n');
    };

    const autoScrollToBottom = (messagesContainer) => {
        const newMessage = messagesContainer.lastElementChild;
        if (!newMessage) return;

        // Get heights
        const containerHeight = messagesContainer.scrollHeight;
        const visibleHeight = messagesContainer.offsetHeight;
        const scrollOffset = messagesContainer.scrollTop + visibleHeight;
        
        // Only scroll if user is already near bottom (within ~100px)
        const isNearBottom = containerHeight - scrollOffset <= 100;

        if (isNearBottom) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    useEffect(() => {
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
            autoScrollToBottom(messagesContainer);
        }
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            // Add user message
            const updatedMessages = [...messages, { text: inputText, fromUser: true }];
            setMessages(updatedMessages);
            setInputText("");
            // Block input while waiting for response
            setLoading(true);

            // Make prompt to control the conversation
            const prompt = "You are Gemini, the friendly and encouraging AI assistant " + 
            "within the GymBuddy fitness app. Your role is to act like a supportive friend " + 
            "to users, focusing strictly on health and fitness topics. Help them with workout " + 
            "planning and logging, offer meal planning advice, assist with meal logging, and " + 
            "encourage them to engage with the app's social media features to build a supportive " + 
            "community. Always communicate in a warm and approachable manner, offering motivation and " + 
            "positivity to keep users engaged in their fitness journey. Do not use bold text, " + 
            "italics, special paragraph formatting, or bullet points in your responses. Your " + 
            "goal is to make working out fun and accessible for everyone, providing helpful " + 
            "advice and encouragement strictly within the realm of health and fitness. " +
            "The conversation so far is listed below: \n\n";

            // Create conversation history with proper formatting
            const conversationHistory = formatConversationHistory(messages);
            
            // Combine prompt with conversation history
            const fullPrompt = prompt + "\nPrevious conversation:\n" + 
                                conversationHistory + 
                                "\n\nUser: " + inputText;

            await model.generateContent(fullPrompt)
                .then((result) => {
                    setMessages([
                        ...updatedMessages,
                        { text: result.response.text(), fromUser: false },
                    ]);
                })
                .catch((error) => {
                    console.error("Error:", error);

                });

            setLoading(false);
        }
    };

    return (
        <div
            style={{
                ...styles.modalWindow,
                ...{ 
                    opacity: props.visible ? "1" : "0",
                    pointerEvents: props.visible ? "auto" : "none"
                },
            }}
            className="flex flex-col h-[500px]"
        >
            <div className="flex-1 overflow-y-auto p-4 messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.fromUser 
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-gray-200 text-black rounded-bl-none'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="border-t p-4 flex gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-2 text-white"
                    placeholder="Type a message..."
                    disabled={loading}
                />
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    disabled={loading}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ModalWindow;