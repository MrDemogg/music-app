import React, {FC} from 'react';
import {InfinitySpin} from "react-loader-spinner";
import {Typography} from "@mui/material";
import { useAppSelector} from "../../hooks/redux";

interface StatusProps {
  isLoading: boolean,
}

const VisualInfo: FC<StatusProps> = ({isLoading}) => {
  const {error, globalIsError} = useAppSelector(state => state.musicReducer)

  return (
    <div style={{
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
      textAlign: 'center',
    }}>
      {isLoading
        ? <div style={{margin: 'auto', width: 200, height: 200}}>
          <InfinitySpin
            width='200'
            color="#4fa94d"
          />
        </div>
        : globalIsError
          && <Typography variant={'h3'} sx={{textAlign: 'center'}}>{error && error}</Typography>
      }
    </div>
  );
};

export default VisualInfo;