import React, { useState, useRef, useEffect } from "react";
import {ask_assistant, generateText} from "./ChatGPT";
import "./direct_messaging.scss";


var i=0;
var Fake = [
  'Hi there, I\'m Jacob and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Bye',
  ':)'
]

const Conversation = ({ messages, messagesEndRef }) => (
  <div className="messages-content">
    {messages.map(({ text, isUser }, i) => (
      <div
        key={i}
        className={
          isUser ? "message message-personal new" : "message new"
        }
      >
        {text}
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
);

const DirectMessaging = ({ prompt, maxTokens,community }) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [conversation, setConversation] = useState([
    { text: "Hey! My name is "+{community}.community.author.author+" and I'm from "+{community}.community.city.city+", "+ {community}.community.country.country+". Ask me anything!", isUser: false }
  ]);
  const messagesEndRef = useRef(null);

  const author={community}.community.author.author;
  const photo={community}.community.photo.photo;
  const city={community}.community.city.city;
  const country={community}.community.country.country;
  const assistant_id={community}.community.assistant_id.assistant_id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation]);

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     // 👇 Get input value
  //     handleUserInputSubmit();
  //   }
  // };

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setConversation([...conversation, { text: userInput, isUser: true }]);
    scrollToBottom();
    let response='';
    try {
      console.log("ask_assistant")
      response=await ask_assistant(`${prompt}${userInput}?`);
      console.log("response:",response)
    } catch (error) {
      console.log('Fallback to default ChatGPT')
      response = await generateText(
        `${prompt}${userInput}?`,
        maxTokens
      );
    }

    // const response =Fake[i];
    // i=i+1;
    setConversation([
      ...conversation,
      { text: userInput, isUser: true },
      { text: response, isUser: false },
    ]);
    setGeneratedText(response);
    setUserInput("");
    setIsLoading(false);
    scrollToBottom();
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="chat">
      <div className="chat-title">
        <h1>{author}</h1>
        <h2>{city}, {country}</h2>
        <figure className="avatar">
          <img src={photo}/></figure>
      </div>
      <div className="messages">
        <Conversation messages={conversation} messagesEndRef={messagesEndRef}/>
        {isLoading && <p className="loading-container">...</p>}
      </div>
      <div className="message-box">
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            onChange={handleUserInputChange}
            // onKeyDown={handleKeyDown}
            value={userInput}
            required
          />
          <button
            onClick={handleUserInputSubmit}
            className="message-submit"
          >
            ⇧
          </button>
        </form>
      </div>
    </div>
  );
};

export default DirectMessaging;
