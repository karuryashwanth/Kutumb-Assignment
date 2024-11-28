import axios from 'axios';

const API = axios.create({
    baseURL: 'https://assignment.stage.crafto.app',
    headers: { 'Content-Type': 'application/json' },
});

// Login API
export const login = async (username, otp) => {
    const response = await API.post('/login', { username, otp });
    return response.data; // Returns the token
}



export const fetchQuotes = async (limit, offset, token) => {
    console.log("token---", token);
    if (!token) {
        throw new Error('Authorization token is missing');
    }
    try {
        const response = await API.get('/getQuotes', {
            params: { limit, offset },
            headers: { Authorization: `${token}` },
        });
        return response.data?.data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
};


export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data; // Return the mediaUrl from the response
};

export const createQuote = async (text, mediaUrl, token) => {
    console.log("text--", text);
    console.log("mediaUrl--", mediaUrl);


    const response = await axios.post(
        'https://assignment.stage.crafto.app/postQuote', {
        text,
        mediaUrl,
    },
        {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
            //headers: { Authorization: `${token}` },
        }
    );
    return response.data;
};