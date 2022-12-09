import React, {useState} from 'react';
import {musicAPI} from "../service/MusicService";
import {useParams} from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import Cards from "./UI/Cards";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {musicSlice} from "../store/reducers/MusicSlice";

const Tracks = () => {
  const params = useParams()
  const {token} = useAppSelector(state => state.musicReducer)
  const {data: tracks, isLoading, isError, refetch, error} = musicAPI.useFetchTracksQuery({albumFilterName: params.album ? params.album : ''})
  const dispatch = useAppDispatch()
  const [postTrackHistory] = musicAPI.usePostTrackHistoryMutation()
  const [volume, setVolume] = useState(50)

  const playHandler = (userToken: string, id: string) => {
    postTrackHistory({token: userToken, track: id}).then((res: any) => {
      if ('error' in res) {
        if ('data' in res.error) {
          dispatch(musicSlice.actions.setGlobalIsError(true))
          dispatch(musicSlice.actions.setError(res.error.data))
        }
      }
    })
  }

  if (isError) {
    dispatch(musicSlice.actions.setGlobalIsError(isError))
  }

  const volumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  return (
    <div>
      <Cards
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
        tracks={tracks}
        error={error}
        tracksElem={(track, index) =>
          <Card sx={{ width: 300, marginRight: 3, marginLeft: 3 }} variant={'outlined'} key={track._id}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {track.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {track.album}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="play/pause" onClick={() => track._id && token && playHandler(token, track._id)
                }>
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
              </Box>
            </Box>
            <Slider aria-label="Volume" value={volume} onChange={volumeChange} />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{pl: 1}}
            >Номер трека: {index + 1}</Typography>
          </Card>
        }
      />
    </div>
  );
};

export default Tracks;