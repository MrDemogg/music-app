import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import {musicAPI} from "../service/MusicService";
import {useNavigate} from "react-router-dom";
import {Cached} from "@mui/icons-material";
import VisualInfo from "./UI/VisualInfo";

const Artists = () => {
  const {data: artists, refetch, status, isLoading, isError} = musicAPI.useFetchArtistsQuery(undefined)
  const router = useNavigate()

  return (
    <div>
      {isLoading || isError
        ? <VisualInfo status={status} isError={isError} isLoading={isLoading} />
        : artists && artists.length > 0 ?
          <Card>
            <div style={{margin: '0 auto', width: 50, display: 'flex'}}>
              <Typography style={{marginTop: 7}}>Refetch</Typography>
              <IconButton
                onClick={() => refetch()}
                sx={{display: 'flex', alignSelf: 'center'}}
              >
                <Cached />
              </IconButton>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {artists.map(artist =>
              <Card sx={{ width: 300, bgcolor: '#000'}} variant={'outlined'} key={artist._id}>
                <CardActionArea
                  onClick={() => router('/albums/' + artist.name)}
                >
                  <CardHeader title={artist.name} sx={{textAlign: 'center', color: '#fff'}} />
                  <CardMedia
                    component="img"
                    width={200}
                    height={200}
                    image={artist.photo}
                    alt={artist.name}
                  />
                  <CardContent>
                    <Typography sx={{color: '#fff'}} variant={'subtitle1'}>{artist.info}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              )}
            </div>
          </Card>
          : <Typography variant={'h3'} sx={{textAlign: 'center'}}>
            В базе данных не было найдено артистов
          </Typography>
      }
    </div>
  );
};

export default Artists;