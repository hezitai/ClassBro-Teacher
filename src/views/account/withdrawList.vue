<template>
  <div class="withdrawList">
    <div v-loading="withdrawList">
      <!-- <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px" />
      <el-button type="primary" @click="search">搜索</el-button> -->
      <!-- <el-button type="primary" @click="apply()">银行卡管理</el-button> -->
      <el-table
        ref="multipleTable"
        :data="tableDataEnd"
        border
        style="width: 100%;margin-top:5px;"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column
            type="selection"
            width="50">
          </el-table-column> -->
        <el-table-column label="工资单（月）" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createAt | getMonth(scope.row.createAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行名称" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bankName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行卡号" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.accountNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="税前金额" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tutorPay * 1 + scope.row.customPay * 1 }} 元</span>
          </template>
        </el-table-column>
        <el-table-column label="税后金额" width="160" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.tutorPay * 1 +  scope.row.customPay * 1 - scope.row.taxPay * 1}} 元</span>
          </template>
        </el-table-column>
        <el-table-column label="提现状态" width="160" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.withdrawed===1">确认并提现</span>
            <span v-if="scope.row.withdrawed===2">已确认</span>
            <span v-if="scope.row.withdrawed===4">财务已打款</span>
            <span v-if="scope.row.withdrawed===8">重新提现</span>
          </template>
        </el-table-column>
        <!-- <button v-if='info.withdrawed == 8' @click='submit'>
                    重新提现
                </button>
                <button v-if='info.withdrawed == 1' @click='submit'>
                    确认并提现
                </button>
                <button v-if='info.withdrawed == 2' style="background:#faaa96;">
                    已确认
                </button>
                <button v-if='info.withdrawed == 4' style="background:#faaa96;">
                    财务已打款
                </button> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="seemodel(scope.row,scope.$index)">查看工资单</el-button>
            <el-button size="mini" @click="objection(scope.row,scope.$index)">异议申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹框 -->
      <el-dialog :visible.sync="modal" width="50%">
        <el-table
          ref="multipleTable"
          :data="carddata"
          border
          style="width: 100%;margin-top:5px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="id" width="40">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="银行名称" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.bankName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="持卡人" width="70">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开户支行" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.bankOfDeposit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="银行卡号" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.accountNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="remove(scope.row,scope.$index)">解绑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="add()">添加银行卡</el-button> -->
        </span>
      </el-dialog>

      <el-dialog :visible.sync="cardmodal" width="50%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="银行名称" prop="bankName">
            <el-input v-model="ruleForm.bankName" />
          </el-form-item>
          <el-form-item label="开户支行" prop="bankOfDeposit">
            <el-input v-model="ruleForm.bankOfDeposit" />
          </el-form-item>
          <el-form-item label="持卡人" prop="userName">
            <el-input v-model="ruleForm.userName" />
          </el-form-item>
          <el-form-item label="银行卡号" prop="accountNumber">
            <el-input v-model="ruleForm.accountNumber" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        style="margin-top:15px"
        :current-page="currentPage"
        :page-sizes="[15,20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-dialog :visible.sync="modals" width="65%">
        <el-table
          ref="multipleTable"
          :data="carddatas"
          border
          style="width: 100%;margin-top:5px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="订单号" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.orderNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收入类型" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.type===4">正常课程收入</span>
              <span v-if="scope.row.type===8">大礼包收入</span>
              <span v-if="scope.row.type===16">奖励收入 </span>
              <span v-if="scope.row.type===32">赠送收入</span>
              <span v-if="scope.row.type===64">工资扣除</span>
            </template>
          </el-table-column>
          <el-table-column label="课程类型" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.classroomId===&quot;&quot;">课程</span>
              <span v-if="scope.row.classroomId!==&quot;&quot;">课堂</span>
            </template>
          </el-table-column>
          <el-table-column label="所获G币" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所获OTG币" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.otherMoney }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top:15px"
          :current-page="currentPages"
          :page-sizes="[5]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange1"
        />
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            withdrawList: false,
            modals: false,
            carddata: [],
            carddatas: [],
            tableDataBegin: [],
            tableDataName: '',
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            modal: false,
            cardmodal: false,
            modal_time: false,
            total: 0,
            limit: 15,
            currentPages: 0,
            pageSizes: 0,
            totals: 0,
            idss: [],
            courseId: '',
            val: 1,
            vals: 1,
            page: '',
            ruleForm: {},
            rules: {
                bankName: [{
                    required: true,
                    message: '请输入课程标题',
                    trigger: 'blur'
                }],
                bankOfDeposit: [{
                    required: true,
                    message: '请输入课程时间',
                    trigger: 'blur'
                }],
                userName: [{
                    required: true,
                    message: '请输入课程描述',
                    trigger: 'blur'
                }],
                accountNumber: [{
                    required: true,
                    message: '请输入课程描述',
                    trigger: 'blur'
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData()
        this.getcardlist()
    },
    filters:{
      getMonth(data){
        return data.split(' ')[0].split('-')[0] + '年' +  data.split(' ')[0].split('-')[1] + '月'
      }
    },
    methods: {
        search() {
            this.getTableData()
        },
        getTableData: function() {
            this.withdrawList = true
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/account/payrollList',
                params: {
                    'page': this.val,
                    'limit': this.limit,
                    // 'type': 1,
                    // 'key': this.tableDataName
                }
            }).then(r => {
                this.withdrawList = false
                this.tableDataEnd = r.data.body.list
                this.total = r.data.body.totalCount
                this.pageSize = r.data.body.totalCount
                this.currentPage = r.data.body.currPage
            }).catch(er => {
                this.withdrawList = false
            })
        },
        getUser() {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/user/getMyInfo'
            }).then(r => {
              if (r.status === 400) {
                        if (r.body.code === 4011) {
                            this.$router.push({ path: "/login" });
                        }
                    }
                this.user = r.body
            })
        },
        objection(row, index){
          this.$message({
            type:'success',
            message:'已发送异议申请，请耐心等待师资管理审核'
          })
        },
        seemodel(row, index) {
            window.open(this.$api.baseURL + "/appweb/wageList.html?id=" + row.id + "&token=" + window.localStorage.getItem('teactoken'));
            // this.modals = true
            // if (row.withdrawedIds == '') {
            //     this.logIds = 0
            // } else {
            //     this.logIds = row.withdrawedIds
            // }
            // this.getcardlists()
        },
        getcardlists() {
            // var self = this
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': this.vals,
            //         'limit': 5,
            //         'logIds': vm.logIds,
            //         'withdrawed': 1
            //     },
            //     url: '' + baseURL + '/api/teacher/account/getIncomeList',
            //     success: function(json) {
            //         vm.carddatas = json.body.list
            //         vm.cards = json.body.list
            //         vm.totals = json.body.totalCount
            //         vm.pageSizes = json.body.totalCount
            //         vm.currentPages = json.body.currPage
            //     }
            // })
        },
        apply(row, index) {
            this.modal = true
        },
        add() {
            this.cardmodal = true
        },
        getcardlist() {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/bankcard/list',
                params: {
                    'page': 1,
                    'limit': 1000
                }
            }).then(r => {
                this.carddata = r.data.body.list
            })
        },
        remove(row, index) {
            // const cardid = []
            // cardid.push('' + row.id + '')
            // this.$confirm('是否解绑?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // })
            //     .then(_ => {
            //         $.ajax({
            //             type: 'post',
            //             contentType: 'application/json',
            //             headers: {
            //                 'token': token
            //             },
            //             data: JSON.stringify(
            //                 cardid
            //             ),
            //             url: '' + baseURL + 'api/teacher/bankcard/delete',
            //             success: function(json) {
            //                 if (json.status == 200) {
            //                     vm.$message({
            //                         message: '解绑成功',
            //                         type: 'success'
            //                     })
            //                     vm.getcardlist()
            //                 }
            //                 if (json.status == 400) {
            //                     vm.$message({
            //                         message: '解绑失败',
            //                         type: 'warning'
            //                     })
            //                     vm.getcardlist()
            //                 }
            //             }
            //         })
            //     })
            //     .catch(_ => {})
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.limit = val
            this.getTableData()
        },

        handleChangearea(val) {
            let obj = {}
            obj = this.selects.find((item) => {
                return item.userId === val
            })
            this.userId = obj.userId
            this.username = obj.username
        },
        handleCurrentChange(val) {
            this.val = val
            this.getTableData()
        },
        handleCurrentChange1(val) {
            this.vals = val
            this.getcardlists()
        },
        submitForm(formName) {
            // const _this = this
            // var datas = _this.ruleForm
            // var course_data = datas.course_data
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         $.ajax({
            //             type: 'post',
            //             dataType: 'json',
            //             cache: false,
            //             contentType: 'application/json',
            //             headers: {
            //                 'token': token
            //             },
            //             data: JSON.stringify({
            //                 'teacId': vm.teacId,
            //                 'userName': this.$refs.ruleForm.model.userName,
            //                 'bankOfDeposit': this.$refs.ruleForm.model.bankOfDeposit,
            //                 'accountNumber': this.$refs.ruleForm.model.accountNumber,
            //                 'bankName': this.$refs.ruleForm.model.bankName
            //             }),
            //             url: '' + baseURL + 'api/teacher/bankcard/save',
            //             success: function(json) {
            //                 if (json.status == '200') {
            //                     vm.$message({
            //                         message: '添加银行卡成功',
            //                         type: 'success'
            //                     })
            //                     vm.cardmodal = false
            //                     vm.getcardlist()
            //                 }
            //                 if (json.status == '400') {
            //                     vm.$message({
            //                         message: json.body.msg,
            //                         type: 'warning'
            //                     })
            //                     vm.cardmodal = false
            //                 }
            //             }
            //         })
            //     }
            // })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            const ids = []
            this.multipleSelection.map((item) => {
                var id = item.id
                ids.push('' + id + '')
            })
            this.selectedIDs = ids
            console.log('多选', ids)
            this.idss = this.selectedIDs
            console.log(this.idss)
        }
    }
}
</script>
<style scoped>
.withdrawList{
    padding:10px;
    margin-top: 50px;
}
</style>
