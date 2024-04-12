import React, { useEffect } from 'react'
import Header from './Header'
import  Title  from '../shared/Title'
import { Drawer, Grid, Skeleton } from '@mui/material'
import ChatList from '../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { useErrors } from '../../hooks/hook'
import { setIsMobile } from '../../redux/reducers/misc'
import { getOrSaveFromStorage } from '../../lib/features'
import { NEW_MESSAGE_ALERT } from '../../constants/events'



const AppLayout = () =>(WrappedComponent) => {
  return (props)=> {

    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
        getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
      }, [newMessagesAlert]);
  

    const handleDeleteChat = (e,_id,groupChat)=>{
        e.preventDefault();
        console.log("Delete Chat",_id,groupChat);
    }

    const handleMobileClose = () => dispatch(setIsMobile(false));


    return (
        <>
        <Title/>
        <Header/> 

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            //   onlineUsers={onlineUsers}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
            <Grid
            item
            sm={4}
            md={3}
            sx={{
                display:{xs:"none",sm:"block"}
            }}
            height={"100%"}
            >
            {isLoading ? (
                <Skeleton/>
            ) :(
                <ChatList 
            chats={data?.chats} 
            chatId={chatId}
            handlleDeleteChat={handleDeleteChat}
            />
            )}
            </Grid>
            <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                <WrappedComponent {...props}/>
            </Grid>

        <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
                display:{xs:"none", md:"block"},
                padding:"2rem",
                bgcolor:"rgba(0,0,0,0.85)"
            }}
            >
            <Profile user={user}/>
        </Grid>

        </Grid>

        
    </>
    )
    
        }
}

export default AppLayout