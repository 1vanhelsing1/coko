import React, { useState } from "react";
import "./App.css";
import { ChatContainer } from "./ChatContainer";
import { TextField, Button, Stack, Container } from "@mui/material";

function App() {
  const [user, setUser] = useState<string>("");
  const [isUserSet, submitUser] = useState<boolean>(false);

  return (
    <div className="App">
      {isUserSet ? (
        <ChatContainer user={user} />
      ) : (
        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
          <Stack spacing={1}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              helperText="Enter your username"
              value={user}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser(event.target.value);
              }}
            />
            <Button
              disabled={!user}
              variant="outlined"
              onClick={() => submitUser(true)}
            >
              Ok!
            </Button>
          </Stack>
        </Container>
      )}
    </div>
  );
}

export default App;
