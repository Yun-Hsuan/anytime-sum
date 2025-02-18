import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import LinkIcon from '@mui/icons-material/Link'
import SyncIcon from '@mui/icons-material/Sync'
import SettingsIcon from '@mui/icons-material/Settings'

const menuItems = [
  {
    icon: UploadFileIcon,
    title: "File Upload",
    description: "上傳 PDF、Word、Excel 文件",
  },
  {
    icon: LinkIcon,
    title: "Insert Website",
    description: "批次或逐條上傳連結",
  },
  {
    icon: SyncIcon,
    title: "Use Anytime Data API",
    description: "使用 Anytime 數據 API",
  },
  {
    icon: SettingsIcon,
    title: "API",
    description: "API 設定（開發中）",
  },
]

const ContentBlock = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      p={4}
      bg="white"
    >
      <Flex align="center" mb={4}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={AddIcon} mr={2} />
          Content
        </Button>
      </Flex>

      <Box
        opacity={isOpen ? 1 : 0}
        maxH={isOpen ? "1000px" : "0"}
        overflow="hidden"
        transition="all 0.3s ease"
      >
        <VStack gap={2} align="stretch" pl={2}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              justifyContent="flex-start"
              size="md"
              py={6}
              onClick={() => {
                console.log(`Clicked: ${item.title}`)
              }}
              _hover={{ bg: "gray.50" }}
            >
              <Flex align="center">
                <Icon as={item.icon} mr={3} />
                <Box>
                  <Text fontSize="md" fontWeight="medium">
                    {item.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {item.description}
                  </Text>
                </Box>
              </Flex>
            </Button>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}

export default ContentBlock 