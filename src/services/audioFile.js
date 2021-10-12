import axios, { post } from "axios";
import ApiHelper from "./api";

axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

export const addAudioFile = (data) => {
  console.log("data", data);
  const formData = new FormData();
  formData.append("file", data.file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return post(`/audio-file/add`, formData, config);
};

export const getAudioFileList = () =>
  ApiHelper.call(`/audio-file/list`, "GET", true);
