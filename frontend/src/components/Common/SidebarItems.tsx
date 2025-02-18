import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import CreateIcon from '@mui/icons-material/Create'
import MenuIcon from '@mui/icons-material/Menu'

interface SidebarItemsProps {
  onClose?: () => void
  onToggleSidebar?: () => void
}

const SidebarItems = ({ onClose, onToggleSidebar }: SidebarItemsProps) => {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <Box>
      <Box p={2}>
        {/* 頂部工具欄 */}
        <Flex mt={4} justify="space-between" align="center" px={1}>
          {/* 左側 Menu Icon */}
          <Icon 
            as={MenuIcon} 
            boxSize={6} 
            cursor="pointer"
            onClick={onToggleSidebar}
            _hover={{ color: "gray.600" }}
          />
          
          {/* 右側圖標組 */}
          <Flex gap={3}>
            <Icon 
              as={SearchIcon} 
              boxSize={6} 
              cursor="pointer"
              onClick={() => setSearchOpen(true)}
              _hover={{ color: "gray.600" }}
            />
            <Icon 
              as={AddIcon} 
              boxSize={6} 
              cursor="pointer"
              onClick={onClose}
              _hover={{ color: "gray.600" }}
            />
          </Flex>
        </Flex>

        {/* 這裡可以放置歷史對話列表 */}
        <Box mt={4}>
          {/* 歷史對話將在這裡渲染 */}
        </Box>
      </Box>
      <Flex 
        p={4} 
        borderBottom="1px" 
        borderColor="gray.200"
        alignItems="center"
        gap={2}
        cursor="pointer"
        onClick={onClose}
      >
        <Icon as={CreateIcon} boxSize={6} />
        <Text fontSize="md" fontWeight="medium">AnyTimeSum</Text>
      </Flex>
    </Box>
  )
}

export default SidebarItems
