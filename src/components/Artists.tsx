import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardHeader, CardMedia, Typography} from "@mui/material";
import {musicAPI} from "../service/MusicService";
import {useNavigate} from "react-router-dom";
import Cards from "./UI/Cards";
import {IArtists} from "../models/IArtists";

const Artists = () => {
  const {data: artists, refetch, status, isLoading, isError} = musicAPI.useFetchArtistsQuery(undefined)
  const router = useNavigate()

  return (
    <div>
      <Cards artists={artists && artists} artistElem={
        (artist: IArtists) =>
          <Card sx={{ width: 300, bgcolor: '#1d1d1d', marginRight: 3, marginLeft: 3 }} variant={'outlined'} key={artist._id}>
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
                <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.7)'}}>{artist.info}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      } isError={isError} isLoading={isLoading} status={status} refetch={refetch} />
    </div>
  );
};

export default Artists;