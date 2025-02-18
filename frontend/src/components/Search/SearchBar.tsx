import {
  Box,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material'
import { useState } from "react"
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  onSearch?: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <Box sx={{ width: '100%', px: 4, py: 2 }}>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 28,
        }}
      >
        <InputBase
          sx={{ 
            ml: 1, 
            flex: 1,
            '& .MuiInputBase-input::placeholder': {
              fontSize: '0.7rem',  // 14px
              opacity: 0.7,
            },
          }}
          placeholder="Semantic search Enter one or two sentences you want to say..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSearch()
            }
          }}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  )
}

export default SearchBar 