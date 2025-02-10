// import axios from 'axios';
// import linkURL from './link';

// const Upload = (props) => {
//   const {
//     endPoint,
//     data,
//     dispatchResponse,
//     getProgress,
//     dispatcthAuthResponse,
//     sendData,
//     method,
//     token,
//   } = props;

//   let axiosMethod;
//   if (method) {
//     axiosMethod = method;
//   } else {
//     axiosMethod = axios.post;
//   }

//   axiosMethod(`${linkURL}/${endPoint}`, data,
//     {
//       headers: {
//         // Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//       onUploadProgress: (progressEvent) => {
//         const progress = (progressEvent.loaded / progressEvent.total) * 100;
//         if (getProgress) {
//           getProgress(progress);
//         }
//       },
//     }).then((response) => {
//     if (response.data.store_id && dispatchResponse) {
//       dispatchResponse(response.data);
//     }

//     if (dispatcthAuthResponse) {
//       dispatcthAuthResponse(response.data);
//     }

//     if (sendData) {
//       sendData(response.data);
//     }
//   }).catch((err) => {
//     if (sendData) {
//       sendData('error');
//     }
//   });
// };

// export default Upload;

const Upload = async (props) => {
  const {
    endPoint,
    data,
    dispatchResponse,
    dispatcthAuthResponse,
    sendData,
    method = 'POST', // Default to POST
    token,
  } = props;

  try {
    // Create FormData for multipart/form-data upload if needed
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const requestOptions = {
      method, // Use method passed, defaults to POST
      headers: {
        'Content-Type': 'application/json', // or 'multipart/form-data' if needed
        // Authorization: `Bearer ${token}`, // Uncomment if using token-based auth
      },
      body: JSON.stringify(data), // If JSON body is expected, otherwise use `formData`
    };

    // Fetch API request
    const response = await fetch(`${linkURL}/${endPoint}`, requestOptions);

    // Convert the response to JSON
    const responseData = await response.json();

    // Dispatch or send data based on response
    if (dispatchResponse) {
      dispatchResponse(responseData);
    }

    if (dispatcthAuthResponse) {
      dispatcthAuthResponse(responseData);
    }

    if (sendData) {
      sendData(responseData);
    }
  } catch (error) {
    // Handle errors
    if (sendData) {
      sendData('error');
    }
  }
};

export default Upload;
