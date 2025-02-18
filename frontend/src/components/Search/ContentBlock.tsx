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
import FileUploadModal from '../Upload/FileUploadModal'
import WebsitesInsertModal from '../Upload/WebsitesInsertModal'

const menuItems = [
  {
    icon: UploadFileIcon,
    title: "Files Upload",
    description: "(PDF、Word、Excel)",
  },
  {
    icon: LinkIcon,
    title: "Websites Insert",
    description: "(batch or single insert)",
  },
  {
    icon: SyncIcon,
    title: "Use Anytime Data API",
    description: "(AnyTimeData integration)",
  },
  {
    icon: SettingsIcon,
    title: "API",
    description: "(APIs Integration)",
  },
]

const ContentBlock = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showWebsitesModal, setShowWebsitesModal] = useState(false)

  const handleItemClick = (title: string) => {
    if (title === "Files Upload") {
      setShowUploadModal(true)
    } else if (title === "Websites Insert") {
      setShowWebsitesModal(true)
    }
    console.log(`Clicked: ${title}`)
  }

  return (
    <>
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
                onClick={() => handleItemClick(item.title)}
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

      <FileUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
      
      <WebsitesInsertModal
        isOpen={showWebsitesModal}
        onClose={() => setShowWebsitesModal(false)}
      />
    </>
  )
}

export default ContentBlock 