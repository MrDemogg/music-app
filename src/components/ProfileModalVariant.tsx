import React, {ChangeEvent, FC} from 'react';
import {Button, FormControl, FormHelperText, Link, TextField, Typography} from "@mui/material";

interface ProfileModalVariantProps {
  title: string
  successFunc: () => void,
  anotherFunc: () => void,
  changeUsername: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ) => void,
  changePassword: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ) => void,
  anotherText: string,
  error: boolean,
  helperText: string,
  toDefaultError: () => void
}

const ProfileModalVariant: FC<ProfileModalVariantProps> =
  ({title, successFunc, anotherFunc, anotherText, changePassword, changeUsername, error, helperText, toDefaultError}) => {

  return (
    <>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <div style={{ marginTop: 2 }}>
        <FormControl error={error}>
          <TextField label="Username" variant="outlined" onChange={(e) => {
            changeUsername(e)
            toDefaultError()
          }} sx={{mt: 2}} />
          <TextField label="Password" variant="outlined" onChange={(e) => {
            changePassword(e)
            toDefaultError()
          }} sx={{mt: 2}} />
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </div>
      <Button variant={'outlined'} color={'success'} sx={{mt: 2}} onClick={() => {
        successFunc()
        toDefaultError()
      }}>{title}</Button>
      <Typography sx={{mt: 2}} variant={'subtitle2'}>
        {title === 'Login'
          ? 'If you\'re haven\'t account yet -'
          : 'If you\'re already have the account - '
        } <Link onClick={anotherFunc} style={{cursor: 'pointer'}}>{anotherText}</Link>
      </Typography>
    </>
  );
};

export default ProfileModalVariant;