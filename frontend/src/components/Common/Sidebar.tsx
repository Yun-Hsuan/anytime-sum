import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
// 改用 Material UI 的圖標
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { FiLogOut } from "react-icons/fi"

import type { UserPublic } from "@/client"
import useAuth from "@/hooks/useAuth"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "../ui/drawer"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    logout()
  }

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile */}
      <DrawerRoot
        placement="start"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            variant="ghost"
            color="inherit"
            display={{ base: "flex", md: "none" }}
            aria-label="Open Menu"
            position="absolute"
            zIndex="100"
            m={4}
          >
            <MenuIcon />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent maxW="280px">
          <DrawerCloseTrigger />
          <DrawerBody>
            <Flex flexDir="column" justify="space-between" h="100%">
              <Box>
                {/* ChatGPT 風格的標題 */}
                <Flex 
                  p={4} 
                  alignItems="center" 
                  borderBottom="1px" 
                  borderColor="gray.200"
                >
                  <Text fontSize="lg" fontWeight="bold">AnytimeSum</Text>
                </Flex>
                
                {/* New Chat 按鈕 */}
                <Flex
                  as="button"
                  m={2}
                  p={2}
                  alignItems="center"
                  gap={2}
                  borderRadius="md"
                  border="1px"
                  borderColor="gray.200"
                  _hover={{ bg: "gray.50" }}
                  w="95%"
                >
                  <AddIcon />
                  <Text>New Chat</Text>
                </Flex>

                {/* Search 按鈕 */}
                <IconButton
                  aria-label="Search chats"
                  variant="ghost"
                  size="sm"
                  m={2}
                  w="95%"
                  justifyContent="flex-start"
                  onClick={() => {/* 處理搜尋 */}}
                >
                  <SearchIcon />
                </IconButton>

                <SidebarItems />
              </Box>
              
              {/* 登出區域 */}
              <Box>
                <Flex
                  as="button"
                  onClick={handleLogout}
                  alignItems="center"
                  gap={4}
                  px={4}
                  py={2}
                >
                  <FiLogOut />
                  <Text>Log Out</Text>
                </Flex>
                {currentUser?.email && (
                  <Text fontSize="sm" p={2}>
                    Logged in as: {currentUser.email}
                  </Text>
                )}
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      {/* Desktop */}
      <Box
        display={{ base: "none", md: "flex" }}
        position="sticky"
        bg="bg.subtle"
        top={0}
        minW={isCollapsed ? "0" : "280px"}
        w={isCollapsed ? "0" : "280px"}
        h="100vh"
        p={4}
        transition="all 0.3s ease"
        overflow="hidden"
      >
        <Box w="100%">
          <SidebarItems 
            onClose={() => setOpen(false)} 
            onToggleSidebar={handleToggleSidebar}
          />
        </Box>
      </Box>
    </>
  )
}

export default Sidebar
