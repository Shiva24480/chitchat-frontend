import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}

export async function search(token, toSearchString, setSearchResult) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_END_POINT}/api/users?search=${toSearchString}`, config);
        setSearchResult(data);
        return true;
    } catch (error) {
        toast.error("Not found", toastStyle);
        return false;
    }
}

