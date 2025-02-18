import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

interface UploadedFile {
  id: string
  name: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
}

const FileUploadModal = ({ isOpen, onClose }: FileUploadModalProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        progress: 0,
        status: 'uploading'
      }
      
      setUploadedFiles(prev => [...prev, newFile])
      simulateUpload(newFile.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { 
                ...file, 
                progress,
                status: progress === 100 ? 'completed' : 'uploading'
              }
            : file
        )
      )
      
      if (progress === 100) {
        clearInterval(interval)
      }
    }, 500)
  }

  const handleDelete = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        上傳文件
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
        <Box
          sx={{
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'grey.300',
            borderRadius: 1,
            p: 5,
            textAlign: 'center',
            bgcolor: isDragging ? 'primary.50' : 'grey.50',
            transition: 'all 0.2s',
            mb: 3,
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
          <Typography>拖放文件到此處或點擊上傳</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            支持 PDF、Word、Excel 文件
          </Typography>
        </Box>

        <Stack spacing={2}>
          {uploadedFiles.map(file => (
            <Box
              key={file.id}
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
                <Typography flex={1}>{file.name}</Typography>
                <IconButton
                  className="delete-button"
                  size="small"
                  onClick={() => handleDelete(file.id)}
                  sx={{
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={file.progress}
                color={file.status === 'error' ? 'error' : 'primary'}
                sx={{ mt: 1, borderRadius: 1 }}
              />
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploadModal