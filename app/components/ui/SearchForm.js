"use client";
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
   Stack,
   Typography,
   Button
 } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { SectionFrame } from '../frames/SectionFrame';

const Search = styled('div')(({ theme  }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.default, 0.85),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
 }));
 
 const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary
 }));
 
 const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
 }));
 

export const SearchForm = ({ setSearchValue }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
   setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
   setSearchValue(inputValue);
 };

  return (
   <SectionFrame>
      <Stack direction="column">
         <Typography 
         gutterBottom
         variant="h5"
         component="div"
         sx={{ color: "text.primary", flex: 1}} 
      >
            Discover new meals
         </Typography>
         <Typography 
         gutterBottom
         variant="body1"
         component="div"
         sx={{ color: "text.secondary"}} 
      >
            Find and explore delicious dishes that suit your taste
         </Typography>
            </Stack>  

   
      <Stack direction="row" spacing={1}>
      <Search>
         <SearchIconWrapper>
            <SearchIcon color="primary" />
         </SearchIconWrapper>
         <StyledInputBase
            placeholder="Search meal…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleInputChange}
            value={inputValue}
         />
      </Search>
      <Button variant="contained" color="primary" onClick={handleSearchClick}>
         Search
      </Button>
      <Button variant="contained" color="secondary" onClick={() => {
         setInputValue('');
         setSearchValue('');
      }}>
         Clear
      </Button>
      </Stack>
   </SectionFrame>
)
}


