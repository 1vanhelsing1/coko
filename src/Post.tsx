import React from "react";

import { Post } from "./ChatContainer";
import { Chip, Stack } from "@mui/material";
import styled from "styled-components";

const PostWrapper = styled.div<{
  $rightAligned?: boolean;
}>`
  display: flex;
  margin-right: 15%;
  margin-left: 15%;
  margin-bottom: 10px;
  justify-content: ${(props) =>
    props.$rightAligned ? "flex-end" : "flex-start"};
`;

const UserText = styled.div<{ $rightAligned?: boolean }>`
  font-size: x-small;
  align-self: ${(props) => (props.$rightAligned ? "end" : "start")};
`;

export const PostItem = (props: { user: string; post: Post }) => {
  const isRightAligned =
    props.user.toLowerCase() === props.post.user.toLowerCase();

  const isTagged = props.post.message
    .toLowerCase()
    .includes(`@${props.user.toLowerCase()}`);

  return (
    <PostWrapper $rightAligned={isRightAligned}>
      <Stack>
        <Chip
          variant="outlined"
          label={props.post.message}
          color={isTagged ? "primary" : "default"}
        />
        <UserText $rightAligned={isRightAligned}>{props.post.user}</UserText>
      </Stack>
    </PostWrapper>
  );
};
