<template>
  <div class="incomeList">
    <div v-loading="incomeList">
      <el-input v-model="tableDataName" placeholder="请输入" style="width:200px" />
      <el-date-picker
        v-model="data"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions2"
        @change="choosedata"
      />
      <el-button type="primary" @click="search">搜索</el-button>
      <br />
      <!-- <el-button type="primary" @click="apply()">银行卡管理</el-button>
      <el-button type="primary" :disabled="disabledInput" @click="tx()">提现</el-button> -->
      <div v-show="all" class="numberItem">
        <span>全职 </span><span> 总G币:</span><span> {{ money }} 个</span>
        <span style="margin-left:10px"> 总OTG币:</span><span> {{ otherMoney }} 个</span>
      </div>
      <div v-show="!all" class="numberItem">
        <span>兼职 </span><span> 历史收入G:</span><span> {{ money }} 个</span>
        <span style="margin-left:10px"> 余额G:</span><span> {{ otherMoneys }} 个</span>
      </div>
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
        <el-table-column label="订单号" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span
              style="color:#409EFF;cursor: pointer;"
              @click="see(scope.row,scope.$index)"
            >{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="订单类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.spoType===0">定制辅导</span>
            <span v-if="scope.row.spoType===1">考前突击</span>
            <span v-if="scope.row.spoType===2">包课辅导 </span>
            <span v-if="scope.row.spoType===4">论文辅导</span>
            <span v-if="scope.row.spoType===32">特殊订单</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.courseName }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="课堂名称" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.roomName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收入类型" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.type===4">课程收入</span>
            <span v-if="scope.row.type===8">大礼包收入</span>
            <span v-if="scope.row.type===16">评价奖励 </span>
            <span v-if="scope.row.type===32">赠送收入</span>
            <span v-if="scope.row.type===64">工资扣除</span>
            <span v-if="scope.row.type===128">讲师预付收入</span>
            <span v-if="scope.row.type===256">系统返还</span>
          </template>
        </el-table-column>
        <el-table-column label="课程类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.classroomId===&quot;&quot;">课程</span>
            <span v-if="scope.row.classroomId!==&quot;&quot;">课堂</span>
          </template>
        </el-table-column>
        <el-table-column label="所获G币" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所获OTG币" :show-overflow-tooltip="true" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.otherMoney }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
                <template slot-scope="scope">

                </template>
            </el-table-column>  -->
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
          <el-table-column label="开户行" width="80">
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
          <el-button type="primary" @click="add()">添加银行卡</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="txmodal" width="50%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px" class="demo-ruleForm">
          <el-form-item label="请输入G币" prop="price1">
            <el-input v-model="ruleForm.price1" style="width:220px" :disabled="true" />
          </el-form-item>
          <el-form-item v-show="otgb" label="请输入OTG币" prop="price2">
            <el-input v-model="ruleForm.price2" style="width:220px" :disabled="true" />
          </el-form-item>
          <el-form-item label="计算" prop="prices">
            <el-input v-model="ruleForm.prices" style="width:80px" :disabled="true" />
            <el-button>CNY</el-button>
            <!-- <el-button type="primary" @click="jx">确 定</el-button> -->
          </el-form-item>
          <el-form-item label="选择银行卡" prop="card">
            <el-select v-model="ruleForm.card" placeholder="请选择银行卡">
              <el-option v-for="item in cards" :key="item.id" :label="item.bankName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="submitFormLoading"
            :disabled="submitFormLoading"
            @click="fangyu('ruleForm')"
          >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="cardmodal" width="50%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item label="银行名称" prop="bankName">
                    <el-input v-model="ruleForm.bankName"></el-input>
                </el-form-item> -->
          <el-form-item label="持卡人" prop="userName">
            <!-- <el-input v-model="ruleForm.userName"></el-input> -->
            <span> {{ username }}</span>
          </el-form-item>
          <el-form-item label="银行卡号" prop="accountNumber">
            <el-input v-model="ruleForm.accountNumber" />
          </el-form-item>
          <el-form-item label="身份证号" prop="userIdCard">
            <el-input v-model="ruleForm.userIdCard" />
          </el-form-item>

          <el-form-item label="预留手机号" prop="phone">
            <el-input v-model="ruleForm.phone" />
          </el-form-item>
          <el-form-item label="开户支行" prop="bankOfDeposit">
            <el-popover placement="top-start" width="50" trigger="hover" content="请确认开户支行名称正确，否则将提现失败">
              <a slot="reference" class="el-icon-warning" />
            </el-popover>
            <el-input v-model="ruleForm.bankOfDeposit" />
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
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
            incomeList: false,
            all: true,
            otgb: false,
            teacType: false,
            sss: true,
            cards: '',
            num: '',
            carddata: [],
            tableDataBegin: [],
            tableDataName: '',
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            txmodal: false,
            modal: false,
            cardmodal: false,
            modal_time: false,
            total: 0,
            limit: 15,
            idss: [],
            courseId: '',
            val: 1,
            data: '',
            value: ['', ''],
            disabledInput: true,
            page: '',
            otherMoney: null,
            money: null,
            otherMoneys: null,
            moneys: null,
            finishTimeFrom: '',
            finishTimeTo: '',
            withdrawed: '',
            ruleForm: {
                price1: '',
                price2: '',
                card: '',
                phone: ''
            },
            username: '',
            submitFormLoading: false,
            rules: {
                bankOfDeposit: [{
                    required: true,
                    message: '请输入开户支行',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入预留手机号',
                    trigger: 'blur'
                }],
                // userName: [{
                //     required: true,
                //     message: '请输入开户人',
                //     trigger: 'blur'
                // }],
                accountNumber: [{
                    required: true,
                    message: '请输入银行卡号',
                    trigger: 'blur'
                }],
                userIdCard: [{
                    required: true,
                    message: '请输入身份证号码',
                    trigger: 'blur'
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.Time()
        this.getMonthDays()
        this.getMonthDay()
        this.getTableData()
        this.getcardlist()
        this.getUser()
        this.getgb()
        this.teacinfo()
    },
    methods: {
        search() {
            this.getTableData()
            this.getgb()
        },
        choosedata(value) {
            this.value = value
            this.finishTimeFrom = value[0] + ' 00:00:00'
            this.finishTimeTo = value[1] + ' 23:23:59'
            this.getTableData()
            this.getgb()
        },
        Time(now) {
            const year = new Date(now).getFullYear()
            let month = new Date(now).getMonth() + 1
            let date = new Date(now).getDate()
            if (month < 10) month = '0' + month
            if (date < 10) date = '0' + date
            return year + '-' + month + '-' + date
        },
        getMonthDays(myMonth) {
            const monthStartDate = new Date(new Date().getFullYear(), myMonth, 1)
            const monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1)
            const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
            return days
        },
        getMonthDay(myMonth) {
            var finishTimeFrom = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
            var finishTimeTo = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), this
                .getMonthDays(new Date().getMonth())))
            this.finishTimeFrom = finishTimeFrom + ' 00:00:00'
            this.finishTimeTo = finishTimeTo + ' 23:59:59'
            this.data = [finishTimeFrom, finishTimeTo]
        },
        jx() {
            this.$axios({
                url: this.$api.baseURL + '/api/teacher/account/withdrawConfirm',
                params: {
                    'gb': this.ruleForm.price1,
                    'otgb': this.ruleForm.price2
                }
            }).then(r => {
                if (r.data.status == 200) {
                    this.$refs.ruleForm.model.prices = r.data.body
                    // vm.$message({
                    //     message: r.body.msg,
                    //     type: 'success'
                    // });
                    this.getcardlist()
                }
                if (r.data.status == 400) {
                    this.$message({
                        message: r.data.body.msg,
                        type: 'warning'
                    })
                    this.getcardlist()
                }
            }).catch(er => {

            })
            // $.ajax({
            //     type: 'get',
            //     url: baseURL + '/api/teacher/account/withdrawConfirm',
            //     dataType: 'json',
            //     headers: {
            //         'token': token
            //     },
            //     data: {
            //         'gb': vm.ruleForm.price1,
            //         'otgb': vm.ruleForm.price2
            //     },
            //     success: function(r) {
            //         if (r.status == 200) {
            //             vm.$refs.ruleForm.model.prices = r.body,
            //             // vm.$message({
            //             //     message: r.body.msg,
            //             //     type: 'success'
            //             // });
            //             vm.getcardlist()
            //         }
            //         if (r.status == 400) {
            //             vm.$message({
            //                 message: r.body.msg,
            //                 type: 'warning'
            //             })
            //             vm.getcardlist()
            //         }
            //     }
            // })
        },
        teacinfo() {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/user/getMyInfo'
            }).then(r => {
              if (r.data.status === 400) {
                        if (r.data.body.code === 4011) {
                            this.$router.push({ path: "/login" });
                        }
                    }
                const detail = r.data.body
                if (detail.type == 2) {
                    this.sss = false
                    this.otgb = false
                    this.all = false
                } else {
                    this.sss = true
                    this.otgb = true
                    this.all = true
                }
            }).catch(er => {

            })
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     headers: {
            //         'token': token
            //     },
            //     url: '' + baseURL + 'api/teacher/user/getMyInfo',
            //     success: function(json) {
            //         var detail = json.body
            //         if (detail.type == 2) {
            //             vm.sss = false
            //             vm.otgb = false
            //             vm.all = false
            //         } else {
            //             vm.sss = true
            //             vm.otgb = true
            //             vm.all = true
            //         }
            //     }
            // })
        },
        getTableData: function() {
            this.incomeList = true
            this.$axios({
                url: this.$api.baseURL + '/api/teacher/account/getIncomeList',
                params: {
                    'page': this.val,
                    'limit': this.limit,
                    'key': this.tableDataName,
                    'timeFrom': this.finishTimeFrom,
                    'timeTo': this.finishTimeTo,
                    'withdrawed': 0
                }
            }).then(r => {
                this.incomeList = false
                this.tableDataEnd = r.data.body.list
                this.total = r.data.body.totalCount
                this.pageSize = r.data.body.totalCount
                this.currentPage = r.data.body.currPage
                this.money = r.data.body.totalMoney
                this.otherMoney = r.data.body.totalOtherMoney
            }).catch(er => {
                this.incomeList = false
            })
            // var self = this
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': this.val,
            //         'limit': this.limit,
            //         'key': this.tableDataName,
            //         'timeFrom': this.finishTimeFrom,
            //         'timeTo': this.finishTimeTo,
            //         'withdrawed': 0
            //     },
            //     url: '' + baseURL + '/api/teacher/account/getIncomeList',
            //     success: function(json) {
            //         self.tableDataEnd = json.body.list
            //         self.total = json.body.totalCount
            //         self.pageSize = json.body.totalCount
            //         self.currentPage = json.body.currPage
            //         vm.money = json.body.totalMoney
            //         vm.otherMoney = json.body.totalOtherMoney
            //         loading.close()
            //     }
            // })
        },
        see(row, index) {
            // if (row.scTypeed == 4) {
            //     window.open('seller_detail-wy.html?id=' + row.courseId + '&wyid=' + row.courseName +
            //         '&iswy=true')
            // } else {
            //     window.open('seller_detail.html?id=' + row.courseId + '')
            // }

            // if (row.spoType === 64) {
            //     const Logistics2 = this.$router.resolve({
            //         path: `/bigClassRoom`,
            //         query: { id: row.courseId, parentId: null }
            //     })
            //     window.open(Logistics2.href)
            // } else

            if (row.courseType === 4) {
                const Logistics1 = this.$router.resolve({
                    path: `/sellerDetailWy`,
                    query: { id: row.courseId, wyid: row.offCourseName }
                })
                window.open(Logistics1.href)
            } else {
                const Logistics = this.$router.resolve({
                    path: `/sellerDetail`,
                    query: { id: row.courseId }
                })
                window.open(Logistics.href)
            }
        },
        getUser() {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/user/getMyInfo'
            }).then(r => {
              if (r.data.status === 400) {
                        if (r.data.body.code === 4011) {
                            this.$router.push({ path: "/login" });
                        }
                    }
                this.user = r.data.body
                this.username = r.data.body.username
                var type = r.body.type
                if (type == 1) {
                    this.disabledInput = true
                } else {
                    this.disabledInput = false
                }
            }).catch(er => {

            })
            // $.ajax({
            //     type: 'get',
            //     url: baseURL + 'api/teacher/user/getMyInfo',
            //     dataType: 'json',
            //     headers: {
            //         'token': token
            //     },
            //     success: function(r) {
            //         vm.user = r.body
            //         vm.username = r.body.username
            //         var type = r.body.type
            //         if (type == 1) {
            //             vm.disabledInput = true
            //         } else {
            //             vm.disabledInput = false
            //         }
            //     }
            // })
        },
        getgb() {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/account/findAccountInfo',
                params: {
                    'timeFrom': this.finishTimeFrom,
                    'timeTo': this.finishTimeTo
                }
            }).then(r => {
                this.otherMoneys = Number(r.data.body.money)
                this.ruleForm.price1 = r.data.body.money
                this.ruleForm.price2 = r.data.body.otherMoney
            }).catch(er => {

            })
            // $.ajax({
            //     type: 'get',
            //     url: baseURL + 'api/teacher/account/findAccountInfo',
            //     dataType: 'json',
            //     headers: {
            //         'token': token,
            //         'timeFrom': this.finishTimeFrom,
            //         'timeTo': this.finishTimeTo
            //     },
            //     success: function(r) {
            //         vm.otherMoneys = Number(r.body.money)
            //         vm.ruleForm.price1 = r.body.money
            //         vm.ruleForm.price2 = r.body.otherMoney
            //     }
            // })
        },
        tx() {
            this.txmodal = true
            this.jx()
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
                this.cards = r.data.body.list
            }).catch(er => {

            })
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': 1,
            //         'limit': 1000
            //     },
            //     url: '' + baseURL + 'api/teacher/bankcard/list',
            //     success: function(json) {
            //         vm.carddata = json.body.list
            //         vm.cards = json.body.list
            //     },
            //     error: function(json) {}
            // })
        },
        remove(row, index) {
            const cardid = []
            cardid.push('' + row.id + '')
            this.$confirm('是否解绑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(_ => {
                    this.$axios({
                        url: this.$api.baseURL + 'api/teacher/bankcard/delete',
                        method: 'post',
                        data: JSON.stringify(
                            cardid
                        ),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(r => {
                        if (r.data.status == 200) {
                            this.$message({
                                message: '解绑成功',
                                type: 'success'
                            })
                            this.getcardlist()
                        }
                        if (r.data.status == 400) {
                            this.$message({
                                message: '解绑失败',
                                type: 'warning'
                            })
                            this.getcardlist()
                        }
                    }).catch(er => {

                    })
                    // $.ajax({
                    //     type: 'post',
                    //     contentType: 'application/json',
                    //     headers: {
                    //         'token': token
                    //     },
                    //     data: JSON.stringify(
                    //         cardid
                    //     ),
                    //     url: '' + baseURL + 'api/teacher/bankcard/delete',
                    //     success: function(json) {
                    //         if (json.status == 200) {
                    //             vm.$message({
                    //                 message: '解绑成功',
                    //                 type: 'success'
                    //             })
                    //             vm.getcardlist()
                    //         }
                    //         if (json.status == 400) {
                    //             vm.$message({
                    //                 message: '解绑失败',
                    //                 type: 'warning'
                    //             })
                    //             vm.getcardlist()
                    //         }
                    //     }
                    // })
                })
                .catch(_ => {})
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

        fangyu(row) {
            this.submitFormLoading = true
            this.submitForm1(row)
        },

        submitForm1(formName) {
            // vm.submitFormLoading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        method: 'post',
                        url: this.$api.baseURL + '/api/teacher/account/withdrawToBank',
                        data: {
                            'gb': this.$refs.ruleForm.model.price1,
                            'otgb': this.$refs.ruleForm.model.price2,
                            'cardId': this.$refs.ruleForm.model.card
                        },
                        headers: {
                            'Content-type': 'application/json'
                        }
                    }).then(r => {
                        if (r.data.status == '200') {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                            this.txmodal = false
                            this.getcardlist()
                        }
                        if (r.data.status == '400') {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                        }
                        this.submitFormLoading = false
                    })
                    // $.ajax({
                    //     type: 'post',
                    //     dataType: 'json',
                    //     cache: false,
                    //     // contentType: "application/json",
                    //     headers: {
                    //         'token': token
                    //     },
                    //     data: {
                    //         'gb': this.$refs.ruleForm.model.price1,
                    //         'otgb': this.$refs.ruleForm.model.price2,
                    //         'cardId': this.$refs.ruleForm.model.card
                    //     },
                    //     url: '' + baseURL + '/api/teacher/account/withdrawToBank',
                    //     success: function(json) {
                    //         if (json.status == '200') {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'success'
                    //             })
                    //             vm.txmodal = false
                    //             vm.getcardlist()
                    //         }
                    //         if (json.status == '400') {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'warning'
                    //             })
                    //         }
                    //         _this.submitFormLoading = false
                    //     }
                    // })
                }
            })
        },
        submitForm(formName) {
            // const datas = this.ruleForm
            // const course_data = datas.course_data
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        url: this.$api.baseURL + 'api/teacher/bankcard/save',
                        data: JSON.stringify({
                            // "teacId": vm.teacId,
                            'userName': this.username,
                            'idCardNo': this.$refs.ruleForm.model.userIdCard,
                            'reservedPhone': this.$refs.ruleForm.model
                                .phone,
                            'bankOfDeposit': this.$refs.ruleForm.model
                                .bankOfDeposit,
                            'accountNumber': this.$refs.ruleForm.model
                                .accountNumber
                            // "bankName": this.$refs.ruleForm.model.bankName,
                        }),
                        headers: {
                            'Content-type': 'application/json'
                        },
                        method: 'post'
                    }).then(r => {
                        if (r.data.status == '200') {
                            this.$message({
                                message: '添加银行卡成功',
                                type: 'success'
                            })
                            this.cardmodal = false
                            this.getcardlist()
                        }
                        if (r.data.status == '400') {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                        }
                    }).catch(er => {

                    })
                    // $.ajax({
                    //     type: 'post',
                    //     dataType: 'json',
                    //     cache: false,
                    //     contentType: 'application/json',
                    //     headers: {
                    //         'token': token
                    //     },
                    //     data: JSON.stringify({
                    //         // "teacId": vm.teacId,
                    //         'userName': this.username,
                    //         'idCardNo': this.$refs.ruleForm.model.userIdCard,
                    //         'reservedPhone': this.$refs.ruleForm.model
                    //             .phone,
                    //         'bankOfDeposit': this.$refs.ruleForm.model
                    //             .bankOfDeposit,
                    //         'accountNumber': this.$refs.ruleForm.model
                    //             .accountNumber
                    //         // "bankName": this.$refs.ruleForm.model.bankName,
                    //     }),
                    //     url: '' + baseURL + 'api/teacher/bankcard/save',
                    //     success: function(json) {
                    //         if (json.status == '200') {
                    //             vm.$message({
                    //                 message: '添加银行卡成功',
                    //                 type: 'success'
                    //             })
                    //             vm.cardmodal = false
                    //             vm.getcardlist()
                    //         }
                    //         if (json.status == '400') {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'warning'
                    //             })
                    //         }
                    //     }
                    // })
                }
            })
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
.incomeList{
    padding:10px;
    margin-top: 50px;
}
.numberItem{
  margin:15px 0;
  border:1px solid #606266;
  padding:15px 20px;
  border-radius: 5px;
  display:inline-block;
  color:#606266;
  height:50px;
  line-height: 22spx;
}
</style>
