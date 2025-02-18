import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>搜尋對話</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} pb={4}>
            <Input
              placeholder="搜尋對話..."
              onChange={(e) => {/* 處理搜尋邏輯 */}}
            />
            {/* 這裡放置搜尋結果列表 */}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SearchDialog 