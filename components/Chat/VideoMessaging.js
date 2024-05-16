import React, { useState, useRef, useEffect } from "react";
import {ask_assistant, generateText} from "./ChatGPT";
import "./messaging.scss";
import {videos} from "../../data/videos";

const Conversation = ({ messages, messagesEndRef }) => (
  <div className="messages-content">
    {messages.map(({ text, isUser, video }, i) => {
      if(isUser){
        return(
          <div key={i} className="message message-personal new">
            {text}
          </div>
        )
      }else if(video){
        return (
          <div key={i} className="message video new">
            <video className="video" controls autoPlay>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }
    })}
    <div ref={messagesEndRef} />
  </div>
);

const VideoMessaging = ({ prompt, maxTokens,community }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [conversation, setConversation] = useState([
    { text: "Hey! My name is "+{community}.community.author.author+" and I'm from "+{community}.community.city.city+", "+ {community}.community.country.country+". Ask me anything!", isUser: false, video: '' }
  ]);

  const messagesEndRef = useRef(null);
  const author={community}.community.author.author;
  const photo={community}.community.photo.photo;
  const city={community}.community.city.city;
  const country={community}.community.country.country;
  const assistant_id={community}.community.assistant_id.assistant_id;
  const video_object={community}.community.video_object.video_object;
  console.log("aaa",{community}.community)
  const scrollToBottom = () => {
    const messagesContent = document.querySelector(".messages-content");
    if (messagesContent) {
      messagesContent.scrollTo({
        top: messagesContent.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(scrollToBottom, [conversation]);

  const handleUserInputSubmit = async (bubble_content,video_path) => {
    setIsLoading(true);
    setConversation([
      ...conversation,
      { text: bubble_content, isUser: true },
      { video: video_path, isUser: false },
    ]);
    setIsLoading(false);
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
      <div className="bubble-container">
        {Object.entries(video_object).map(([bubble_content, video_path], index) => (
          <div 
            key={index} 
            onClick={() => { handleUserInputSubmit(bubble_content, video_path) }}
            className="bubble"
          >
            {bubble_content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoMessaging;
