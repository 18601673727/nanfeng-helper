import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
// import { addFile, delFile } from '../actions/home';

class Home extends Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    let validFiles = []

    acceptedFiles.forEach((file) => {
      if (file.path.endsWith('.xls') || file.path.endsWith('.xlsx')) {
        validFiles.push({
          name: file.name,
          path: file.path,
        })
      }
    })

    this.props.addFile(validFiles);
  }

  render() {
    const isFileListShow = this.props.home.validFiles.length

    return (
      <div className="container">
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps({ onClick: evt => evt.preventDefault() }) }
                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ? <p>监测到文件</p> : <p>请放入要处理的表格</p>
                }
              </div>
            )
          }}
        </Dropzone>
        <ul className={classNames('file-list', {'file-list--show': isFileListShow})}>
          {
            this.props.home.validFiles.map((file, key) => {
              return (
                <li key={key}>
                  <span>{file.name}</span>
                  <i className="fas fa-times-circle" onClick={() => this.props.delFile(key)}/>
                </li>
              )
            })
          }
        </ul>
        <div className={classNames('foot-buttons', {'foot-buttons--show': isFileListShow})}>
          <a className="clear" onClick={this.props.clearFiles}>清除全部</a>
          <Link to={routes.COUNTER} className="go">立即生成</Link>
        </div>
      </div>
    );
  }
}

export default Home;