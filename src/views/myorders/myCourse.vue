<template>
  <div class="myCourse">
    <div v-loading="loadingCourse">
      <transition name="el-fade-in-linear">
        <div v-cloak v-if="updataFiles" class="maskLoading">
          <div class="imgText">
            <img style="margin-left: 40%;" src="../../assets/images/loading.gif" alt="">
            <p>文件较大或上行网速较慢，请耐心等待上传。<br>过程中请不要关闭或刷新浏览器！避免上传失败。<br>上传成功后页面自动刷新</p>
          </div>
        </div>
      </transition>
      <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px" />
      <el-button type="primary" @click="search">搜索</el-button>
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
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">
            <!-- <span v-if="scope.row.spoType ==64">
              <img style="width:15px" src="../../assets/images/bigC.png">
            </span>
            <span v-if="scope.row.parentId !==null&&scope.row.spoType !==64&&scope.row.parentId != 0">
              <img style="width:15px" src="../../assets/images/ss.svg">
            </span> -->
            <span
              style="color:#409EFF;cursor: pointer;"
              @click="see(scope.row,scope.$index, scope.offCourseName)"
            >{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总上课时长(min)" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.allSchooltime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总赠送时长(min)" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.allPresenterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.courseStatus == 1">未处理（无任何销售接单）</el-tag>
            <el-tag v-if="scope.row.courseStatus == 2">待审核</el-tag>
            <el-tag v-if="scope.row.courseStatus == 4">待确定</el-tag>
            <el-tag v-if="scope.row.courseStatus == 8">待规划（等待教师/运营接单）</el-tag>
            <el-tag v-if="scope.row.courseStatus == 16">规划中(订单第一次超时等待运营接单)</el-tag>
            <el-tag v-if="scope.row.courseStatus == 32">规划中(订单第二次超时等待运营主管强制指派)</el-tag>
            <el-tag v-if="scope.row.courseStatus == 64">规划中(运营接单待指派，正在处理)</el-tag>
            <el-tag v-if="scope.row.courseStatus == 128">待排课</el-tag>
            <el-tag v-if="scope.row.courseStatus == 256">已排课</el-tag>
            <el-tag v-if="scope.row.courseStatus == 512">申请结课中</el-tag>
            <el-tag v-if="scope.row.courseStatus == 1024">已结课</el-tag>
            <el-tag v-if="scope.row.courseStatus == 2048">已强制结课</el-tag>
            <el-tag v-if="scope.row.courseStatus == 4096">已取消</el-tag>
            <el-tag v-if="scope.row.courseStatus == 8192">坏单申请中</el-tag>
            <el-tag v-if="scope.row.courseStatus == 16384">订单作废</el-tag>
            <el-tag v-if="scope.row.courseStatus == 32768">销售被更换</el-tag>
            <el-tag v-if="scope.row.courseStatus == 65536">事故单申请中</el-tag>
            <el-tag v-if="scope.row.courseStatus == 131072">讲师已更换</el-tag>
            <el-tag v-if="scope.row.courseStatus == 262144">事故单更换教师待委派</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">

            <el-button
              v-show="isTest"
              v-if="scope.row.statused <= 2&&(scope.row.spoType == 0||scope.row.spoType == 1)"
              size="mini"
              @click="apply(scope.row,scope.$index)"
            >排课</el-button>
            <!-- <el-button
							size="mini"
							v-if="scope.row.statused>2||(scope.row.spoType != 0&&scope.row.spoType != 1)"
							disabled
							>排课</el-button
						> -->
            <el-button
              v-if="(scope.row.statused >= 1 || scope.row.spoType>1) && (scope.row.spoType != 64) && (scope.row.statused != 4) "
              size="mini"
              @click="noapply(scope.row,scope.$index)"
            >
              申请结课
            </el-button>
            <el-button
              v-if="(scope.row.statused <1 && scope.row.spoType<=1) || (scope.row.spoType == 64) || (scope.row.statused == 4)"
              size="mini"
              disabled
            >申请结课
            </el-button>
            <el-button
              v-if="(scope.row.statused >= 2 && scope.row.statused <= 8)&&(scope.row.spoType != 64)"
              size="mini"
              @click="give_time(scope.row,scope.$index)"
            >赠送时长</el-button>
            <el-button
              v-if="(scope.row.statused<2 || scope.row.statused>8)||(scope.row.spoType == 64)"
              size="mini"
              disabled
            >赠送时长
            </el-button>
            <el-button size="mini" @click="uploadDropbox(scope.row,scope.$index)">提交作业</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹框 -->
      <el-dialog :visible.sync="modal" width="50%">
        <!-- :rules="rules" -->
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课堂名称" prop="title">
            <el-input v-model="ruleForm.title" />
          </el-form-item>
          <template>
            <div class="app-container" style="padding:0;">
              <el-form-item label="开始时间" prop="value1">
                <el-date-picker
                  v-model="ruleForm.value1"
                  type="datetime"
                  :picker-options="pciker1"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="开始日期"
                />
              </el-form-item>
              <el-form-item label="结束时间" prop="value2">
                <el-date-picker
                  v-model="ruleForm.value2"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm"
                  :picker-options="pciker2"
                  placeholder="结束日期"
                />
              </el-form-item>
            </div>
          </template>
          <el-form-item label="课堂描述" prop="description">
            <el-input v-model="ruleForm.description" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- ('ruleForm') -->
          <el-button type="primary" :loading="btnstatus" @click="submitForm('ruleForm')">{{ btnval }}
          </el-button>
        </span>
      </el-dialog>
      <!-- 弹框 -->
      <el-dialog :visible.sync="modal_time" width="50%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="选择课堂" prop="classroom">
            <el-select v-model="ruleForm.classroom" placeholder="请选择课堂" @change="change_classroom">
              <el-option v-for="item in classrooms" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="赠送时长" prop="times">
            <el-input v-model="ruleForm.times" type="number" style="width:220px;margin-right:10px" />
            <span>MIN</span>
          </el-form-item>
          <el-form-item label="赠送说明" prop="explain">
            <el-input v-model="ruleForm.explain" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="btnstatus" @click="submitForm1('ruleForm')">{{ btnval }}
          </el-button>
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

      <el-dialog :visible.sync="uploadDropBoxDialog" width="50%" :before-close="uploadDropBoxDialogClose">
        <div class="coursewaressssss">
          <div style="padding-left: 25px;margin-top:10px;">
            <el-button id="selectfiles" refs="selectfiles" type="primary">选择文件</el-button>
            <div id="ossfile" style="padding: 10px 0;" />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button id="postfiles" type="primary">上传</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
  <!-- <script src="../../../public/libs/crypto.js" ></script>
<script src="../../../public/libs/hmac.js" ></script>
<script src="../../../public/libs/sha1.js" ></script>
<script src="../../../public/libs/base64.js" ></script>
<script src="../../../public/libs/plupload.full.min.js" ></script> -->
</template>

<script>
// import { stringify } from 'querystring'
import plupload from 'plupload'
// import plupload from './@/static/plupload.full.min.js'
export default {
    data() {
        return {
            loadingCourse: false,
            uploader: null,
            uploadFilesLength: [],
            uploadButtonEvent: null,
            uploadFilesArray: [],
            updataFiles: false,
            isTest: false,

            uploadDropBoxDialog: false,
            uploadUseData: {},
            pciker1: {
                disabledDate: time => {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            pciker2: {
                disabledDate: time => {
                    const beginDateVal = this.ruleForm.value1
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            },
            uploadStatus: 'exception',
            uploadPercent: 20,
            showUploadProgress: false,
            span: 0,
            dropboxCourse: false,
            fileListnum: 0,
            fileList: [],
            uploadImgTimes: 0,
            formdata: new FormData(), // 创建一个上传图片用的new formdata
            btnstatus: false,
            btnval: '确 定',
            value1: '',
            value2: '',
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
            classrooms: '',
            classroom: '',
            val: 1,
            page: '',
            ruleForm: {
                title: '',
                value1: '',
                value2: '',
                classroom: '',
                description: '',
                times: '',
                explain: ''
            },
            rules: {
                title: [{
                    required: true,
                    message: '请填写课程标题',
                    trigger: 'blur'
                }],
                value1: [{
                    required: true,
                    message: '请选择排课时间',
                    trigger: 'change'
                }],
                value2: [{
                    required: true,
                    message: '请选择排课时间',
                    trigger: 'change'
                }],
                description: [{
                    required: true,
                    message: '请填写课程详情',
                    trigger: 'blur'
                }],
                times: [{
                    required: true,
                    message: '请填写赠送时长',
                    trigger: 'blur'
                }],
                classroom: [{
                    required: true,
                    message: '请填写赠送时长',
                    trigger: 'blur'
                }],
                explain: [{
                    required: true,
                    message: '请填写赠送说明',
                    trigger: 'blur'
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.isNTest()
        this.getTableData()
    },

    methods: {
        isNTest() {
            if (this.$api.baseURL === 'http://121.43.174.41/') {
                this.isTest = true
            } else {
                this.isTest = false
            }
        },

        search() {
            this.getTableData()
        },
        getTableData: function() {
            this.loadingCourse = true
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/order/list',
                method: 'get',
                params: {
                    page: this.val,
                    limit: this.limit,
                    statused: 15,
                    // "hasOrderPool": true,
                    key: this.tableDataName
                }
            }).then(r => {
                this.tableDataEnd = r.data.body.list
                this.total = r.data.body.totalCount
                this.pageSize = r.data.body.totalCount
                this.currentPage = r.data.body.currPage
                this.loadingCourse = false
            }).catch(er => {
                this.loadingCourse = false
            })
        },
        apply(row, index) {
            this.modal = true
            this.ruleForm.title = ''
            this.ruleForm.course_time = ''
            this.ruleForm.description = ''
            this.courseId = row.courseId
        },
        change_classroom(val) {},
        see(row, index, offCourseName) {
            // const routeData = this.$router.resolve({
            //     name: 'searchGoods',
            //     query: params,
            //     params: { catId: params.catId }
            // })
            // window.open(routeData.href, '_blank')
            if (row.spoType === 64) {
                const Logistics2 = this.$router.resolve({
                    path: `/bigClassRoom`,
                    query: { id: row.courseId, parentId: null }
                })
                window.open(Logistics2.href)
            } else if (row.courseType === 4) {
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

        give_time(row, index) {
            this.ruleForm.classroom = ''
            this.ruleForm.times = ''
            this.ruleForm.explain = ''
            this.modal_time = true
            this.courseId = row.courseId
            this.get_classroom()
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.ruleForm.value1 >= this.ruleForm.value2) {
                        this.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'warning'
                        })
                        return
                    }
                    const sdate = new Date(this.ruleForm.value1)
                    const now = new Date(this.ruleForm.value2)
                    const days = now.getTime() - sdate.getTime()
                    const day = parseInt(days / (1000 * 60))
                    if (day < 30) {
                        this.$message({
                            message: '时间相差必须30分钟',
                            type: 'warning'
                        })
                        return
                    }
                    this.btnstatus = true
                    this.btnval = '加载中'
                    this.$axios({
                        url: this.$api.baseURL + '/api/teacher/order/putClassroom',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'post',
                        data: JSON.stringify({
                            cdId: this.courseId,
                            name: this.$refs.ruleForm.model.title,
                            startTime: this.$refs.ruleForm.model.value1 + ':00',
                            endTime: this.$refs.ruleForm.model.value2 + ':00',
                            description: this.$refs.ruleForm.model.description,
                            roomType: 1
                        })
                    }).then(r => {
                        if (r.data.status === 200) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                            this.btnstatus = false
                            this.btnval = '确定'
                            this.modal = false
                        }
                        if (r.data.status === 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                            this.btnstatus = false
                            this.btnval = '确定'
                        }
                    }).catch(r => {

                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        submitForm1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.btnstatus = true
                    this.btnval = '加载中'
                    this.$axios({
                        url: this.$api.baseURL + '/api/teacher/account/presenterTime',
                        method: 'post',
                        data: {
                            classroomId: this.$refs.ruleForm.model.classroom,
                            time: Number(this.$refs.ruleForm.model.times),
                            explain: Number(this.$refs.ruleForm.model.explain)
                        }
                    }).then(r => {
                        if (r.data.status === 200) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                            this.btnval = '确定'
                            this.btnstatus = false
                            this.modal = false
                            this.modal_time = false
                        }
                        if (r.data.status === 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                            this.btnval = '确定'
                            this.btnstatus = false
                            this.modal = false
                        }
                    }).catch(er => {

                    })
                }
            })
        },
        noapply(row, index) {
            this.$confirm('是否要确认结课?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(_ => {
                    this.$axios({
                        url: this.$api.baseURL + 'api/teacher/order/applyFinishCourse',
                        data: {
                            courseId: row.courseId
                        },
                        method: 'post'
                    }).then(r => {
                        if (r.data.status === 200) {
                            this.$message({
                                message: '您已提交了结课申请，请等待师资主管审核',
                                type: 'success'
                            })
                            this.getTableData()
                        }
                        if (r.data.status === 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                        }
                    })
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
            obj = this.selects.find(item => {
                return item.userId === val
            })
            this.userId = obj.userId
            this.username = obj.username
        },
        handleCurrentChange(val) {
            this.val = val
            this.getTableData()
        },
        get_classroom() {
            this.$axios({
                url: this.$api.baseURL + '/api/teacher/order/queryClassroomsByCourseId',
                params: {
                    courseId: this.courseId,
                    status: 14
                }
            }).then(r => {
                this.classrooms = r.data.body.list
            }).catch(er => {

            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            const ids = []
            this.multipleSelection.map(item => {
                var id = item.id
                ids.push('' + id + '')
            })
            this.selectedIDs = ids
            console.log('多选', ids)
            this.idss = this.selectedIDs
            console.log(this.idss)
        },
        uploadDropbox: function(val, id) {
            this.uploadDropBoxDialog = true
            this.uploadUseData = val
            function GUID() {
                this.date = new Date() /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
                if (typeof this.newGUID !== 'function') {
                    /* 生成GUID码 */
                    GUID.prototype.newGUID = function() {
                        this.date = new Date()
                        var guidStr = ''
                        var sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16)
                        var sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16)
                        for (var i = 0; i < 9; i++) {
                            guidStr += Math.floor(Math.random() * 16).toString(16)
                        }
                        guidStr += sexadecimalDate
                        guidStr += sexadecimalTime
                        while (guidStr.length < 32) {
                            guidStr += Math.floor(Math.random() * 16).toString(16)
                        }
                        return this.formatGUID(guidStr)
                    }
                    /* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDDate = function() {
                        return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date
                            .getDay())
                    }
                    /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDTime = function() {
                        return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(
                            this
                                .date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10))
                    }
                    /* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
                    GUID.prototype.addZero = function(num) {
                        if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
                            return '0' + Math.floor(num)
                        } else {
                            return num.toString()
                        }
                    }
                    /*  * 功能：将y进制的数值，转换为x进制的数值 * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10 * 返回值：返回转换后的字符串 */
                    GUID.prototype.hexadecimal = function(num, x, y) {
                        if (y != undefined) {
                            return parseInt(num.toString(), y).toString(x)
                        } else {
                            return parseInt(num.toString()).toString(x)
                        }
                    }
                    /* * 功能：格式化32位的字符串为GUID模式的字符串 * 参数：第1个参数表示32位的字符串 * 返回值：标准GUID格式的字符串 */
                    GUID.prototype.formatGUID = function(guidStr) {
                        var str1 = guidStr.slice(0, 8) + '-'
                        var str2 = guidStr.slice(8, 12) + '-'
                        var str3 = guidStr.slice(12, 16) + '-'
                        var str4 = guidStr.slice(16, 20) + '-'
                        var str5 = guidStr.slice(20)
                        return str1 + str2 + str3 + str4 + str5
                    }
                }
            }
            let accessid, host, policyBase64, signature, g_dirname, uploadFileName, url, uploadFilesTimes
            const guid = new GUID()
            uploadFilesTimes = 0
            if (this.uploadUseData.scTypeed == 4) {
                url = this.$api.baseURL + 'api/oss/getAliOSSUploadSignWyard?dir=' + 'courseware/' + guid.newGUID() + '/'
            } else {
                url = this.$api.baseURL + 'api/oss/getAliOSSUploadSign?dir=' + 'courseware/' + guid.newGUID() + '/'
            }
            this.$axios({
                url: url
            }).then(r => {
                if (r.data.status === 200) {
                    accessid = r.data.body.accessid
                    host = r.data.body.host
                    policyBase64 = r.data.body.policy
                    signature = r.data.body.signature
                    g_dirname = r.data.body.dir

                    function formatFileName(up, filename) {
                        uploadFileName = encodeURIComponent(filename)
                        console.log(uploadFileName)
                        set_upload_param(up, filename, false)
                    }

                    function set_upload_param(up, filename, ret) {
                        if (ret) {
                            formatFileName(up, filename)
                        }
                        const new_multipart_params = {
                            'key': g_dirname + filename,
                            'policy': policyBase64,
                            'OSSAccessKeyId': accessid,
                            'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
                            'signature': signature
                        }

                        up.setOption({
                            'url': host,
                            'multipart_params': new_multipart_params
                        })

                        up.start()
                    }
                    const _this = this
                    this.uploader = new plupload.Uploader({
                        runtimes: 'html5,flash,silverlight,html4',
                        browse_button: 'selectfiles',
                        flash_swf_url: 'js/Moxie.swf',
                        silverlight_xap_url: 'js/Moxie.xap',
                        url: 'http://oss.aliyuncs.com',
                        init: {
                            PostInit: function() {
                                document.getElementById('ossfile').innerHTML = ''
                                document.getElementById('postfiles').onclick = function() {
                                    set_upload_param(_this.uploader, '', false)
                                    return false
                                }
                            },
                            FilesAdded: function(up, files) {
                                console.log(files)
                                for (const i in files) {
                                    _this.uploadFilesLength.push(files[i])
                                }
                                // console.log(_this.uploadFilesLength.length)
                                // uploadFilesNo = files.length
                                plupload.each(files, function(file) {
                                    document.getElementById('ossfile').innerHTML += '<div id="' + file.id +
                                            '" style="padding: 10px 0;">' + file.name + ' (' + plupload.formatSize(file
                                        .size).split(' ')[0] + plupload.formatSize(file.size).split(' ')[1]
                                        .toUpperCase() + ')<b></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>'
                                })
                            },

                            BeforeUpload: function(up, file) {
                                set_upload_param(up, file.name, true)
                            },

                            UploadProgress: function(up, file) {
                                _this.updataFiles = true
                                var d = document.getElementById(file.id)
                                d.getElementsByClassName('progress')[0].style.display = 'block'
                                d.getElementsByTagName('b')[0].innerHTML =
                                        '<span style="display:inline-block;padding-left:10px;">' + file.percent +
                                        '%</span>'
                                var prog = d.getElementsByTagName('div')[0]
                                var progBar = prog.getElementsByTagName('div')[0]
                                progBar.style.width = file.percent + '%'
                                progBar.setAttribute('aria-valuenow', file.percent)
                            },
                            FileUploaded: function(up, file, info) {
                                if (info.status == 200) {
                                    uploadFilesTimes++
                                    _this.uploadFilesArray = []
                                    const aaa = {
                                        cdId: _this.uploadUseData.courseId,
                                        groupId: 0,
                                        name: file.name,
                                        url: host + '/' + g_dirname + uploadFileName
                                    }
                                    _this.uploadFilesArray.push(aaa)
                                    _this.$axios({
                                        url: _this.$api.baseURL + 'api/teacher/courseware/saveWithOssUrl',
                                        method: 'post',
                                        data: JSON.stringify(_this.uploadFilesArray),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }

                                    }).then(r => {
                                        _this.updataFiles = false
                                        if (r.data.status == 200) {
                                            _this.$message({
                                                type: 'success',
                                                message: '文件上传成功'
                                            })
                                            if (uploadFilesTimes === _this.uploadFilesLength.length) {
                                                setInterval(function() {
                                                    window.location.reload()
                                                }, 1200)
                                            }
                                        }
                                    }).catch(er => {

                                    })
                                } else {
                                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response
                                }
                            },
                            Error: function(up, err) {
                                _this.$message({
                                    type: 'error',
                                    message: '文件上传失败， 请刷新重试'
                                })
                                _this.updataFiles = false
                                _this.uploader = this.$plup.destroy()
                                _this.uploadDropBoxDialog = false
                                _this.uploadFilesLength = []
                            }
                        }
                    })
                    this.uploader.init()
                }
            }).catch(er => {

            })
            // $.ajax({
            //     url: url,
            //     headers: {
            //         token: token
            //     },
            //     success: function(r) {
            //         if (r.status == 200) {
            //             accessid = r.body.accessid
            //             host = r.body.host
            //             policyBase64 = r.body.policy
            //             signature = r.body.signature
            //             g_dirname = r.body.dir

            //             function formatFileName(up, filename) {
            //                 uploadFileName = encodeURIComponent(filename)
            //                 console.log(uploadFileName)
            //                 set_upload_param(up, filename, false)
            //             }

            //             function set_upload_param(up, filename, ret) {
            //                 if (ret) {
            //                     formatFileName(up, filename)
            //                 }
            //                 new_multipart_params = {
            //                     'key': g_dirname + filename,
            //                     'policy': policyBase64,
            //                     'OSSAccessKeyId': accessid,
            //                     'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
            //                     'signature': signature
            //                 }

            //                 up.setOption({
            //                     'url': host,
            //                     'multipart_params': new_multipart_params
            //                 })

            //                 up.start()
            //             }

            //             this.uploader = new plupload.Uploader({
            //                 runtimes: 'html5,flash,silverlight,html4',
            //                 browse_button: 'selectfiles',
            //                 flash_swf_url: 'js/Moxie.swf',
            //                 silverlight_xap_url: 'js/Moxie.xap',
            //                 url: 'http://oss.aliyuncs.com',
            //                 init: {
            //                     PostInit: function() {
            //                         document.getElementById('ossfile').innerHTML = ''
            //                         document.getElementById('postfiles').onclick = function() {
            //                             set_upload_param(this.uploader, '', false)
            //                             return false
            //                         }
            //                     },
            //                     FilesAdded: function(up, files) {
            //                         console.log(files)
            //                         for (var i in files) {
            //                             this.uploadFilesLength.push(files)
            //                         }
            //                         console.log(vthism.uploadFilesLength.length)
            //                         uploadFilesNo = files.length
            //                         plupload.each(files, function(file) {
            //                             document.getElementById('ossfile').innerHTML += '<div id="' + file.id +
            //                                 '" style="padding: 10px 0;">' + file.name + ' (' + plupload.formatSize(file
            //                                 .size).split(' ')[0] + plupload.formatSize(file.size).split(' ')[1]
            //                                 .toUpperCase() + ')<b></b>' +
            //                                 '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
            //                                 '</div>'
            //                         })
            //                     },

            //                     BeforeUpload: function(up, file) {
            //                         set_upload_param(up, file.name, true)
            //                     },

            //                     UploadProgress: function(up, file) {
            //                         this.updataFiles = true
            //                         var d = document.getElementById(file.id)
            //                         d.getElementsByClassName('progress')[0].style.display = 'block'
            //                         d.getElementsByTagName('b')[0].innerHTML =
            //                             '<span style="display:inline-block;padding-left:10px;">' + file.percent +
            //                             '%</span>'
            //                         var prog = d.getElementsByTagName('div')[0]
            //                         var progBar = prog.getElementsByTagName('div')[0]
            //                         progBar.style.width = file.percent + '%'
            //                         progBar.setAttribute('aria-valuenow', file.percent)
            //                     },
            //                     FileUploaded: function(up, file, info) {
            //                         if (info.status == 200) {
            //                             uploadFilesTimes++
            //                             vm.uploadFilesArray = []
            //                             var aaa = {
            //                                 cdId: this.uploadUseData.courseId,
            //                                 groupId: 0,
            //                                 name: file.name,
            //                                 url: host + '/' + g_dirname + uploadFileName
            //                             }
            //                             this.uploadFilesArray.push(aaa)

            //                             $.ajax({
            //                                 url: baseURL + 'api/teacher/courseware/saveWithOssUrl',
            //                                 type: 'POST',
            //                                 contentType: 'application/json',
            //                                 headers: {
            //                                     token: token
            //                                 },
            //                                 data: JSON.stringify(this.uploadFilesArray),
            //                                 success: function(r) {
            //                                     vm.updataFiles = false
            //                                     if (r.status == 200) {
            //                                         vm.$message({
            //                                             type: 'success',
            //                                             message: '文件上传成功'
            //                                         })
            //                                         if (uploadFilesTimes === this.uploadFilesLength.length) {
            //                                             setInterval(function() {
            //                                                 window.location.reload()
            //                                             }, 1000)
            //                                         }
            //                                     }
            //                                 },
            //                                 error: function(er) {
            //                                     this.updataFiles = false
            //                                 }
            //                             })
            //                         } else {
            //                             document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info
            //                                 .response
            //                         }
            //                     },
            //                     Error: function(up, err) {
            //                         this.$message({
            //                             type: 'error',
            //                             message: '文件上传失败， 请刷新重试'
            //                         })
            //                         this.updataFiles = false
            //                         this.uploader = destroy()
            //                         this.uploadDropBoxDialog = false
            //                         this.uploadFilesLength = []
            //                     }
            //                 }
            //             })
            //             vm.uploader.init()
            //         }
            //     },
            //     error: function(er) {}
            // })
        },
        uploadDropBoxDialogClose: function() {
            this.uploadDropBoxDialog = false
            this.uploadFilesLength = []
            this.uploader.destroy()
        }

    }
}
</script>
<style scoped>
.myCourse{
    padding: 10px;
    margin-top: 50px;
}
.maskLoading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999999;
    /* display: none; */
}

.maskLoading .imgText {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 180px;
}

.maskLoading .imgText p {
    color: #fff;
    text-align: center;
}

[v-cloak] {
    display: none;
}
</style>
<style>
    .progress {
    margin-top: 2px;
    width: 100%;
    height: 14px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-bar {
    background-color: rgb(92, 184, 92);
    background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.14902) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.14902) 50%,
        rgba(255, 255, 255, 0.14902) 75%,
        transparent 75%,
        transparent
    );
    background-size: 40px 40px;
    box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    display: block;
    float: left;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    transition-delay: 0s;
    transition-duration: 0.6s;
    transition-property: width;
    transition-timing-function: ease;
    width: 100%;
}
</style>
