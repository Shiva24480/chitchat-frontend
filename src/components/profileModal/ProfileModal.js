import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner,
    Button,
    Text,
    Avatar
} from '@chakra-ui/react'

const ProfileModal = ({ user, handleLogout }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Text width={'100%'} onClick={onOpen}>Profile</Text>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' alignItems={'center'} justifyContent='center' flexDirection={'column'}>
                        <Avatar size='2xl' src={user.pic}></Avatar>
                        <Text>Email: {user.email}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' onClick={onClose}>Close</Button>
                        <Button onClick={handleLogout} marginLeft={'0.3rem'} colorScheme='red'>Logout</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal