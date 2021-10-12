import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AudioFileList from "./../components/AudioFileList";
import { addAudioFile } from "../services/audioFile";

const Dashboard = () => {
  const [file, setFile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFileChange = (e, field) => {
    let files = e.target.files;

    setFile({ file: files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await addAudioFile(file);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Upload new audio File</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              onFileChange(e);
            }}
          />
        </Form.Group>

        {error}
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading…" : "Add"}
        </Button>
      </Form>
      <AudioFileList />
    </div>
  );
};

export default Dashboard;
