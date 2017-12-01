import axios from 'axios';

let base = '';
// 登录
export const userLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data);
};

// 修改密码
export const modifyPassword = params => {
  //post请求会报错
  return axios.get(`${base}/modifyP/modify`, params).then(res => res.data);
};


// 获取用户列表
export const getUserList = params => {
  return axios.get(`${base}/userManager/list`, {params: params});
};
// 获取用户分页列表
export const getUserListPage = params => {
  return axios.get(`${base}/userManager/listpage`, {params: params});
};

// 删除用户
export const removeUser = params => {
  return axios.get(`${base}/userManager/remove`, {params: params});
};
// 批量删除用户
export const batchRemoveUser = params => {
  return axios.get(`${base}/userManager/batchremove`, {params: params});
};
// 编辑用户
export const editUser = params => {
  return axios.get(`${base}/userManager/edit`, {params: params});
};
// 添加用户
export const addUser = params => {
  return axios.get(`${base}/userManager/add`, {params: params});
};
// 创建训练营
export const createTrainCamp = params => {
  return axios.get(`${base}/addTrainCamp/add`, {params: params});
};

// 获取训练营列表
export const getTrainCampList = params => {
  return axios.get(`${base}/getTrainCampList/list`, {params: params});
};

// 编辑训练营列表
export const editTrainCamp = params => {
  return axios.get(`${base}/editTrainCamp/edit`, {params: params});
};

// 删除训练营列表
export const delTrainCamp = params => {
  return axios.get(`${base}/delTrainCamp/del`, {params: params});
};

// 学生信息
export const getStudentInfo = params => {
  return axios.get(`${base}/studentInfo/info`, {params: params});
};


// 学生详细信息
export const getStudentInfoD = params => {
  return axios.get(`${base}/studentDInfo/info`, {params: params});
};

// 修改座位信息
export const modifyStudentInfo = params => {
  return axios.get(`${base}/modifyStudentInfo/modifyInfo`, {params: params});
};


// 删除座位信息
export const delStudentInfo = params => {
  return axios.get(`${base}/delStudentInfo/delInfo`, {params: params});
};

//添加订座
export const addStudentInfo = params => {
  return axios.get(`${base}/addStudentInfo/addInfo`, {params: params});
};

//设置用户信息
export const settingUser = params => {
  return axios.get(`${base}/setting/set`, {params: params});
};

