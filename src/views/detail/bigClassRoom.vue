<template>
    <div v-loading="bigClassRoom" class="bigClassRoom">
        <el-dialog :visible.sync="mm1" width="40%">
            <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" label-width="120px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="studname">
                    <el-input v-model="ruleForm1.studname" :disabled="true" />
                </el-form-item>
                <el-form-item label="定金" prop="amount1">
                    <el-input v-model="ruleForm1.amount1" :disabled="true" />
                </el-form-item>
                <el-form-item label="金额" prop="amount">
                    <el-input v-model="ruleForm1.amount" type="number" onkeyup="this.value=this.value.replace(/[^\d.]/g,'').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" />
                </el-form-item>
                <template>
                    <el-radio v-show="radshow" v-model="radio" label="1">订单扣款</el-radio>
                    <el-radio v-model="radio" label="2">余额扣款</el-radio>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="b1" @click="save1('ruleForm1')">{{ b2 }}</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="personmodel" width="60%">
            <el-table :data="persondata" border style="width: 100%;margin-top:5px;background: #e5e9f2;">
                <el-table-column label="学生姓名" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.nickName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="销售名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.classroomName }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top:15px" :current-page="currentPage" :page-sizes="[5]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-dialog>
        <el-dialog :visible.sync="mm" width="40%">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="studname">
                    <el-input v-model="ruleForm.studname" :disabled="true" />
                </el-form-item>
                <el-form-item v-show="s1" label="账单总金额" prop="amount1">
                    <el-input v-model="ruleForm.amount1" :disabled="true" />
                </el-form-item>
                <el-form-item v-show="s2" label="还需充值" prop="amount">
                    <el-input v-model="ruleForm.amount" type="number" />
                </el-form-item>
                <span style="color:red;margin-left:75px"> {{ red }} </span>
                <el-form-item label="转账备注">
                    <el-input v-model="ruleForm.remark" type="textarea" :rows="4" />
                </el-form-item>
                <el-upload ref="upload" class="upload-demo" :headers="myHeaders1" :data="data1" :multiple="true" accept="image/png, image/jpeg" :action="url1" :on-preview="handlePreview1" :on-remove="handleRemove1" :on-success="success1" :http-request="uploadFile1" :on-error="onerror1" :file-list="fileList1" list-type="picture" :on-change="change1" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" style="margin-left:80px;">选择图片</el-button>
                    <el-button size="small" style="display:none" type="success" @click="submitUpload1">上传到服务器</el-button>
                </el-upload>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="b1" @click="save('ruleForm')">{{ b2 }}</el-button>
            </span>
        </el-dialog>
        <el-row :gutter="20" style="margin:0;">
            <el-col id="leftdiv" :span="24">
                <div class="grid-content bg-purple">
                    <!-- <el-button type="primary" @click="seebill">编辑班课</el-button>
                <el-button type="primary" @click="deleteClasseoom">结束班课</el-button>
                <el-button type="primary" @click="change_teacher">申请更换讲师</el-button> -->
                    <p class="title">课程信息</p>
                    <div class="grid-content bg-purple">
                        <span class="label">班课名称:</span><span>{{ ruleForm.temCourseName }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">课程代码:</span><span>{{ ruleForm.courseCode }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">优惠信息:</span><span>{{ ruleForm.preferential }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">课程状态:</span><span>{{ ruleForm.statused }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">班课所属学校:</span><span>{{ ruleForm.universityName }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">班主任:</span><span>{{ ruleForm.sysSeller }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">班课讲师:</span><span>{{ ruleForm.teacNickName }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">班课辅导需求:</span><span>{{ ruleForm.explained }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">Deal Deadline:</span>
                        <span>{{ ruleForm.endCourseTime }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">Offcial Deadline:</span>
                        <span>{{ ruleForm.examTime }}</span>
                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="12">
            <div class="grid-content bg-purple" id="rightdivup">
              <p class="title">课程流水</p>
              <ul id="logs" style="height:300px;overflow-y:scroll;"></ul>
            </div>
          </el-col> -->
        </el-row>
        <div style="background:#fff;padding:10px;margin:8px 10px;">
            <p class="title">用户信息</p>
            <el-table :data="extSysPaymentdata" border style="width: 100%;margin-top:5px;background: #e5e9f2;">
                <el-table-column label="订单号" width="280">
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: pointer;" @click="seedetail(scope.row,scope.$index)">{{ scope.row.orderNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户姓名" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.nickName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="销售名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="已报课堂" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.classroomName }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作" width="220"> -->
                <!-- <template slot-scope="scope"> -->
                <!-- <el-button size="mini" @click="editOrder(scope.row,scope.$index)">修改订单</el-button>   -->
                <!-- <el-button size="mini" @click="change_teacher(scope.row,scope.$index)">申请事故单</el-button>
                  <el-button size="mini" @click="change_lession(scope.row,scope.$index)">续课</el-button> -->
                <!-- </template> -->
                <!-- </el-table-column> -->
            </el-table>
        </div>
        <div style="background:#fff;padding:10px;margin:8px 10px;">
            <!-- <el-button type="primary" @click="addClasseoom">新增课堂</el-button> -->
            <p class="title">课堂信息</p>
            <el-table :data="classroomdata" border style="width: 100%;margin-top:5px;background: #e5e9f2;">
                <el-table-column label="课堂名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
        label="课堂费用"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.roomCost }}{{ scope.row.currency }}</span>
        </template>
      </el-table-column> -->
                <el-table-column label="课堂说明" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预计开始时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.startTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预计结束时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.endTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="报名人数" width="80">
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: pointer;" @click="person(scope.row,scope.$index)">{{ scope.row.buyNumber }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.statused ===1">待确认课堂</span>
                        <span v-if="scope.row.statused ===2">已确认</span>
                        <span v-if="scope.row.statused ===4">正在上课</span>
                        <span v-if="scope.row.statused ===8">已结束</span>
                        <span v-if="scope.row.statused ===16">异常课堂</span>
                        <span v-if="scope.row.statused ===32">申请取消课堂中</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button size="mini" @click="revise(scope.row,scope.$index)">课堂记录</el-button>
          </template>
      </el-table-column>  -->
            </el-table>
        </div>
        <div style="background:#fff;padding:10px;margin:8px 10px;">
            <p class="title">课件信息</p>
            <div style="float:left;">
                <!-- <el-checkbox v-model="checked" style="margin-left:20px;margin-right:20px" @change="check">全选</el-checkbox> -->
                <!-- <el-button type="primary" :loading="btnstatus" @click="downfile">下载</el-button> -->
            </div>
            <!-- <el-upload
        ref="upload"
        style="display:inline-block;margin-left:5px;margin-bottom:10px"
        class="upload-demo"
        :headers="myHeaders"
        :data="data"
        :multiple="true"
        :action="url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="change"
        :on-success="success"
        :on-error="onerror"
        :file-list="fileList"
        list-type="picture"
        :auto-upload="true"
      >
        <el-select v-model="ruleForm.course" placeholder="请选择" style="margin-left:5px" @change="change_course">
          <el-option v-for="item in courses" :key="item.id" :label="item.groupName" :value="item.id" />
        </el-select>
        <el-button slot="trigger" type="primary">选择文件</el-button>
        <el-button type="success" @click="submitUpload">上传</el-button>
      </el-upload> -->
            <!-- <div id="ul"> -->
            <div v-for="(item,index) in courses" :key="index">
                <div>{{ item.groupName }}
                    <ul>
                        <li v-for="(it, $index) in coursesItem" v-if="item.groupName == it.groupName" :key="$index">
                            <div style="position:relative">
                                <!--  v-model="it.checkbox" :key='it.id' @change='chooseDownLoadCheckBox(it)' -->
                                <el-checkbox style="padding-right:10px;" @change="chooseDownLoadCheckBox(it)" />
                                <a class="view" @click="downFiles(it)">
                                    {{ it.name }}
                                </a>
                                <span style="display:inline-block;overflow: hidden;position: absolute; right: 5px; background: #fff; z-index: 999;padding-left:10px;">
                                    {{ it.createAt | spliting }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- </div> -->
                <!-- <p>Requirement</p>
        <ul class="Requirement ul" />
        <p>Unit guide</p>
        <ul id="Unit" class="ul" />
        <p>Lecture note</p>
        <ul id="Lecture" class="ul" />
        <p>Samples</p>
        <ul id="Sample" class="ul" />
        <p>Suggested Readings</p>
        <ul id="Readings" class="ul" />
        <p>Other materials</p>
        <ul id="Other" class="ul" />
        <p>Tutor Material</p>
        <ul id="Tutor" class="ul" />
        <p>Additional</p>
        <ul id="Additional" class="ul" /> -->
            </div>
        </div>
        <el-dialog title="课堂记录" :visible.sync="dialogVisible" width="30%">
            <div v-for="(item, index) in history" :key="index" class="text item">
                <div>{{ item.suerrole }} {{ item.nickname }} {{ item.joinTime }} 进入了课堂</div>
                <div>{{ item.suerrole }} {{ item.nickname }} {{ item.leaveTime }} 离开了课堂</div>
                <div>持续了 {{ item.duration }} 分钟</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getLocal } from '@/utils/auth'
export default {
    rounding(value) {
        return value.toFixed(2)
    },
    spliting(value) {
        return value.split(' ')[0]
    },
    data() {
        return {
            coursesItem: [],
            bigClassRoom: false,
            personid: '',
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 0,
            personpage: 1,
            personlimit: 5,
            persondata: [],
            personmodel: false,
            aboutOrder: false,
            radshow: false,
            fileList1: [],
            myHeaders1: {
                token: getLocal('teactoken')
            },
            url1: this.$api.baseURL + 'sys/seller/order/evidenceThumbSave',
            data1: {
                amount: '',
                current: '',
                studId: ''
            },
            b1: false,
            b2: '确 定',
            s1: true,
            s2: true,
            red: '',
            radio: '1',
            badMoney: '',
            isFromOrder: true,
            mm1: false,
            mm: false,
            studCourses: [],
            fileList: [],
            myHeaders: {
                token: getLocal('teactoken')
            },
            url: this.$api.baseURL + 'sys/seller/courseware/save',
            data: {
                cdId: '',
                groupId: ''
            },
            btnstatus: false,
            dialogVisible: false,
            checked: false,
            courses: '',
            history: '',
            urls: [],
            id: '',
            classroomdata: [],
            extSysPaymentdata: [],
            studCoursewareList: [],
            filelist: [],
            ruleForm: {
                preferential: '',
                teacNickName: '',
                materialCost: '',
                course: '',
                parentTotalPrice: '',
                Integer: '',
                parentLastPrepayment: '',
                temCourseName: '',
                universityName: '',
                statused: '',
                studUser: ''
            },
            ruleForm1: {
                username: '',
                nickname: '',
                sellerDemandDesc: '',
                persenterTime: '',
                allSchooltime: '',
                reaMonetary: '',
                current: '',
                amount1: '',
                amount: '',
                studname: '',
                studId: ''

            },
            ruleForm2: {
                courseCode: '',
                courseName: '',
                type: '',
                current: '',
                amount: '',
                studId: '',
                id: '',
                amount1: '',
                courseId: ''
            },
            rules1: {},
            rules: {}
        }
    },
    mounted() {
        this.getclassroomdata()
        this.coursedata()
    },
    methods: {
        handlePreview(file) {
            console.log(file)
        },
        success(response, file, fileList) {
            if (response.status == 200) {
                this.$message({
                    message: '上传文件成功',
                    type: 'success'
                })
                // this.fileList = []
                // $('.ul').empty()
                // this.getclassroomdata()
                window.location.reload()
            }
            if (response.status == 400) {
                this.$message({
                    message: response.body.msg,
                    type: 'warning'
                })
                this.fileList = []
            }
        },
        onerror(response, file, fileList) {
            this.$message({
                message: response.body.msg,
                type: 'warning'
            })
        },
        change_lession(row, index) {
            window.location.href = 'editClassroomOrder.html?id=' + row.courseId + ''
        },
        change(file, fileList) {
            // getUrlStr = function(name) {
            //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            //     var r = window.location.search.substr(1).match(reg)
            //     if (r != null) return unescape(r[2])
            //     return null
            // }
            var id = this.$route.query.id
            this.data.cdId = id
        },
        handleRemove(file, fileList) {},
        uploadFile(file) {
            this.formDate = new FormData()
            this.formDate.append('file', file.file)
            debugger
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        check(val) {
            // if (val == true) {
            //     $('.checkbox').prop('checked', true)
            // } else {
            //     $('.checkbox').prop('checked', false)
            // }
        },
        coursedata() {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/courseware/groupList',
                params: {
                    page: 1,
                    limit: 1000
                }
            }).then(r => {
                var lists = []
                r.data.body.list.forEach(function(element) {
                    var list = {}
                    list.groupName = element.groupName
                    list.name = element.groupName.split(' ')[0]
                    list.id = element.id
                    lists.push(list)
                })
                this.courses = lists
            })
        },
        change_course(courseid) {
            this.data.groupId = courseid
        },
        // downfile() {
        //     this.$message({
        //         message: '文件正在服务器打包,请耐心等待,不要刷新页面',
        //         type: 'success'
        //     })
        //     this.btnstatus = true
        //     var arr = []
        //     var checkedCount = 0
        //     for (var i = 0; i < $('#ul li input').length; i++) {
        //         var Uarry = $('#ul li input')
        //         var Tresult = Uarry.eq(i).attr('data-name')
        //         var checkbox = document.getElementsByName('tie_in[]')
        //         if (checkbox[i].checked) {
        //             checkedCount++
        //             arr.push(Tresult)
        //         }
        //     }
        //     var arrjoin = arr.join(';')
        //     $.ajax({
        //         type: 'GET',
        //         dataType: 'json',
        //         headers: {
        //             'token': token
        //         },
        //         data: {
        //             fileStr: arrjoin
        //         },
        //         url: '' + baseURL + '/resource/getZipFile',
        //         success: function(json) {
        //             if (json.status == 200) {
        //                 this.btnstatus = false
        //                 this.$message({
        //                     message: '文件正在服务器打包,请耐心等待,不要刷新页面',
        //                     type: 'success'
        //                 })
        //                 window.open(json.body.filePath)
        //             }
        //         }
        //     })
        // },
        // del(row, index) {
        //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         $.ajax({
        //             type: 'POST',
        //             dataType: 'json',
        //             headers: {
        //                 'token': token
        //             },
        //             data: JSON.stringify([row.id]),
        //             url: '' + baseURL + 'sys/seller/courseware/delete',
        //             success: function(json) {
        //                 this.$message({
        //                     type: 'success',
        //                     message: '删除成功!'
        //                 })
        //                 this.getclassroomdata()
        //             }
        //         })
        //     }).catch(() => {})
        // },
        getclassroomdata: function() {
            // getUrlStr = function(name) {
            //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            //     var r = window.location.search.substr(1).match(reg)
            //     if (r != null) return unescape(r[2])
            //     return null
            // }
            var id = this.$route.query.id
            var parentId = this.$route.query.parentId
            if (parentId == 'null') {
                // $('#parents').css('display', 'none')
                document.getElementById('parents').style.display = 'none'
            }
            this.bigClassRoom = true
            this.$axios({
                url: this.$api.baseURL + '/api/teacher/classcourse/queryClassCourseInfo?id=' + id + '',
                params: {
                    'page': 1,
                    'limit': 6,
                    'isBig': true
                }
            }).then(r => {
                var json = r.data
                if (json.status == 400) {
                    alert(json.body.msg)
                    return
                }
                this.classroomdata = json.body.classroomList
                if (json.body.studPurchaseOrder.endCourseTime !== null) {
                    this.ruleForm.endCourseTime = json.body.studPurchaseOrder
                        .endCourseTime.substring(0, 10)
                }
                if (json.body.studPurchaseOrder.examTime !== null) {
                    this.ruleForm.examTime = json.body.studPurchaseOrder.examTime
                        .substring(0, 10)
                }
                this.ruleForm.explained = json.body.studPurchaseOrder.sellerDemandDesc
                this.ruleForm.temCourseName = json.body.studPurchaseOrder.courseName
                this.ruleForm.courseCode = json.body.studPurchaseOrder.courseCode
                this.ruleForm.universityName = json.body.studPurchaseOrder.universityName
                this.ruleForm.sysSeller = json.body.sysSeller.username
                this.ruleForm.teacNickName = json.body.teacNickName
                this.extSysPaymentdata = json.body.studClassStudents
                var studPreferentialPolicies = []
                json.body.studPreferentialPolicies.forEach(element => {
                    studPreferentialPolicies.push(Number(element.preferential) + '折')
                })
                this.ruleForm.preferential = studPreferentialPolicies.join(';')
                if (json.body.statused == 8) {
                    this.ruleForm.statused = '待规划(等待教师/运营接单)'
                }
                if (json.body.statused == 16) {
                    this.ruleForm.statused = '规划中(订单第一次超时等待运营接单)'
                }
                if (json.body.statused == 32) {
                    this.ruleForm.statused = '规划中(订单第二次超时等待运营主管强制指派)'
                }
                if (json.body.statused == 64) {
                    this.ruleForm.statused = '规划中(运营接单待指派，正在处理)'
                }
                if (json.body.statused == 128) {
                    this.ruleForm.statused = '待排课'
                }
                if (json.body.statused == 256) {
                    this.ruleForm.statused = '已排课'
                }
                if (json.body.statused == 512) {
                    this.ruleForm.statused = '待结课'
                }
                if (json.body.statused == 1024) {
                    this.ruleForm.statused = '已结课'
                }
                if (json.body.statused == 4096) {
                    this.ruleForm.statused = '已取消'
                }
                if (json.body.statused == 65536) {
                    this.ruleForm.statused = '事故单申请中'
                }
                if (json.body.statused == 262144) {
                    this.ruleForm.statused = '事故单更换教师'
                }
                this.bigClassRoom = false
                this.coursesItem = JSON.parse(
                    JSON.stringify(r.data.body.studCoursewareList)
                )
                for (var i in this.coursesItem) {
                    this.coursesItem[i].checkbox = false
                }
                // var studCoursewareList = json.body.studCoursewareList
                // var groupName = studCoursewareList.groupName
                // var arr1 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Requirement') {
                //         for (i = 0; i < 1; i++) {
                //             var array1 = {}
                //             array1.name = value.name
                //             array1.createAt = value.createAt
                //             array1.url = value.url
                //             array1.id = value.id
                //             arr1.push(array1)
                //         }
                //     }
                // })
                // arr1.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('.Requirement').append(html)
                // })
                // var arr2 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Unit Guide(Syllabus)') {
                //         for (i = 0; i < 1; i++) {
                //             var array2 = {}
                //             array2.name = value.name
                //             array2.createAt = value.createAt
                //             array2.url = value.url
                //             array2.id = value.id
                //             arr2.push(array2)
                //         }
                //     }
                // })
                // arr2.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('#Unit').append(html)
                // })
                // var arr3 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Lecture note') {
                //         for (i = 0; i < 1; i++) {
                //             var array3 = {}
                //             array3.name = value.name
                //             array3.createAt = value.createAt
                //             array3.url = value.url
                //             array3.id = value.id
                //             arr3.push(array3)
                //         }
                //     }
                // })
                // arr3.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('#Lecture').append(html)
                // })
                // var arr4 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Sample') {
                //         for (i = 0; i < 1; i++) {
                //             var array4 = {}
                //             array4.name = value.name
                //             array4.createAt = value.createAt
                //             array4.url = value.url
                //             array4.id = value.id
                //             arr4.push(array4)
                //         }
                //     }
                // })
                // arr4.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('#Sample').append(html)
                // })

                // var arr5 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Readings') {
                //         for (i = 0; i < 1; i++) {
                //             var array5 = {}
                //             array5.name = value.name
                //             array5.createAt = value.createAt
                //             array5.url = value.url
                //             array5.id = value.id
                //             arr5.push(array5)
                //         }
                //     }
                // })
                // arr5.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('#Readings').append(html)
                // })
                // var arr6 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Other') {
                //         for (i = 0; i < 1; i++) {
                //             var array6 = {}
                //             array6.name = value.name
                //             array6.createAt = value.createAt
                //             array6.url = value.url
                //             array6.id = value.id
                //             arr6.push(array6)
                //         }
                //     }
                // })
                // arr6.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('#Other').append(html)
                // })
                // var arr7 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Tutor Material') {
                //         for (i = 0; i < 1; i++) {
                //             var array7 = {}
                //             array7.name = value.name
                //             array7.createAt = value.createAt
                //             array7.url = value.url
                //             array7.id = value.id
                //             arr7.push(array7)
                //         }
                //     }
                // })
                // arr7.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('#Tutor').append(html)
                // })
                // var arr8 = []
                // studCoursewareList.map(function(value, key) {
                //     if (value.groupName == 'Additional') {
                //         for (i = 0; i < 1; i++) {
                //             var array8 = {}
                //             array8.name = value.name
                //             array8.createAt = value.createAt
                //             array8.url = value.url
                //             array8.id = value.id
                //             arr8.push(array8)
                //         }
                //     }
                // })
                // arr8.map(item => {
                //     var html = "<li data-id='" + item.id +
                //             "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" + item.url +
                //             "'/><a class='view' data-name='" + item.url + "'>" + item.name + '</a>' + item
                //         .createAt + "<button class='button'>删除</button></li>"
                //     $('#Additional').append(html)
                // })

                // $('.button').click(function() {
                //     var id = $(this).parent('li').attr('data-id')
                //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }).then(() => {
                //         $.ajax({
                //             type: 'POST',
                //             contentType: 'application/json',
                //             headers: {
                //                 'token': token
                //             },
                //             data: JSON.stringify([id]),
                //             url: '' + baseURL + 'sys/seller/courseware/delete',
                //             success: function(json) {
                //                 this.$message({
                //                     type: 'success',
                //                     message: '删除成功!'
                //                 })
                //                 $('ul').html('')
                //                 this.getclassroomdata()
                //             }
                //         })
                //     }).catch(() => {})
                // })

                // $(".view").click(function(){
                //   var name = $(this).attr("data-name");
                //   window.open( "viewpdf.html?name="+name+"");
                // });

                // $('.view').click(function() {
                //     var name = $(this).attr('data-name')
                //     window.open(name)
                // })
            })
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': 1,
            //         'limit': 6,
            //         'isBig': true
            //     },
            //     url: '' + baseURL + '/api/teacher/classcourse/queryClassCourseInfo?id=' + id + '',
            //     success: function(json) {

            //     }
            // })
        },
        apply(row, index) {
            this.mm1 = true
            this.type = row.type
            this.badMoney = row.badMoney
            this.ruleForm.studId = row.studId
            this.ruleForm.current = row.current
            this.ruleForm.id = row.id
            this.amount = row.badMoney
            this.ruleForm1.studname = row.nickName
            this.ruleForm1.amount1 = row.minMoney
            this.ruleForm1.amount = row.badMoney
            if (row.parentId == null) {
                this.radshow = false
                this.radio = '2'
            } else {
                this.radshow = true
                this.radio = '1'
            }
            if (row.courseId == null) {
                this.ruleForm.courseId = ' '
            } else {
                this.ruleForm.courseId = row.courseId
            }
            return
        },
        save1(formName) {
            var self = this
            if (this.radio == '1') {
                this.isFromOrder = true
            } else {
                this.isFromOrder = false
            }
            this.creatst1 = true
            this.creatbtn1 = '加载中'
            this.$axios({
                method: 'post',
                url: this.$api.baseURL + '/sys/seller/order/offsetPaymentDemand',
                data: {
                    'studId': this.ruleForm.studId,
                    'currency': this.ruleForm.current,
                    'payMoney': this.ruleForm1.amount,
                    'sysPaymentDemandId': this.ruleForm.id,
                    'isFromOrder': this.isFromOrder
                }
            }).then(r => {
                var json = r.data
                if (json.status == 200) {
                    this.creatmodel1 = false
                    this.creatst1 = false
                    this.creatbtn1 = '确 定'
                    if (json.body.needMoney == 0) {
                        self.$message({
                            message: '账单支付成功',
                            type: 'success'
                        })
                        this.getclassroomdata()
                        this.mm1 = false
                    } else {
                        this.mm1 = false
                        this.ruleForm.amount = json.body.needMoney
                        this.ruleForm.amount1 = this.ruleForm1.amount
                        this.ruleForm.studname = this.ruleForm1.studname
                        this.mm = true
                    }
                }
                if (json.status == 400) {
                    this.$message({
                        message: json.body.msg,
                        type: 'warning'
                    })
                    this.creatst1 = false
                    this.creatbtn1 = '确 定'
                }
            })
        },
        submitUpload1() {
            if (this.ruleForm.remark == undefined) {
                this.ruleForm.remark = ' '
            }
            this.formDate = new FormData()
            this.$refs.upload.submit()
            this.formDate.append('current', this.ruleForm.current)
            this.formDate.append('studId', this.ruleForm.studId)
            this.formDate.append('amount', this.ruleForm.amount)
            this.formDate.append('remark', this.ruleForm.remark)
            this.formDate.append('courseId', this.ruleForm.courseId)
            const config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: 'multipart/form-data',
                    token: getLocal('teactoken')
                }
            }
            this.$axios.post(this.$api.baseURL + 'sys/seller/order/evidenceThumbSave', this.formDate, config).then(res => {
                if (res.data.status == 200) {
                    this.save1()
                    this.$message({
                        message: '账单支付成功',
                        type: 'success'
                    })
                    this.mm = false
                    this.getclassroomdata()
                    this.fileList = []
                    this.ruleForm.remark = ''
                    this.b1 = false
                    this.b2 = '确 定'
                }
                if (res.data.status == 400) {
                    if (this.$refs.ruleForm.model.amount != '') {
                        this.$message({
                            message: res.data.body.msg,
                            type: 'warning'
                        })
                    }
                    this.b1 = false
                    this.b2 = '确 定'
                }
            }).catch(res => {
                this.$message({
                    message: res.data.body.msg,
                    type: 'warning'
                })
            })
        },
        save(formName) {
            var badMoney = Number(this.badMoney)
            var amount = Number(this.ruleForm.amount)
            if (this.type == 1) {
                if (amount > badMoney) {
                    this.red = '课程预付 可以少不可以多'
                    return
                }
            }
            if (this.type == 2) {
                if (amount < badMoney) {
                    this.red = '欠费账单 可以多不可以少'
                    return
                }
            }
            if (this.fileListnum == 0) {
                this.$message({
                    message: '请选择图片',
                    type: 'warning'
                })
                return
            }
            var self = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.b1 = true
                    this.b2 = '加载中'
                    this.submitUpload1()
                } else {
                    this.$message({
                        message: '请完善信息',
                        type: 'warning'
                    })
                }
            })
        },
        handlePreview1(file) {
            console.log(file)
        },
        success1(response, file, fileList) {
            console.log(response)
        },
        onerror1(response, file, fileList) {
            this.$message({
                message: response.body.msg,
                type: 'warning'
            })
        },
        change1(file, fileList) {
            this.fileListnum = fileList.length
            // console.log(this.fileListnum)
            // if (fileList.length == 1) {

            // }
        },
        uploadFile1(file) {
            this.formDate = new FormData()
            for (var i = 0; i < this.fileListnum; i++) {
                this.formDate.append('file' + i, file.file)
            }
        },
        handleRemove1(file, fileList) {
            this.fileListnum = fileList.length
            // console.log(this.fileListnum)
            // if (fileList.length == 1) {

            // }
        },
        deleteClasseoom(row, index) {
            // getUrlStr = function(name) {
            //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            //     var r = window.location.search.substr(1).match(reg)
            //     if (r != null) return unescape(r[2])
            //     return null
            // }
            var id = this.$route.query.id
            this.$confirm('此操作将结束该班课, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios({
                    method: 'post',
                    url: this.$api.baseURL + '/sys/seller/classcourse/finishedClassCourse?courseId=' + id + '',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(r => {
                    if (r.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: r.data.body.msg
                        })
                    }

                    if (r.data.status == 400) {
                        this.$message({
                            type: 'warning',
                            message: r.data.body.msg
                        })
                    }
                })
                // $.ajax({
                //     type: 'POST',
                //     contentType: 'application/json',
                //     headers: {
                //         'token': token
                //     },
                //     url: '' + baseURL + '/sys/seller/classcourse/finishedClassCourse?courseId=' + id + '',
                //     success: function(json) {
                //         if (json.status == 200) {
                //             this.$message({
                //                 type: 'success',
                //                 message: json.body.msg
                //             })
                //         }

                //         if (json.status == 400) {
                //             this.$message({
                //                 type: 'warning',
                //                 message: json.body.msg
                //             })
                //         }
                //     }
                // })
            }).catch(() => {})
        },
        seebill(row, index) {
            // getUrlStr = function(name) {
            //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            //     var r = window.location.search.substr(1).match(reg)
            //     if (r != null) return unescape(r[2])
            //     return null
            // }
            var id = this.$route.query.id
            window.location.href = 'editClassroom.html?id=' + id + ''
        },
        addClasseoom(row, index) {
            // getUrlStr = function(name) {
            //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            //     var r = window.location.search.substr(1).match(reg)
            //     if (r != null) return unescape(r[2])
            //     return null
            // }
            var id = this.$route.query.id
            window.location.href = 'addClassroom.html?id=' + id + ''
        },
        change_teacher(row, index) {
            // getUrlStr = function(name) {
            //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            //     var r = window.location.search.substr(1).match(reg)
            //     if (r != null) return unescape(r[2])
            //     return null
            // }
            var id = this.$route.query.id
            this.$confirm('是否执行此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    this.$axios({
                        url: this.$api.baseURL + 'sys/seller/order/applyAccidentOrder',
                        method: 'post',
                        data: {
                            'courseId': id
                        }
                    }).then(r => {
                        if (r.data.status == '200') {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                        }
                        if (r.data.status == 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                        }
                    })
                    // $.ajax({
                    //     type: 'POST',
                    //     dataType: 'json',
                    //     data: {
                    //         'token': token,
                    //         'courseId': id
                    //     },
                    //     url: '' + baseURL + 'sys/seller/order/applyAccidentOrder',
                    //     success: function(json) {
                    //         if (json.status == '200') {
                    //             this.$message({
                    //                 message: json.body.msg,
                    //                 type: 'success'
                    //             })
                    //         }
                    //         if (json.status == 400) {
                    //             this.$message({
                    //                 message: json.body.msg,
                    //                 type: 'warning'
                    //             })
                    //         }
                    //     }
                    // })
                }).catch(() => {})
        },
        getperson() {
            this.$axios({
                url: this.$api.baseURL + 'sys/seller/classcourse/queryStudByClassroomId',
                params: {
                    'page': this.personpage,
                    'limit': this.personlimit,
                    'classroomId': this.personid
                }

            }).then(r => {
                this.persondata = r.data.body.list
                this.total = r.data.body.totalCount
                this.pageSize = r.data.body.totalCount
                this.currentPage = r.data.body.currPage
            })
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': this.personpage,
            //         'limit': this.personlimit,
            //         'classroomId': this.personid
            //     },
            //     url: '' + baseURL + 'sys/seller/classcourse/queryStudByClassroomId',
            //     success: function(json) {
            //         this.persondata = json.body.list
            //         this.total = json.body.totalCount
            //         this.pageSize = json.body.totalCount
            //         this.currentPage = json.body.currPage
            //     }
            // })
        },
        person(row, index) {
            this.personid = row.id
            this.getperson()
            this.personmodel = true
        },
        handleCurrentChange(val) {
            this.personpage = val
            this.getperson()
        },
        handleSizeChange(val) {
            this.personlimit = val
            this.getperson()
            this.handleCurrentChange(this.currentPage)
        },
        editOrder(row, index) {
            window.location.href = 'editClassroomOrder.html?id=' + row.courseId + ''
        },
        seedetail(row, index) {
            const Logistics = this.$router.resolve({
                path: `/sellerDetail`,
                query: { id: row.courseId }
            })
            window.open(Logistics.href)
            // window.location.href = 'seller_detail.html?id=' + row.courseId + ''
        }
    }
}

