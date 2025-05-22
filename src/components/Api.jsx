import axios from "axios";

export const GETAPI = (
    endpoint,
    params,
    apiUrl = "",
    dump = false
  ) => {
    if (dump) {
      console.log(`GETAPI::${apiUrl},${endpoint},${params}`);
    }
    return axios({
      url: endpoint,
      method: "GET",
      baseURL: apiUrl,
      headers: { "Content-Type": "application/json" },
      params: params,
      responseType: "json",
    })
      .then(
        (res) => {
          if (dump) {
            console.log(`GETAPI::res::${res}`);
          }
          return res;
        },
        (err) => {
          if (dump) {
            console.log(`GETAPI::err::${err}`);
          }
          return err;
        }
      )
      .catch((err) => {
        console.log(`GETAPI::err::${err}`);
        return err;
      });
  };
  export const POSTAPI = (
    endpoint,
    payload,
    apiUrl,
    headers = null,
    onUploadProgress = null,
    dump = false
  ) => {
    if (dump) {
      console.log(`POSTAPI::${apiUrl},${endpoint},${headers},${payload}`);
    }
    return axios({
      url: endpoint,
      method: "POST",
      baseURL: apiUrl,
      headers: headers !== null ? headers : { "Content-Type": "application/json" },
      data: payload,
      responseType: "json",
      onUploadProgress: (progressEvent) => {
        // Calculate the progress percentage
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000;
        const uploadSpeed = progressEvent.loaded / elapsedTime; // bytes per second
        const remainingBytes = progressEvent.total - progressEvent.loaded;
        const estimatedTimeRemaining = remainingBytes / uploadSpeed;
        const formattedTimeRemaining = formatTime(estimatedTimeRemaining);
        // Call the provided onUploadProgress callback if available
        if (onUploadProgress) {
          onUploadProgress(progress, formattedTimeRemaining,formatDataRate(uploadSpeed));
        }
      },
    }).then(
      (res) => {
        if (dump) {
          console.log(`POSTAPI::res::${res}`);
        }
        return res;
      },
      (err) => {
        if (dump) {
          console.log("POSTAPI::err", err);
        } else {
          console.error("POSTAPI::error::", err);
        }
        return err;
      }
    );
  };
  
  
  
  
  
  
  