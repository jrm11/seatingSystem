/**
 * Created by Administrator on 2017/11/16.
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUsers, Users, TrainCamps, StudentInfo} from './data/user'
let _Users = Users;
let _TrainCamps = TrainCamps;
let _StudentInfo = StudentInfo;
import util from '@/common/js/util'
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        // some() 方法用于检测数组中的元素是否满足指定条件
        let hasUser = LoginUsers.some(u => {
          if (u.username === username && u.password === password) {
            user = JSON.parse(JSON.stringify(u));
            user.password = undefined;
            return true;
          }
        });

        if (hasUser) {
          resolve([200, {code: 200, msg: '请求成功', user}]);
        } else {
          resolve([200, {code: 500, msg: '账号或密码错误'}]);
        }
      });
    });

    //获取用户列表（分页）
    mock.onGet('/userManager/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      let userList = mockUsers;//用户所有数据
      mockUsers = mockUsers.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
      return new Promise((resolve, reject) => {
        resolve([200, {
          total: total,
          users: mockUsers,
          userList: userList
        }]);
      });
    });

    //删除用户
    mock.onGet('/userManager/remove').reply(config => {
      let {id} = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      });
    });

    //批量删除用户
    mock.onGet('/userManager/batchremove').reply(config => {
      let {ids} = config.params;
      ids = ids.split(',');
      // 判断一个数组是否包含一个指定的值
      _Users = _Users.filter(u => !ids.includes(u.id));
      console.log(_Users);
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      });
    });

    //编辑用户
    mock.onGet('/userManager/edit').reply(config => {
      let {id, name, sex, professional, department, job, time, email, phone} = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.sex = sex;
          u.professional = professional;
          u.department = department;
          u.job = job;
          u.time = time;
          u.email = email;
          u.phone = phone;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '编辑成功'
        }]);
      });
    });

    //新增用户
    mock.onGet('/userManager/add').reply(config => {
      let {name, sex, professional, department, job, time, email, phone} = config.params;
      _Users.push({
        name: name,
        sex: sex,
        professional: professional,
        department: department,
        job: job,
        time: time,
        email: email,
        phone: phone,
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '新增成功'
        }]);
      });
    });

    //创建训练营
    mock.onGet('/addTrainCamp/add').reply(config=> {
      "use strict";
      let {tId,tName, tPhone, tProductLine, classNum, createTime} = config.params;
      createTime = (!createTime || createTime == '') ? '' : util.formatDate.format(new Date(createTime), 'yyyy-MM-dd');
      _TrainCamps.push({
        tId:tId,
        tName: tName,
        tPhone: tPhone,
        tProductLine: tProductLine,
        classNum: classNum,
        createTime: createTime
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '创建成功'
        }]);

      }).catch(function (res) {
        alert(res);
      });
    });

    //获取训练营列表
    mock.onGet('/getTrainCampList/list').reply(config=> {
      "use strict";
      let {tId} = config.params;
      let mockTrainCamps = TrainCamps.filter(list => {
        if (tId && list.tId.indexOf(tId) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          mockTrainCampList: mockTrainCamps
        }]);
      });
    });

    //编辑训练营
    mock.onGet('/editTrainCamp/edit').reply(config=> {
      "use strict";
      let {tId, tName, tPhone, tProductLine, classNum, createTime} = config.params;
      createTime = (!createTime || createTime == '') ? '' : util.formatDate.format(new Date(createTime), 'yyyy-MM-dd');
      _TrainCamps.some(list=> {
        if (list.tId === tId) {
          list.tName = tName;
          list.tPhone = tPhone;
          list.tProductLine = tProductLine;
          list.classNum = classNum;
          list.createTime = createTime;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '编辑成功'
        }]);

      }).catch(function (res) {
        alert(res);
      });
    });

    //删除训练营
    mock.onGet('/delTrainCamp/del').reply(config=> {
      "use strict";
      let {id} = config.params;
      // console.log("后台"+config.params.tId);
      _TrainCamps = _TrainCamps.filter(list => list.tId !== id);
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      });
    });


    //学生座位列表信息包含id、姓名
    mock.onGet('/studentInfo/info').reply(config=> {
      "use strict";
      let {sId} = config.params;
      let studentInfoList = StudentInfo.filter(list => {
        // console.log(list.sId);
        // if (sId && list.sId.indexOf(sId) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          studentInfoList: studentInfoList
        }]);
      });
    });

    //学生座位详细信息
    mock.onGet('/studentDInfo/info').reply(config=> {
      "use strict";
      let {sId} = config.params;
      let studentDInfo = _StudentInfo.filter(list => list.sId == sId);
      return new Promise((resolve, reject) => {
        resolve([200, {
          studentDInfo: studentDInfo
        }]);
      });
    });

    //修改座位信息
    mock.onGet('/modifyStudentInfo/modifyInfo').reply(config=> {
      "use strict";
      console.log(config.params);
      let {sId, name, teacherName, education, professional, isPrimary, sourceMsg, situation, time, stage}  = config.params;
      time = (!time || time == '') ? '' : util.formatDate.format(new Date(time), 'yyyy-MM-dd');
      _StudentInfo.some(list=> {
        if (sId == list.sId) {
          list.name = name;
          list.teacherName = teacherName;
          list.education = education;
          list.professional = professional;
          list.isPrimary = isPrimary;
          list.sourceMsg = sourceMsg;
          list.situation = situation;
          list.time = time;
          list.stage = stage;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '修改成功'
        }]);

      }).catch(function (res) {
        alert(res);
      });
    });
    //删除座位信息
    mock.onGet('/delStudentInfo/delInfo').reply(config=> {
      "use strict";
      let {sId} = config.params;
      _StudentInfo = _StudentInfo.filter(list => list.sId !== sId);
      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '删除成功'
        }]);
      });
    });

    //添加座位信息
    mock.onGet('/addStudentInfo/addInfo').reply(config=> {
      "use strict";
      let {name, teacherName, education, professional, isPrimary, sourceMsg, situation, time, stage}  = config.params;
      time = (!time || time == '') ? '' : util.formatDate.format(new Date(time), 'yyyy-MM-dd');
      _StudentInfo.push({
        name: name,
        teacherName: teacherName,
        education: education,
        professional: professional,
        isPrimary: isPrimary,
        sourceMsg: sourceMsg,
        situation: situation,
        time: time,
        stage: stage
      });

      return new Promise((resolve, reject) => {
        resolve([200, {
          code: 200,
          msg: '添加成功'
        }]);
      }).catch(function (res) {
        alert(res);
      });
    });

    //修改密码
    mock.onGet('/modifyP/modify').reply(config=> {
      "use strict";
      let password = config.password;
      let newPwd = config.newPwd;
      return new Promise((resolve, reject) => {
        // some() 方法用于检测数组中的元素是否满足指定条件
        LoginUsers.some(u => {
          if (u.password === password) {
            u.password = newPwd;
            resolve([200, {
              code: 200,
              msg: '修改成功'
            }]);
            return true;
          } else {
            alert("旧密码错误，请重新填写");
          }
        });
      });
    });
  }
}
