import React from 'react'
import PropTypes from 'prop-types' 
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {reqDeleteImg} from '../../api/index'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs : PropTypes.array
  }

  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   previewTitle: '',
  //   fileList: [
  //   ],
  // };


  constructor(props){
    super(props);

    let fileList = [];
    const {imgs} = this.props;
    if(imgs && imgs.length > 0){
      fileList = imgs.map((i,index)=>({
        uid : -index,
        name : i,
        status : "done",
        url : "http://localhost:5000/upload/" + i
      }) ); 
    }

    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };


  //file:当前操作的图片文件(上传/删除) 
  //filelist:所有已上传图片文件对象的数组
  handleChange = async({ file,fileList }) => {
    console.log(file,fileList);
    if(file.status === 'done'){
      const res = file.response;
      console.log(res);
      if(res.status === 0){
        message.success("上传图片成功!");
        const {name,url} = res.data;
        file = fileList[fileList.length-1];
        file.name = name;
        file.url = url;
      }else{
        message.error("上传图片失败!")
      }
    }else if(file.status === 'removed'){ //删除图片
      const result = await reqDeleteImg(file.name);
      if(result.status ===0){
        message.success("删除图片成功!")
      }else{
        message.error("删除图片失败!")
      }
    }
    this.setState({fileList })
  };


  //获取所有已经上传图片文件名的数组
  getImgs = ()=>{
    return this.state.fileList.map(i=>i.name);
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload" //上传图片的接口地址
          accept='image/*'  //只接收图片类型
          listType="picture-card"   //卡片样式
          name='image'              //请求参数名称
          fileList={fileList}           //所有已上传图片的文件对象的数组
          onPreview={this.handlePreview}    //是否可预览
          onChange={this.handleChange}  //
        >
          {fileList.length > 2 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

