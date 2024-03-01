import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addFriendHandler = () => {};


  const addMemberSubmitHandler = () =>{}

  const closeHandler = () =>{}

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
        <Stack spacing={"1rem"}>
          {sampleUsers.length > 0 ? (
            sampleUsers.map((i) => (
              <UserItem key={i.id} user={i} handler={addFriendHandler} />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

            <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}

            >
                <Button color="error" onClick={closeHandler}>Cancel</Button>
                <Button onClick={addMemberSubmitHandler} variant="contained" disabled={isLoadingAddMember}>Submit Changes</Button>
            </Stack>
           
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
