import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import {Icon} from 'antd'

function FileUpload() {
  const onDropHandler = (files) => {

    let formData = new FormData();

    const config = {
      header: {'content-type': 'multipart/form-data'}
    }

    formData.append('file', files[0])
    
    axios.post('/api/product/image',formData, config )
    .then(reponse => {
      if(reponse.data.success){
        console.log(reponse.data)
      } else {
        alert('파일저장을 실패하였습니다.')
      }
    })
  } 

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <Dropzone onDrop={onDropHandler}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div style={{
              width: 300, height: 240, border: '1px solid lightgray',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} 
           {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type='plus' style={{fontSize: '3rem'}} />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default FileUpload
