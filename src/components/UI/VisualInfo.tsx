import React, {FC} from 'react';
import {InfinitySpin} from "react-loader-spinner";
import {Typography} from "@mui/material";

interface StatusProps {
  isLoading: boolean,
  isError: boolean,
  status: string
}

const VisualInfo: FC<StatusProps> = ({isError, isLoading, status}) => {
  return (
    <div>
      {isLoading
        ? <div style={{margin: 'auto', width: 200, height: 200}}>
          <InfinitySpin
            width='200'
            color="#4fa94d"
          />
        </div>
        : isError
          && <Typography variant={'h3'} sx={{textAlign: 'center'}}>{status === 'rejected'
            ? 'Неожиданная ошибка связанная с сервером :( Повторите позже'
            : 'Ошибка'
          } </Typography>
      }
    </div>
  );
};

export default VisualInfo;