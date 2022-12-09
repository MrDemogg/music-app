import React, {FC, ReactNode} from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {musicAPI} from "../service/MusicService";
import {musicSlice} from "../store/reducers/MusicSlice";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface ProfileProps {
  avatar: ReactNode,
  visible: boolean,
  handleChange: () => void
}

const Profile: FC<ProfileProps> = ({avatar, visible, handleChange}) => {
  const [logout] = musicAPI.useLogoutMutation()
  const {username, token} = useAppSelector(state => state.musicReducer)
  const dispatch = useAppDispatch()
  const logoutHandler = () => {
    username && token && logout({username: username, token: token}).then(res => {
      if ('error' in res && 'originalStatus' in res.error && res.error.originalStatus !== 200 && 'data' in res.error && res.error.data) {
        dispatch(musicSlice.actions.setError(res.error.data as string))
        dispatch(musicSlice.actions.setGlobalIsError(true))
      } else {
        dispatch(musicSlice.actions.setToken(null))
        dispatch(musicSlice.actions.setUsername(null))
        localStorage.removeItem('user')
      }
      handleChange()
    })
  }
  return (
    <Modal
      open={visible}
      onClose={handleChange}
    >
      <Box sx={style}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            {avatar}
            <Typography sx={{ml: 1}} variant={'h4'}>{username}</Typography>
          </div>
          <Button variant={'outlined'} color={'error'} onClick={logoutHandler}>Logout</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Profile;