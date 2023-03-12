import fill from 'fill-range';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { replace } from 'connected-react-router';

const MySwal = withReactContent(Swal);

export default class Counter extends React.Component {
  componentDidMount() {
    this.props.readFiles()
  }

  note() {
    MySwal.fire({
      title: (
        <div>
          <h3>使用方法</h3>
          <small>请您鼠标选中文字后在Excel中黏贴，并点击“匹配目标格式”，感谢您的使用！</small>
        </div>
      ),
      footer: 'Copyright © 2016-2018 Meta Software. All Rights Reserved.',
    })
  }

  render() {
    const {
      // writeFile,
      counter: {
        loading,
        newSheetOne,
        newSheetFive,
        parsedFiles: { sheetOnes, sheetFives },
      },
    } = this.props;

    return (
      <div className="container">
        <div className="table-list">
          <h3>识别到“扬尘基础数据表（1）”{sheetOnes.length}个</h3>
          <h4>输出记录{Object.keys(newSheetOne).length}条</h4>
          <table>
            <tbody>
              {
                Object.keys(newSheetOne).map((row, key1) => {
                  return (
                    <tr key={key1}>
                      <td>{row}</td>
                      {
                        Object.keys(newSheetOne[row]).map((column, key2) => {
                          return <td key={key2}>{newSheetOne[row][column]}</td>
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <h3>识别到“扬尘基础数据（5）”{sheetFives.length}个</h3>
          <h4>输出记录{newSheetFive.length}条</h4>
          <table>
            <tbody>
              {
                newSheetFive.length ? newSheetFive.map((row, key1) => {
                  return (
                    <tr key={key1}>
                      <td>{key1 + 1}</td>
                      {
                        Object.keys(row).map((column, key2) => {
                          return <td key={key2}>{newSheetFive[key1][column]}</td>
                        })
                      }
                    </tr>
                  )
                }) : null
              }
            </tbody>
          </table>

          <br />

          <div className="foot-buttons foot-buttons--show">
            <Link to={routes.HOME} className="back">返回</Link>
            <a onClick={() => this.note()}>说明</a>
          </div>
        </div>
      </div>
    );
  }
}
