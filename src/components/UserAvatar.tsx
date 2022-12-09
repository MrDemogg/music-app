import React, {useEffect, useState} from 'react';
import {Avatar, Button} from "@mui/material";
import {lightBlue, lime, orange, pink, purple, red, teal, yellow} from "@mui/material/colors";
import {useAppSelector} from "../hooks/redux";
import ProfileUsageModal from "./ProfileUsageModal";
import Profile from "./Profile";

const colors = [purple, pink, red, teal, lightBlue, lime, yellow, orange]

const UserAvatar = () => {
  const {username} = useAppSelector(state => state.musicReducer)
  const [usageModalVisible, setUsageModalVisible] = useState(false)
  const [profileModalVisible, setProfileModalVisible] = useState(false)
  const [usedColor, setUsedColor] = useState<"#e1bee7" | "#f8bbd0" | "#ffcdd2" | "#b2dfdb" | "#b3e5fc" | "#f0f4c3" | "#fff9c4" | "#ffe0b2">()
  const usageModalHandler = () => setUsageModalVisible(!usageModalVisible)
  const profileModalHandler = () => setProfileModalVisible(!profileModalVisible)

  useEffect(() => {
    setUsedColor(colors[Math.floor(Math.random() * colors.length)][100])
  }, [username])

  return (
    <div>
      {username
        ? <Avatar sx={{bgcolor: usedColor}} onClick={profileModalHandler} style={{cursor: 'pointer'}}>{username.slice(0, 1)}</Avatar>
        : <Button variant="outlined" color="info" onClick={usageModalHandler}>
            Login / Register
          </Button>
      }
      <ProfileUsageModal handleChange={usageModalHandler} visible={usageModalVisible} />
      <Profile
        avatar={<Avatar sx={{bgcolor: usedColor}}>{username && username.slice(0, 1)}</Avatar>}
        visible={profileModalVisible}
        handleChange={profileModalHandler}
      />
    </div>
  );
};

export default UserAvatar;