</script>
<style scoped>
.bigClassRoom {
    padding: 10px
}

.el-dialog__wrapper {
    left: 0 !important;
}

.demo-ruleForm {
    width: 100%;
}

.clears:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
}

.grid-content:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
}

.grid-content span {
    float: left;
}

.grid-content span:last-child {
    max-width: 75%;
}

.el-message-box__wrapper {
    position: fixed;
    top: -20px;
    bottom: 0;
    left: 0px !important;
    right: 0;
    text-align: center;
}

i {
    font-style: normal
}

ul li {
    list-style: none;
    border-bottom: 1px solid #ddd;
    height: 46px;
    line-height: 46px;
    width: 100%;
    display: block;
}

ul li a {
    margin-right: 10px;
}

.button {
    cursor: pointer;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 10px;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin-top: 6px;
    transition: .1s;
    border: 1px solid #dcdfe6;
    float: right;
}

.view {
    color: #409EFF;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
    display: inline-block;
    height: 30px;
}

#logs li {
    font-size: 14px !important;
    border-bottom: 1px solid #ddd;
    height: auto !important;
    line-height: 26px !important;
}

.title {
    font-weight: 600;
    font-size: 18px;
    margin: 5px 0 !important;
    border-bottom: 1px solid #99a9bf;
    padding-bottom: 8px;
}

.label {
    font-size: 16px;
    margin-right: 10px;
}

.grid-content {
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
}

.el-table__empty-block {
    background: #fff;
}

</style>
<style>
</style>
