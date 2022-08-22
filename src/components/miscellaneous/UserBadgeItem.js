import { Badge, Box } from '@chakra-ui/react'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

function UserBadgeItem({ user, handleFunction, admin }) {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            colorScheme="purple"
            cursor="pointer"
            onClick={handleFunction}
        >
            <Box display={'flex'} alignItems='center'>
                {user.name}
                {admin === user._id && <span> (Admin)</span>}
                <CloseIcon pl={1} />
            </Box>
        </Badge>
    )
}

export default UserBadgeItem