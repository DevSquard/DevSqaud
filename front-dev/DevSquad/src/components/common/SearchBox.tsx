import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // 엔터 키를 눌렀을 때 검색 실행
      console.log('Searching for:', searchTerm);
      // 검색 로직 추가할곳

    }
  };

  return (
    <TextField
      value={searchTerm}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
      variant="outlined"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {searchTerm && (
              <IconButton onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      fullWidth
      sx={{
        width: '300px',
        height: '30px',
        '& .MuiInputBase-input': {
          fontSize: '14px',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '20px',
        },
        borderRadius: '16px'
      }}
    />
  );
};

export default SearchBox;
