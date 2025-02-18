import { Box, Container, Flex, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "@/hooks/useAuth"
import SearchBar from "@/components/Search/SearchBar"
import ContentBlock from "@/components/Search/ContentBlock"
import PromotionBlock from "@/components/Search/PromotionBlock"


export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
  }

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
      </Container>

      <Box px={4}>
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Box px={4} mt={8}>
        <Flex gap={4}>
          <Box flex={1}>
            <ContentBlock />
          </Box>
          <Box flex={1}>
            <PromotionBlock />
          </Box>
        </Flex>
      </Box>
    </>
  )
}
