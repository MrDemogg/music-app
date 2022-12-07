import React from 'react';
import {useParams} from "react-router-dom";
import {musicAPI} from "../service/MusicService";
import VisualInfo from "./UI/VisualInfo";

const Albums = () => {
  const params = useParams()
  const {data: albums, isLoading, isError, status} = musicAPI.useFetchAlbumsQuery({artistFilterName: params.artist ? params.artist : ''})
  return (
    <div>
      <VisualInfo isLoading={isLoading} isError={isError} status={status} />
      {albums && albums.length > 0
        ? albums.map(album =>
          <div key={album._id}>
            <div>{album.name}</div>
            <div>{album.artist}</div>
            <img src={album.photo} alt={'fgf'}/>
            <div>{album.year}</div>
          </div>
        )
        : <div>Ничего нет</div>
      }
    </div>
  );
};

export default Albums;