import React, {FC, useState} from 'react';
import {Box, Modal} from "@mui/material";
import ProfileModalVariant from "./ProfileModalVariant";
import {musicAPI} from "../service/MusicService";
import {musicSlice} from "../store/reducers/MusicSlice";
import {useAppDispatch} from "../hooks/redux";

interface ProfileUsageModalProps {
  handleChange: () => void
  visible: boolean
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProfileUsageModal: FC<ProfileUsageModalProps> = ({handleChange, visible}) => {
  const [usageVariant, setUsageVariant] = useState('login')
  const [username, setUsername] = useState('')
  const [onRegisterUsername, setOnRegisterUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [helpText, setHelpText] = useState('')
  const [login] = musicAPI.useLoginMutation()
  const [register] = musicAPI.useRegisterMutation()
  const dispatch = useAppDispatch()
  const loginHandler = () => {
    login({username: username, password: password}).then((res: any) => {
      if ('error' in res && 'data' in res.error) {
        if ('originalStatus' in res.error && res.error.originalStatus === 201) {
          dispatch(musicSlice.actions.setToken(res.error.data))
          dispatch(musicSlice.actions.setUsername(onRegisterUsername !== '' ? onRegisterUsername : username))
          localStorage.setItem('user', JSON.stringify({username: onRegisterUsername !== '' ? onRegisterUsername : username, token: res.error.data}))
          handleChange()
        } else {
          setError(true)
          setHelpText(res.error.data)
        }
      }
    })
  }
  const registerHandler = () => {
    register({username: username, password: password}).then((res) => {
      if ('error' in res && 'data' in res.error) {
        if ('originalStatus' in res.error && res.error.originalStatus === 201) {
          setOnRegisterUsername(username)
          setUsageVariant('login')
        } else {
          setError(true)
          setHelpText(res.error.data as string)
        }
      }
    })
  }

  const toDefaultError = () => {
    setError(false)
    setHelpText('')
  }

  return (
    <Modal
      open={visible}
      onClose={handleChange}
    >
      <Box sx={style}>
        {usageVariant === 'login'
          ? <ProfileModalVariant
              title={'Login'}
              error={error}
              helperText={helpText}
              successFunc={loginHandler}
              anotherFunc={() => setUsageVariant('register')}
              anotherText={'Register'}
              changePassword={(e) => setPassword(e.currentTarget.value)}
              changeUsername={(e) => setUsername(e.currentTarget.value)}
              toDefaultError={toDefaultError}
            />
          : <ProfileModalVariant
              title={'Register'}
              error={error}
              helperText={helpText}
              successFunc={registerHandler}
              anotherFunc={() => setUsageVariant('login')}
              anotherText={'Login'}
              changePassword={(e) => setPassword(e.currentTarget.value)}
              changeUsername={(e) => setUsername(e.currentTarget.value)}
              toDefaultError={toDefaultError}
            />
        }
      </Box>
    </Modal>
  );
};

export default ProfileUsageModal;