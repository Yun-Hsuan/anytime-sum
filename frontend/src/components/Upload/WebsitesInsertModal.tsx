import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  TextField,
  LinearProgress,
  Stack,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'

interface WebsitesInsertModalProps {
  isOpen: boolean
  onClose: () => void
}

interface WebsiteItem {
  id: string
  url: string
  progress: number
  status: 'processing' | 'completed' | 'error'
}

const WebsitesInsertModal = ({ isOpen, onClose }: WebsitesInsertModalProps) => {
  const [singleUrl, setSingleUrl] = useState('')
  const [batchUrls, setBatchUrls] = useState('')
  const [websiteItems, setWebsiteItems] = useState<WebsiteItem[]>([])

  const handleSingleInsert = () => {
    if (!singleUrl.trim()) return
    
    const newItem: WebsiteItem = {
      id: Math.random().toString(36).substr(2, 9),
      url: singleUrl.trim(),
      progress: 0,
      status: 'processing'
    }
    
    setWebsiteItems(prev => [...prev, newItem])
    setSingleUrl('')
    simulateProcessing(newItem.id)
  }

  const handleBatchInsert = () => {
    if (!batchUrls.trim()) return
    
    const urls = batchUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)
    
    const newItems = urls.map(url => ({
      id: Math.random().toString(36).substr(2, 9),
      url,
      progress: 0,
      status: 'processing' as const
    }))
    
    setWebsiteItems(prev => [...prev, ...newItems])
    setBatchUrls('')
    newItems.forEach(item => simulateProcessing(item.id))
  }

  const simulateProcessing = (itemId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setWebsiteItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { 
                ...item, 
                progress,
                status: progress === 100 ? 'completed' : 'processing'
              }
            : item
        )
      )
      
      if (progress === 100) {
        clearInterval(interval)
      }
    }, 500)
  }

  const handleDelete = (itemId: string) => {
    setWebsiteItems(prev => prev.filter(item => item.id !== itemId))
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Websites Insertion
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Single Insert */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Single Insert
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              placeholder="Insert url..."
              value={singleUrl}
              onChange={(e) => setSingleUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSingleInsert()
                }
              }}
            />
            <IconButton 
              onClick={handleSingleInsert}
              color="primary"
              sx={{ alignSelf: 'center' }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Batch Insert */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Batch Insert
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={7}
            placeholder="Line by line url inseretion..."
            value={batchUrls}
            onChange={(e) => setBatchUrls(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                height: '200px',
                overflowY: 'auto',
              },
            }}
          />
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleBatchInsert}
            disabled={!batchUrls.trim()}
          >
            Insert All
          </Button>
        </Box>

        {/* Progress List */}
        <Stack spacing={2}>
          {websiteItems.map(item => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 1,
                position: 'relative',
                '&:hover .delete-button': {
                  opacity: 1,
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography flex={1} noWrap>{item.url}</Typography>
                {item.status === 'completed' && (
                  <IconButton
                    className="delete-button"
                    size="small"
                    onClick={() => handleDelete(item.id)}
                    sx={{
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
              <LinearProgress
                variant="determinate"
                value={item.progress}
                color={item.status === 'error' ? 'error' : 'primary'}
                sx={{ mt: 1, borderRadius: 1 }}
              />
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default WebsitesInsertModal 