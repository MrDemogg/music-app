import React, {FC, ReactNode} from 'react';
import {IAlbums} from "../../models/IAlbums";
import {IArtists} from "../../models/IArtists";
import {ITracks} from "../../models/ITracks";
import VisualInfo from "./VisualInfo";
import {Card, IconButton, Typography} from "@mui/material";
import {Cached} from "@mui/icons-material";

interface CardsProps {
  artists?: IArtists[],
  albums?: IAlbums[],
  tracks?: ITracks[],
  artistElem?: (arg: IArtists) => ReactNode,
  albumsElem?: (arg: IAlbums) => ReactNode,
  tracksElem?: (arg: ITracks) => ReactNode,
  isError: boolean,
  isLoading: boolean,
  status: string,
  refetch: () => void
}

const Cards: FC<CardsProps> = ({
  artists,
  albums,
  tracks,
  albumsElem,
  artistElem,
  tracksElem,
  isError,
  isLoading,
  status,
  refetch
}) => {
  return (
    <div>
      <VisualInfo status={status} isError={isError} isLoading={isLoading}/>
      {(artists && artists.length > 0) || (albums && albums.length > 0) || (tracks && tracks.length > 0) ?
        <Card>
          <div style={{margin: '0 auto', width: 50, display: 'flex'}}>
            <Typography style={{marginTop: 7}}>Refetch</Typography>
            <IconButton
              onClick={() => refetch()}
              sx={{display: 'flex', justifyContent: 'center'}}
            >
              <Cached/>
            </IconButton>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {albums && albumsElem && albums.map(albumsElem)}
            {artists && artistElem && artists.map(artistElem)}
            {tracks && tracksElem && tracks.map(tracksElem)}
          </div>
        </Card>
        : <Typography variant={'h3'} sx={{textAlign: 'center'}}>
          В базе данных не было найдено артистов
        </Typography>}
    </div>
  );
};

export default Cards;