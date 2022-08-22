import React, { useEffect, useState } from 'react'
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
    Button
} from '@chakra-ui/react'
import axios from 'axios';

const api = `https://api.multiavatar.com`;

const SelectProfileModal = ({pic, setPic}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [avatars, setAvatars] = useState([]);
    const [selected, setSelected] = useState(null);
    const [picLoading, setPicLoading] = useState(false);
    // const [pic, setPic] = useState();

    useEffect(() => {
        const fetchImage = async () => {
            let data = [];
            setPicLoading(true);
            for (let i = 0; i < 4; ++i) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}.png`
                );
                data.push(image.config.url);
            }
            setAvatars(data);
            setPicLoading(false);
        };
        fetchImage();
    }, []);

    const handlePic = (img_url, index) => {
        setPic(img_url.toString());
        setSelected(index);
        onClose();
    };

    return (
        <>
            <div style={{ marginRight: '1rem' }} className='register-button' onClick={onOpen}>
                {
                    loading === true ?
                        (loading && <Spinner color='white' />) :
                        ('upload profile')
                }
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select a profile photo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' justifyContent='center'>
                        <div className="avatar-row">
                            {
                                picLoading ? (
                                    <Spinner />
                                ) : (
                                    avatars.map((avatar, index) => (
                                        <img
                                            key={avatar}
                                            className="avatar"
                                            style={
                                                selected === index
                                                    ? {
                                                        border: "0.4rem solid #4e0eff",
                                                    }
                                                    : {}
                                            }
                                            src={avatar}
                                            alt={`IMG: ${index}`}
                                            onClick={(e) => handlePic(avatar, index)}
                                        />
                                    ))
                                )
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' onClick={onClose}>Upload</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SelectProfileModal