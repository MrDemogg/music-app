import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {musicAPI} from "../service/MusicService";
import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import Cards from "./UI/Cards";
import {useAppDispatch} from "../hooks/redux";
import {musicSlice} from "../store/reducers/MusicSlice";

const Albums = () => {
  const params = useParams()
  const router = useNavigate()
  const {data: albums, isLoading, isError, refetch, error} = musicAPI.useFetchAlbumsQuery({artistFilterName: params.artist ? params.artist : ''})
  const dispatch = useAppDispatch()

  if (isError) {
    dispatch(musicSlice.actions.setGlobalIsError(isError))
  }

  return (
    <div>
      <Cards
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
        albums={albums}
        error={error}
        albumsElem={(album) =>
          <Card sx={{ width: 300, bgcolor: '#1d1d1d', marginRight: 3, marginLeft: 3 }} variant={'outlined'} key={album._id}>
            <CardActionArea
              onClick={() => router('/tracks/' + album.name)}
            >
              <CardHeader
                title={album.name}
                sx={{textAlign: 'center', color: '#fff'}}
                subheaderTypographyProps={{color: 'rgba(255, 255, 255, 0.7)'}}
                subheader={'Год создания ' + album.year}
              />
              <CardMedia
                component="img"
                width={200}
                height={200}
                image={album.photo}
                alt={album.name}
              />
              <CardContent>
                <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.7)'}}>Author: {album.artist}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        }
      />
    </div>
  );
};

export default Albums;