import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Icon } from "antd";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setImages([...Images, response.data.filePath]);
        //console.log(Images)
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("파일저장을 실패하였습니다.");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              alt={image}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
