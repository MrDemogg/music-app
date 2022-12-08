import React, {FC, ReactNode} from 'react';
import {IAlbums} from "../../models/IAlbums";
import {IArtists} from "../../models/IArtists";
import {ITracks} from "../../models/ITracks";
import VisualInfo from "./VisualInfo";
import {Card, IconButton, Typography} from "@mui/material";
import {Cached} from "@mui/icons-material";
import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {musicSlice} from "../../store/reducers/MusicSlice";

interface CardsProps {
  artists?: IArtists[],
  albums?: IAlbums[],
  tracks?: ITracks[],
  artistElem?: (arg: IArtists) => ReactNode,
  albumsElem?: (arg: IAlbums) => ReactNode,
  tracksElem?: (arg: ITracks, index: number) => ReactNode,
  isError: boolean,
  error?: SerializedError | FetchBaseQueryError,
  isLoading: boolean,
  refetch: () => void
}

const Cards: FC<CardsProps> = ({
  artists,
  albums,
  tracks,
  albumsElem,
  artistElem,
  tracksElem,
  isLoading,
  refetch,
  error
}) => {
  const dispatch = useAppDispatch()
  const {globalIsError} = useAppSelector(state => state.musicReducer)
  if (globalIsError && error) {
    if ('error' in error) {
      dispatch(musicSlice.actions.setError(error.error))
    }
  }
  return (
    <div>
      <div style={{margin: '0 auto', width: 50, display: 'flex'}}>
        <Typography style={{marginTop: 7}}>Refetch</Typography>
        <IconButton
          onClick={() => {
            dispatch(musicSlice.actions.setGlobalIsError(false))
            dispatch(musicSlice.actions.setError(null))
            refetch()
          }}
          sx={{display: 'flex', justifyContent: 'center'}}
        >
          <Cached/>
        </IconButton>
      </div>
      {(artists && artists.length > 0) || (albums && albums.length > 0) || (tracks && tracks.length > 0) ?
            <Card>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {albums && albumsElem && albums.map(albumsElem)}
                {artists && artistElem && artists.map(artistElem)}
                {tracks && tracksElem && tracks.map(tracksElem)}
              </div>
            </Card>
        :  !isLoading && !globalIsError
        && <Typography variant={'h3'} sx={{textAlign: 'center'}}>
          В базе данных не было найдено нужных данных
        </Typography>
      }
      <VisualInfo isLoading={isLoading}/>
    </div>
  );
};

export default Cards;