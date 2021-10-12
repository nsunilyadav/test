import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { getAudioFileList } from "../services/audioFile";

const AudioFileList = () => {
  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const [fileList, setFileList] = useState([]);
  const [isPlayingList, setIsPlayingList] = useState([]);
  const [audioList, setAudioList] = useState([]);

  useEffect(() => {
    getFileList();
  }, []);

  const getFileList = async () => {
    try {
      const data = await getAudioFileList();

      setFileList(data.data);
      data.data.forEach((file) => {
        setAudioList([...audioList, new Audio(`${baseUrl}${file.name}`)]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const playPause = (index) => {
    let isPlaying = isPlayingList[index];

    if (isPlaying) {
      audioList[index].pause();
    } else {
      audioList[index].play();
    }

    const playingList = [...isPlayingList];
    playingList[index] = !playingList[index];
    setIsPlayingList(playingList);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Audio File Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {fileList.map((file, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{file.name}</td>
            <td>
              <Button onClick={() => playPause(index)}>
                {isPlayingList[index] ? "Pause" : "Play"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AudioFileList;
