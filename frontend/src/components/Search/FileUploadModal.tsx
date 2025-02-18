import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Progress,
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/react"
import { useState } from "react"
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
      
      // 模擬上傳進度
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>上傳文件</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* 拖放區域 */}
          <Box
            border="2px dashed"
            borderColor={isDragging ? "blue.500" : "gray.200"}
            borderRadius="lg"
            p={10}
            textAlign="center"
            bg={isDragging ? "blue.50" : "gray.50"}
            transition="all 0.2s"
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            mb={6}
          >
            <Icon as={CloudUploadIcon} w={10} h={10} color="gray.400" mb={2} />
            <Text>拖放文件到此處或點擊上傳</Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
              支持 PDF、Word、Excel 文件
            </Text>
          </Box>

          {/* 上傳文件列表 */}
          <Box>
            {uploadedFiles.map(file => (
              <Box
                key={file.id}
                p={3}
                borderWidth={1}
                borderRadius="md"
                mb={2}
                position="relative"
                _hover={{
                  "& > button": { opacity: 1 }
                }}
              >
                <Flex align="center" mb={2}>
                  <Text flex={1}>{file.name}</Text>
                  <IconButton
                    aria-label="Delete file"
                    icon={<Icon as={CloseIcon} />}
                    size="sm"
                    variant="ghost"
                    opacity={0}
                    transition="opacity 0.2s"
                    onClick={() => handleDelete(file.id)}
                  />
                </Flex>
                <Progress
                  value={file.progress}
                  size="sm"
                  colorScheme={file.status === 'error' ? 'red' : 'blue'}
                  borderRadius="full"
                />
              </Box>
            ))}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FileUploadModal 