<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";
  @import "../assets/css/userManager";

  .userManager-c {
    margin: 0 100px;
  }

  .btn-list {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
</style>

<template>
  <section class="userManager-c">
    <head-top></head-top>
    <!--工具条-->
    <el-col :span="24" class="toolbar search-bar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item class="fl">
          <el-input v-model="filters.name" placeholder="姓名" class="ml10" size="small"></el-input>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary" v-on:click="getUsers" size="small"><i class="el-icon-search "></i>查询</el-button>
        </el-form-item>
        <div class="btn-list">
          <el-button type="primary" @click="handleAdd" size="small"><i class="el-icon-plus "></i>新增</el-button>
          <el-button type="primary" size="small" @click="exportAll"><i class="el-icon-download "></i>导出全部</el-button>
          <el-button type="primary" size="small" @click="exportCurrent"><i class="el-icon-download "></i>导出当前页
          </el-button>
          <el-button type="primary" size="small" @click="exportZip"><i class="el-icon-download "></i>导出zip</el-button>
          <el-button type="primary" size="small"><i class="el-icon-upload2 "></i>导入</el-button>
          <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" size="small"><i
            class="el-icon-delete "></i>批量删除
          </el-button>
        </div>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users"
              highlight-current-row
              v-loading="listLoading"
              @selection-change="selsChange"
              style="width: 100%;"
              size="mini">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column type="index" prop="id" label="编号">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="professional" label="专业" sortable>
      </el-table-column>
      <el-table-column prop="department" label="部门" sortable>
      </el-table-column>
      <el-table-column prop="job" label="职位" sortable>
      </el-table-column>
      <el-table-column prop="time" label="入职时间" sortable>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="电话" :formatter="formatPhone" sortable width="140">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑" placement="left">
              <el-button type="primary" class="btn-action" size="small" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="right">
              <el-button type="danger" class="btn-action" size="small" @click="handleDel(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    </el-table>

    <!--分页-->
    <div class="page clearfix">
      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          :total="total"
          :page-sizes="[10]"
          style="float:right;">
        </el-pagination>
      </el-col>
    </div>

    <!--编辑dialog-->
    <el-dialog
      title="编辑"
      :visible.sync="editUser"
      width="30%">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="专业">
          <el-input size="small" v-model="editForm.professional"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input size="small" v-model="editForm.department"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input size="small" type="text" v-model="editForm.job"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker size="small" type="date" placeholder="选择日期" v-model="editForm.time"
                          class="pct100"></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input size="small" type="text" v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input size="small" type="phone" v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
      </div>
    </el-dialog>

    <!--新增dialog-->
    <el-dialog
      title="新增"
      :visible.sync="addUser"
      width="30%">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input size="small" v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="专业">
          <el-input size="small" v-model="addForm.professional"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input size="small" v-model="addForm.department"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input size="small" type="text" v-model="addForm.job"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker size="small" type="date" placeholder="选择日期" v-model="addForm.time"
                          class="pct100"></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input size="small" type="text" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input size="small" type="phone" v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading" size="small">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '@/common/js/util'
  import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '@/api/api';
  import headTop from '@/components/header'
  export default {
    data() {
      return {
        addUser: false,
        editUser: false,
        isLoading: false,
        //每页显示条目个数
        pagesize: 10,
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        userList: [],
        listLoading: false,
        sels: [],//列表选中列

        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          professional: '',
          department: '',
          job: '',
          time: '',
          email: '',
          phone: ''
        },

        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          professional: '',
          department: '',
          job: '',
          time: '',
          email: '',
          phone: ''
        }
      }
    },
    components: {
      headTop,
    },
    methods: {

      //导出zip
      exportZip(){
        require.ensure([], () => {
          const {export_txt_to_zip} = require('vendor/Export2Zip');
          const tHeader = ['编号', '姓名', '性别', '专业', '部门', '职位', '入职时间', '邮箱', '电话'];
          const filterVal = ['id', 'name', 'sex', 'professional', 'department', 'job', 'time', 'email', 'phone'];
          const list = this.userList;
          const data = this.formatJson(filterVal, list);
          export_txt_to_zip(tHeader, data, '列表文本', '压缩文本')
        })
      },
      //导出当前页
      exportCurrent() {
        require.ensure([], () => {
          const {export_json_to_excel} = require('vendor/Export2Excel');
          const tHeader = ['编号', '姓名', '性别', '专业', '部门', '职位', '入职时间', '邮箱', '电话'];
          const filterVal = ['id', 'name', 'sex', 'professional', 'department', 'job', 'time', 'email', 'phone'];
          const list = this.users;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '用户列表');
        })
      },
      //导出全部
      exportAll() {
        require.ensure([], () => {
          const {export_json_to_excel} = require('vendor/Export2Excel');
          const tHeader = ['编号', '姓名', '性别', '专业', '部门', '职位', '入职时间', '邮箱', '电话'];
          const filterVal = ['id', 'name', 'sex', 'professional', 'department', 'job', 'time', 'email', 'phone'];
          const list = this.userList;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '用户列表');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //性别显示转换
      formatSex (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },

      //手机号中间4位转为****
      formatPhone (row, column) {
        return row.phone.substring(0, 3) + "****" + row.phone.substring(7);
      },
      //当前页改变时触发
      handleCurrentChange(val) {
        this.page = val;
//        获取用户列表
        this.getUsers();
      },
      //获取用户列表
      getUsers() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        this.listLoading = true;
        getUserListPage(para).then((res) => {
          this.total = res.data.total;
          //当前页的用户
          this.users = res.data.users;
          //所有用户
          this.userList = res.data.userList;
          this.listLoading = false;
        });
      },
      //删除
      handleDel (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = {id: row.id};
          removeUser(para).then((res) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {
        });
      },
      //显示编辑界面
      handleEdit (index, row) {
        this.editUser = true;
        this.editForm = Object.assign({}, row);
      },

      //显示新增界面
      handleAdd () {
        this.addUser = true;
        this.addForm = {
          name: '',
          sex: -1,
          professional: '',
          department: '',
          job: '',
          time: '',
          email: '',
          phone: ''
        };
      },
      //编辑
      editSubmit () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              let para = Object.assign({}, this.editForm);
              para.time = (!para.time || para.time == '') ? '' : util.formatDate.format(new Date(para.time), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editUser = false;
                this.getUsers();
              });
            });
          }
        });
      },

      //新增
      addSubmit () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              let para = Object.assign({}, this.addForm);
              para.time = (!para.time || para.time == '') ? '' : util.formatDate.format(new Date(para.time), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;
                this.$message({
                  message: '提交成功',
                  type: 'success',
                });
                this.$refs['addForm'].resetFields();
                //提交成功后弹出框关闭
                this.addUser = false;
                this.getUsers();
              });
            });
          }
        });
      },
      //sels选中的列表
      selsChange (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove () {
        //ids 选中的列表的id
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = {ids: ids};
          //发送请求
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
             //删除后重新获取用户列表
            this.getUsers();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getUsers();
      this.isLoading = true;
    }
  }
</script>
