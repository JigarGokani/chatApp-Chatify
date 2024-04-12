import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import { orange } from '../../constants/color'
import {Logout as LogoutIcon,Group as GroupIcon,Add as AddIcon, Menu as MenuIcon,Search as SearchIcon, Notifications as NotificationsIcon} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'
import { server } from '../../constants/config'
import axios from 'axios'
import { userNotExists } from '../../redux/reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setIsMobile, setIsNewGroup, setIsSearch } from '../../redux/reducers/misc'

const SearchDialog = lazy(()=>import("../specific/Search"))
const NotificationDialog = lazy(()=>import("../specific/Notifications"))
const NewGroupDialog = lazy(()=>import("../specific/NewGroup"))


const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isSearch, isNotification, isNewGroup } = useSelector(
        (state) => state.misc
      );
    


    const handleMobile = () =>{
        dispatch(setIsMobile(true))
    }

    const openSearch = () =>{
        dispatch(setIsSearch(true))
    }

    const openNewGroup = () =>{
        dispatch(setIsNewGroup(true))
    }

    const openNotification = ()=>{
        setIsNotification(prev=>!prev)
    }

    const navigateToGroup = () =>{
        navigate("/groups")
    }

    const logoutHandler = async () => {
        try {
          const { data } = await axios.get(`${server}/api/v1/user/logout`, {
            withCredentials: true,
          });
          dispatch(userNotExists());
          toast.success(data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      };

  return <>
  
  <Box sx={{flexGrow:1}} height={"4rem"}>
    <AppBar position='static' sx={{
        bgcolor:orange
    }}>

        <Toolbar>
            <Typography
            variant='h6'
            sx={{
                display:{xs:"none",sm:"block"}
            }}
            >
                Chatify
            </Typography>
            <Box 
            sx={{
                display:{xs:"block",sm:"none"},
            }}
            >
                <IconButton color='inherit' onClick={handleMobile}>
                   <MenuIcon/>  
                </IconButton>

            </Box>
            <Box
                sx={{
                    flexGrow:1
                }}
            />
            <Box>
                <IconBtn
                title={"Search"}
                icon={<SearchIcon/>}
                onClick={openSearch}
                />

                <IconBtn
                title={"New Group"}
                icon={<AddIcon/>}
                onClick={openNewGroup}
                />

                <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon/>}
                onClick={navigateToGroup}
                />

                <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon/>}
                onClick={openNotification}
                />



                <IconBtn
                title={"Logout"}
                icon={<LogoutIcon/>}
                onClick={logoutHandler}
                />
            
            </Box>

        </Toolbar>


    </AppBar>
  </Box>
{
    isSearch && (
        <Suspense fallback={<Backdrop open/>}>
            <SearchDialog/>
        </Suspense>
        
    )
}
{
    isNotification && (
        <Suspense fallback={<Backdrop open/>}>
            <NotificationDialog/>
        </Suspense>
        
    )
}
{
    isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
            <NewGroupDialog/>
        </Suspense>
        
    )
}

  </>
}

const IconBtn = ({title,icon,onClick}) =>{
    return (
        <Tooltip title ={title}>
            <IconButton color='inherit' size='large' onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default Header