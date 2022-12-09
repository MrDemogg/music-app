import React, {useEffect, useState} from 'react';
import {Avatar, Button} from "@mui/material";
import {lightBlue, lime, orange, pink, purple, red, teal, yellow} from "@mui/material/colors";
import {useAppSelector} from "../hooks/redux";
import ProfileUsageModal from "./ProfileUsageModal";

const colors = [purple, pink, red, teal, lightBlue, lime, yellow, orange]

const UserAvatar = () => {
  const {username} = useAppSelector(state => state.musicReducer)
  const [modalVisible, setModalVisible] = useState(false)
  const [usedColor, setUsedColor] = useState<"#e1bee7" | "#f8bbd0" | "#ffcdd2" | "#b2dfdb" | "#b3e5fc" | "#f0f4c3" | "#fff9c4" | "#ffe0b2">()
  const modalHandler = () => setModalVisible(!modalVisible)

  useEffect(() => {
    setUsedColor(colors[Math.floor(Math.random() * colors.length)][100])
  }, [username])

  return (
    <div>
      {username
        ? <Avatar sx={{bgcolor: usedColor}}>{username.slice(0, 1)}</Avatar>
        : <Button variant="outlined" color="info" onClick={modalHandler}>
            Login / Register
          </Button>
      }
      <ProfileUsageModal handleChange={modalHandler} visible={modalVisible} />
    </div>
  );
};

export default UserAvatar;