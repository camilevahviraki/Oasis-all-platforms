import axios from 'axios';
import linkURL from './link';

const Upload = (props) => {
  const {
    endPoint,
    data,
    dispatchResponse,
    getProgress,
    dispatcthAuthResponse,
    sendData,
    method,
    token,
  } = props;

  // Determine HTTP method
  const axiosMethod = method || axios.post;

  // Prepare headers
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  // If a token is provided, add it to the headers
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  axiosMethod(`${linkURL}/${endPoint}`, data, {
    headers,
    onUploadProgress: (progressEvent) => {
      const progress = (progressEvent.loaded / progressEvent.total) * 100;
      if (getProgress) {
        getProgress(progress);
      }
    },
  })
    .then((response) => {
      // Handle the response data
      if (response.data.store_id && dispatchResponse) {
        dispatchResponse(response.data);
      }

      if (dispatcthAuthResponse) {
        dispatcthAuthResponse(response.data);
      }

      if (sendData) {
        sendData(response.data);
      }
    })
    .catch((err) => {
      console.error('Upload failed:', err);
      // Handle errors by sending 'error' status to the sendData callback
      if (sendData) {
        sendData('error');
      }
    });
};

export default Upload;
