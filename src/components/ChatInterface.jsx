import { useState } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-md mt-4 p-4 border border-gray-300 rounded-lg flex flex-col">
      <div className="flex-grow overflow-y-auto max-h-64 border-b border-gray-300 p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 self-start"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Ask something about the video..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-r" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
