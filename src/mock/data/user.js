/**
 * Created by Administrator on 2017/11/16.
 */
import Mock from 'mockjs'

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'http://qq1234.org/uploads/allimg/140818/3_140818171934_4.jpg',
    name: '小明'
  }
];

// 训练营
const TrainCamps = [];
for (var i = 0; i < 8; i++) {
  TrainCamps.push(Mock.mock({
    tId: Mock.mock('@increment'),
    tName: Mock.Random.cname(),
    tPhone: /^1[0-9]{10}$/,
    'tProductLine|1': ['WEB', 'JSD', 'UID', 'ANDROID', 'IOS', '游戏开发', 'U3D', '运维'],
    "classNum|10-20": 20,
    // classType: Mock.Random.integer(0, 1),
    createTime: Mock.mock('@date()'),
    bg: Mock.mock('@color()')
  }));
}

// 用户
const Users = [];
for (let i = 0; i < 100; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    sex: Mock.Random.integer(0, 1),
    'professional|1': ['工商管理', '会计', '外语', '软件工程', '计算机', '艺术', '机械', '文学', '物理'],
    'department|1': ['项目部', '研发部', '咨询部'],
    'job|1': ['咨询', '项目经理', '攻城师', '射击师', '前端', '产品', '运维', '运营','java工程师','安卓工程师'],
    time: Mock.mock('@date()'),
    email: Mock.mock('@email'),
    phone: /^1[3578]\d{9}$/
  }));
}

const StudentInfo = [];
for (var i = 0; i < 25; i++) {
  StudentInfo.push(Mock.mock({
    sId: Mock.mock('@increment'),
    //学生姓名
    'name|1': [ ' ','海海', '童童', ' ','娇娇', '珠珠', '东东', '小明',  ' ','敏敏','欢欢'],
    //座位状态
    bg: Mock.mock('@color()'),
    //咨询师名
    'teacherName|1': ["冰冰","丁丁","当当","甜甜",'萍萍'],
    //学生学历
    'education|1':['高中以下','大专','本科','本科以上'],
    //专业
    'professional|1':['工商管理', '会计', '外语', '软件工程', '计算机', '艺术', '机械', '文学', '物理'],
    //是否有基础
    'isPrimary|1':['有基础','无基础'],
    //信息来源
    'sourceMsg|1':['介绍','网络','宣传'],
    //情况
    'situation|1':['好','一般','差'],
    //学习时长
    time:Mock.mock('@date()'),
    //学习阶段
    'stage|1':['第1阶段','第2阶段','第3阶段','第4阶段'],

  }));
}
export {LoginUsers, Users, TrainCamps, StudentInfo};
