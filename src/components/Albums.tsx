import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {musicAPI} from "../service/MusicService";
import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import Cards from "./UI/Cards";
import {IAlbums} from "../models/IAlbums";

const Albums = () => {
  const params = useParams()
  const router = useNavigate()
  const {data: albums, isLoading, isError, status, refetch} = musicAPI.useFetchAlbumsQuery({artistFilterName: params.artist ? params.artist : ''})
  return (
    <div>
      <Cards
        isError={isError}
        isLoading={isLoading}
        status={status}
        refetch={refetch}
        albums={albums}
        albumsElem={(album: IAlbums) =>
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