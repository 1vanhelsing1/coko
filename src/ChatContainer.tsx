import { Container, Fab, TextField } from "@mui/material";
import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { PostItem } from "./Post";

export interface Post {
  message: string;
  user: string;
}

const postAPI = "http://localhost:8080/post";
const postWebSocket = "ws://localhost:8080/post";

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75vh;
  overflow-y: scroll;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 35%;
  margin-left: 35%;
  height: 100%;
`;

// ChatContainer is the wrapper that handles fetching of chat messages and passing props to ui components

export const ChatContainer = (props: { user: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const scrollToLastPost = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  };
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(postWebSocket);
  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setPosts(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData(postAPI);
  }, [setPosts]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const post = lastJsonMessage as unknown as Post;
      setPosts((prev) => prev.concat(post));
    }
  }, [lastJsonMessage, setPosts]);

  const handleClickSendMessage = useCallback(() => {
    sendJsonMessage({
      user: props.user,
      message: currentMessage,
    });
    setCurrentMessage("");
  }, [sendJsonMessage, props.user, currentMessage]);

  useEffect(() => {
    scrollToLastPost();
  }, [posts]);

  return (
    <ChatWrapper>
      <ChatWindow ref={ref}>
        {posts.map((post, index) => (
          <div key={index}>
            <PostItem user={props.user} post={post} />
          </div>
        ))}
      </ChatWindow>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "15px",
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          helperText="Type a message..."
          value={currentMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentMessage(event.target.value);
          }}
          multiline
          rows={3}
          style={{ marginRight: "10px" }}
        />
        <Fab
          onClick={handleClickSendMessage}
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          disabled={!currentMessage}
        >
          <SendIcon />
        </Fab>
      </div>
    </ChatWrapper>
  );
};
