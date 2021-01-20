<template>
    <div class="onCourse">
        <div v-loading="onCourseLoading">
            <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px" />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-table ref="multipleTable" :data="tableDataEnd" border style="width: 100%;margin-top:5px;" @selection-change="handleSelectionChange">
                <el-table-column label="订单号">
                    <template slot-scope="scope">
                        <span v-if="scope.row.spoType ==64"><img style="width:15px" src="images/bigC.png"></span>
                        <span v-if="scope.row.parentId !==null&&scope.row.spoType !==64"><img style="width:15px" src="images/ss.svg"></span>
                        <span style="color:#409EFF;cursor: pointer;" @click="sees(scope.row,scope.$index)">{{ scope.row.orderNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="课堂名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="课堂说明" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="上课时间" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="课堂状态" width="160" align='center'>
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.statused===1" type="success">待确认课堂</el-tag>
                        <el-tag v-if="scope.row.statused===2" type="danger">已确认</el-tag>
                        <el-tag v-if="scope.row.statused===4" type="warning">正在上课</el-tag>
                        <el-tag v-if="scope.row.statused===8" type="info">已结束</el-tag>
                        <el-tag v-if="scope.row.statused===16">已取消</el-tag>
                        <el-tag v-if="scope.row.statused===32">取消排课中</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <!-- <template slot-scope="scope">
              <el-button size="mini" v-if='scope.row.statused===1' @click="apply(scope.row,scope.$index)">编辑课堂</el-button>
              <el-button size="mini" @click="cancel(scope.row,scope.$index)" v-if='scope.row.spoType!==64'>取消排课</el-button>
              <el-button size="mini" disabled v-if='scope.row.spoType===64'>取消排课</el-button>
              <el-button size="mini" v-if='scope.row.statused===16||scope.row.statused===2||scope.row.statused===4||scope.row.statused===8||scope.row.statused===32' disabled @click="end_classroom(scope.row,scope.$index)">编辑课堂</el-button>
              <el-button size="mini" v-if='scope.row.statused===4||scope.row.statused===2||scope.row.statused===32' @click="in_classroom(scope.row,scope.$index)">进入课堂</el-button>
              <el-button size="mini" v-if='scope.row.statused===8||scope.row.statused===16||scope.row.statused===1' disabled>进入课堂</el-button>
              <el-button size="mini" v-if='scope.row.statused===8||scope.row.statused===16||scope.row.statused===1' disabled>结束课堂</el-button>
              <el-button size="mini" v-if='scope.row.statused===4||scope.row.statused===2||scope.row.statused===32' @click="end_classroom(scope.row,scope.$index)">结束课堂</el-button>
              <el-button size="mini" v-if='(scope.row.statused===4||scope.row.statused===2||scope.row.statused===32)&&scope.row.spoType!==64' @click="get_studjoinurl(scope.row,scope.$index)">学生地址</el-button>
              <el-button size="mini" v-if='(scope.row.statused===8||scope.row.statused===16||scope.row.statused===1)||scope.row.spoType==64' disabled>学生地址</el-button>
              </template>   -->
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link" style="cursor: pointer;color: #409EFF;">
                                下拉操作<i class="el-icon-arrow-down el-icon--right" />
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="scope.row.statused===1" @click.native="apply(scope.row,scope.$index)">编辑课堂</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.statused===16||scope.row.statused===2||scope.row.statused===4||scope.row.statused===8||scope.row.statused===32" disabled>编辑课堂</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.spoType!==64 && scope.row.statused!==2" @click.native="cancel(scope.row,scope.$index)">取消排课</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.spoType===64&& scope.row.statused===2" disabled>取消排课</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.statused===4||scope.row.statused===2||scope.row.statused===32" @click.native="in_classroom(scope.row,scope.$index)">进入课堂</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.statused===8||scope.row.statused===16||scope.row.statused===1" disabled>
                                    进入课堂</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.statused===8||scope.row.statused===16||scope.row.statused===1" disabled>
                                    结束课堂</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.statused===4||scope.row.statused===2||scope.row.statused===32" @click.native="end_classroom(scope.row,scope.$index)">结束课堂</el-dropdown-item>
                                <!-- <el-dropdown-item v-if='(scope.row.statused===4||scope.row.statused===2||scope.row.statused===32)&&scope.row.spoType!==64' @click.native="get_studjoinurl(scope.row,scope.$index)">学生地址</el-dropdown-item>
                    <el-dropdown-item v-if='(scope.row.statused===8||scope.row.statused===16||scope.row.statused===1)||scope.row.spoType==64' disabled>学生地址</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 弹框 -->
            <el-dialog :visible.sync="modal" width="50%">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="课程名称" prop="title">
                        <el-input v-model="ruleForm.title" />
                    </el-form-item>
                    <el-form-item label="排课时间" prop="course_time">
                        <el-date-picker v-model="ruleForm.course_time" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
                    </el-form-item>
                    <el-form-item label="课程描述" prop="description">
                        <el-input v-model="ruleForm.description" />
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>

            <el-pagination style="margin-top:15px" :current-page="currentPage" :page-sizes="[15,20]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>

    </div>
</template>
<script>
import { getLocal } from '@/utils/auth'
export default {
    data() {
        return {
            onCourseLoading: false,
            browser: '',
            tableDataBegin: [],
            tableDataName: '',
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            modal: false,
            modal_time: false,
            total: 0,
            limit: 15,
            idss: [],
            courseId: '',
            val: 1,
            page: '',
            startTime: '',
            endTime: '',
            tk: '',
            ruleForm: {
                title: '',
                course_time: '',
                description: ''
            },
            rules: {
                title: [{
                    required: true,
                    message: '请填写课程标题',
                    trigger: 'blur'
                }],
                course_time: [{
                    required: true,
                    message: '请选择排课时间',
                    trigger: 'change'
                }],
                description: [{
                    required: true,
                    message: '请填写课程详情',
                    trigger: 'blur'
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData()
    },
    methods: {
        search: function () {
            this.getTableData()
        },
        getTableData: function () {
            this.onCourseLoading = true
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/classRoom/list',
                params: {
                    'page': this.val,
                    'limit': this.limit,
                    'statusedArr': '1;2;4;32',
                    'key': this.tableDataName
                }
            }).then(r => {
                this.onCourseLoading = false
                this.tableDataEnd = r.data.body.list
                this.total = r.data.body.totalCount
                this.pageSize = r.data.body.totalCount
                this.currentPage = r.data.body.currPage
            }).catch(r => {
                this.onCourseLoading = false
            })
            // var self = this
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': this.val,
            //         'limit': this.limit,
            //         'statusedArr': '1;2;4;32',
            //         'key': this.tableDataName
            //     },
            //     url: '' + baseURL + 'api/teacher/classRoom/list',
            //     success: function(json) {
            //         self.tableDataEnd = json.body.list
            //         self.total = json.body.totalCount
            //         self.pageSize = json.body.totalCount
            //         self.currentPage = json.body.currPage
            //     }
            // })
        },
        apply(row, index) {
            this.modal = true
            this.ruleForm = this.$refs.formName
            this.courseId = row.id
            this.cdId = row.cdId
            this.startTime = row.startTime
            this.endTime = row.endTime
            this.description = row.description
            this.time = [row.startTime, row.endTime]
            this.ruleForm = {
                title: row.name,
                description: row.description,
                course_time: [row.startTime, row.endTime]
            }
        },
        cancel(row, index) {
            this.$confirm('是否要取消排课?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(_ => {
                    this.$axios({
                        url: this.$api.baseURL + 'api/teacher/order/cancelClassroom',
                        method: 'post',
                        data: {
                            'classroomId': row.id
                        }
                    }).then(r => {
                        if (r.data.status == 200) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                            this.getTableData()
                        }
                        if (r.data.status == 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                            this.getTableData()
                        }
                    }).catch(er => {

                    })
                    // $.ajax({
                    //     type: 'post',
                    //     dataType: 'json',
                    //     data: {
                    //         'token': token,
                    //         'classroomId': row.id
                    //     },
                    //     url: '' + baseURL + 'api/teacher/order/cancelClassroom',
                    //     success: function(json) {
                    //         if (json.status == 200) {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'success'
                    //             })
                    //             vm.getTableData()
                    //         }
                    //         if (json.status == 400) {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'warning'
                    //             })
                    //             vm.getTableData()
                    //         }
                    //     }
                    // })
                })
                .catch(_ => { })
        },
        sees(row, index) {
            // if (row.spoType == 64) {
            //     window.open('bigClassroomInfo.html?id=' + row.cdId + '')
            // } else if (row.scTypeed == 4) {
            //     window.open('seller_detail-wy.html?id=' + row.cdId + '&wyid=' + row.offCourseName + '&iswy=true')
            // } else {
            //     window.open('seller_detail.html?id=' + row.cdId + '')
            // }
            if (row.spoType === 64) {
                const Logistics2 = this.$router.resolve({
                    path: `/bigClassRoom`,
                    query: { id: row.cdId, parentId: null }
                })
                window.open(Logistics2.href)
            } else if (row.courseType === 4) {
                const Logistics1 = this.$router.resolve({
                    path: `/sellerDetailWy`,
                    query: { id: row.cdId, wyid: row.offCourseName }
                })
                window.open(Logistics1.href)
            } else {
                const Logistics = this.$router.resolve({
                    path: `/sellerDetail`,
                    query: { id: row.cdId }
                })
                window.open(Logistics.href)
            }
        },
        get_studjoinurl(row, index) {
            alert(row.studentJoinUrl)
        },
        // compile(code) {
        //     var code = getLocal('teactoken')
        //     var c = String.fromCharCode(code.charCodeAt(0) + code.length)
        //     for (var i = 1; i < code.length; i++) {
        //         c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
        //     }
        //     this.tk = escape(c)
        // },
        in_classroom(row, index) {
            var code = window.localStorage.getItem('teactoken')
            var c = String.fromCharCode(code.charCodeAt(0) + code.length)
            for (var i = 1; i < code.length; i++) {
                c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
            }
            var tk = escape(c)
            window.open(this.$api.url + 'static-resource/tkcloud/giveLessons.html?classroomId=' + row.id +
                '&iden=teac&tk=' + tk + '')
            // var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            //     var isFirefox = typeof InstallTrigger !== 'undefined';
            //     var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
            //     var isIE = /*@cc_on!@*/false || !!document.documentMode;
            //     var isEdge = !isIE && !!window.StyleMedia;
            //     var isChrome = !!window.chrome && !!window.chrome.webstore;
            //     var isBlink = (isChrome || isOpera) && !!window.CSS;
            //     console.log(isChrome);
            //     if(isChrome == true){
            //       window.open(row.teacherJoinUrl);
            //     }else{
            //       alert("您当前使用的不是谷歌浏览器,点击下载浏览器")
            //       window.open("https://sm.myapp.com/original/Browser/70.0.3538.67_chrome_installer_x64.exe");
            //     }
        },
        submitForm(formName) {
            // var self = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        url: this.$api.baseURL + '/api/teacher/order/updateClassroom',
                        data: JSON.stringify({
                            id: this.courseId,
                            name: this.$refs.ruleForm.model.title,
                            cdId: this.cdId,
                            startTime: this.$refs.ruleForm.model.course_time[0],
                            endTime: this.$refs.ruleForm.model.course_time[1],
                            description: this.$refs.ruleForm.model.description
                        }),
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(r => {
                        if (r.data.status == 200) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                            this.modal = false
                            this.getTableData()
                        }
                        if (r.data.status == 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                            this.modal = false
                            this.getTableData()
                        }
                    }).catch(er => {

                    })
                    // $.ajax({
                    //     type: 'post',
                    //     contentType: 'application/json',
                    //     headers: {
                    //         'token': token
                    //     },
                    //     data: JSON.stringify({
                    //         id: vm.courseId,
                    //         name: this.$refs.ruleForm.model.title,
                    //         cdId: vm.cdId,
                    //         startTime: this.$refs.ruleForm.model.course_time[0],
                    //         endTime: this.$refs.ruleForm.model.course_time[1],
                    //         description: this.$refs.ruleForm.model.description
                    //     }),
                    //     url: '' + baseURL + '/api/teacher/order/updateClassroom',
                    //     success: function(json) {
                    //         if (json.status == 200) {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'success'
                    //             })
                    //             vm.modal = false
                    //             vm.getTableData()
                    //         }
                    //         if (json.status == 400) {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'warning'
                    //             })
                    //             vm.modal = false
                    //             this.getTableData()
                    //         }
                    //     }
                    // })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },

        end_classroom(row, index) {
            this.$confirm('是否要结束课堂?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(_ => {
                    this.$axios({
                        url: this.$api.baseURL + 'api/teacher/order/finishClassroom',
                        method: 'post',
                        data: {
                            'classroomId': row.id
                        }
                    }).then(r => {
                        if (r.data.status == 200) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                            this.getTableData()
                        }
                        if (r.data.status == 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                            this.getTableData()
                        }
                    })
                    // $.ajax({
                    //     type: 'post',
                    //     dataType: 'json',
                    //     data: {
                    //         'token': token,
                    //         'classroomId': row.id
                    //     },
                    //     url: '' + baseURL + 'api/teacher/order/finishClassroom',
                    //     success: function(json) {
                    //         if (json.status == 200) {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'success'
                    //             })
                    //             vm.getTableData()
                    //         }
                    //         if (json.status == 400) {
                    //             vm.$message({
                    //                 message: json.body.msg,
                    //                 type: 'warning'
                    //             })
                    //             vm.getTableData()
                    //         }
                    //     }
                    // })
                })
                .catch(_ => { })
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
.onCourse {
    padding: 10px;
    margin-top: 50px;
}
</style>
