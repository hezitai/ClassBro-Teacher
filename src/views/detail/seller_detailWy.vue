<template>
  <div
    v-loading="sellerDetailWy"
    class="sellerDetail"
  >
    <el-row
      :gutter="20"
      style="margin:0;"
    >
      <el-col
        id="leftdiv"
        :span="12"
      >
        <div class="grid-content bg-purple">
          <div class="grid-content bg-purple">
            <span class="label">订单号:</span>
            <span>{{ wyorder.order_name }}</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">课程代码:</span>
            <span>{{ wyorder.course_code }}</span>
          </div>
          <p style="border-top:1px dashed #409EFF" />

          <div class="grid-content bg-purple">
            <span class="label">字数:</span>
            <span>{{ wyorder.word_count }} 字</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">Deadline:</span>
            <span>{{ wyorder.deadline }}</span>
          </div>
          <p style="border-top:1px dashed #409EFF" />

          <div class="grid-content bg-purple">
            <span class="label">师资费用(G):</span>
            <span>{{ wyorder.moon }}G</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">辅导需求:</span>
            <span>{{ wyorder.client_message }}</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">Reference Style:</span>
            <span>{{ wyorder.reference_style }}</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">Reference Guide:</span>
            <span
              v-if="wyorder.reference_guide!=null"
              style="color:#408EF4;font-weight:600; cursor: pointer;"
              @click="downFile(wyorder.reference_guide.file_path)"
            >{{ wyorder.reference_guide.real_name }}</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">学校名称:</span>
            <span>{{ wyorder.university }}</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">学校网址:</span>
            <span>{{ wyorder.university_url }}</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">学校系统账号:</span>
            <span>{{ wyorder.blackboard_id }}</span>
          </div>
          <div class="grid-content bg-purple">
            <span class="label">学校系统密码:</span>
            <span>{{ wyorder.password }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <p class="title">课程流水</p>
          <ul
            id="logs"
            style="min-height:443px;max-height:443px;overflow-y:scroll;"
          >
            <li
              v-for="(item, index) in wylog"
              :key="index"
              class="clears"
            >
              <i style="margin-right:10px;">{{ item.created_at }}</i><i>{{ item.name }} {{ item.username }}
                {{ item.info }} </i>
            </li>
          </ul>
        </div>

      </el-col>
    </el-row>

    <div style="background:#fff;padding:10px;margin:8px 10px;">
      <div style="padding:20px;border:1px solid #ccc;margin-top: 20px;">
        <p class="title">课件信息</p>

        <div>
          <p>lecture_notes：</p>
          <div
            v-for="(item, key, index) in wyorder.upload.lecture_notes"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
          <p>original_work：</p>
          <div
            v-for="(item,key, index) in wyorder.upload.original_work"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
          <p>other_materials：</p>
          <div
            v-for="(item,key, index) in wyorder.upload.other_materials"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
          <p>personal_information：</p>
          <div
            v-for="(item,key, index) in wyorder.upload.personal_information"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
          <p>requirement：</p>
          <div
            v-for="(item,key, index) in wyorder.upload.requirement"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
          <p>samples：</p>
          <div
            v-for="(item,key, index) in wyorder.upload.samples"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
          <p>suggested_readings：</p>
          <div
            v-for="(item,key, index) in wyorder.upload.suggested_readings"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
          <p>unit_guide：</p>
          <div
            v-for="(item,key, index) in wyorder.upload.unit_guide"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;padding-left:10px;"
              @click="down(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
        </div>
      </div>

      <div style="padding:20px;border:1px solid #ccc;margin-top: 20px;">
        <p class="title">Dropbox</p>
        <div>
          <div
            v-for="(item,index) in dropboxList"
            :key="index"
          >
            <p
              :key="index"
              style="cursor :pointer;color:#408EF4;font-weight: 600;"
              @click="downDropbox(item.file_path,item.real_name)"
            >{{ item.real_name }} <span style="color:#333;font-weight: 400;padding-left: 5px">{{ item.created_at }}</span>
            </p>
          </div>
        </div>
      </div>

    </div>
    <el-dialog
      title="课堂记录"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div
        v-for="(item, $index) in history"
        :key="$index"
        class="text item"
      >
        <div>{{ item.suerrole }} {{ item.nickname }} {{ item.joinTime }} 进入了课堂</div>
        <div>{{ item.suerrole }} {{ item.nickname }} {{ item.leaveTime }} 离开了课堂</div>
        <div>持续了 {{ item.duration }} 分钟</div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <div style="background:#fff;padding:10px;margin:8px 10px;" />
  </div>
</template>
<script>
export default {
    data() {
        return {
            sellerDetailWy: false,
            dropboxList: [],
            wyactiveNames: null,
            wylog: null,
            wyassociated: null,
            wyorder: {
                upload: []
            },
            iswy: false,
            wyid: null,
            typeOrder: true,
            cailiaofei: true,

            history: '',
            dialogVisible: false,
            checked: false,
            courses: '',
            urls: [],
            id: '',
            btnstatus: false,
            classroomdata: [],
            studCoursewareList: [],
            filelist: [],
            ruleForm: {
                course: ''
            },
            ruleForm1: {
                username: '',
                nickname: '',
                sellerDemandDesc: '',
                hourlyWage: ''
            },
            ruleForm2: {
                courseCode: '',
                courseName: '',
                type: ''
            }
        }
    },
    mounted() {
        this.getclassroomdata()
        this.coursedata()
    },
    methods: {
        downDropbox: function(path, name) {
            window.open(path)
        },

        down(url, fileName) {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.onload = function() {
                var blob = this.response
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName)
                } else {
                    var link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = window.URL.createObjectURL(blob)
                    link.download = fileName
                    link.click()
                    window.URL.revokeObjectURL(link.href)
                }
            }
            xhr.ontimeout = function(e) {}
            xhr.onerror = function(e) {}
            xhr.send()
        },
        revise(row, index) {
            this.$axios({
                url:
                    this.$api.baseURL +
                    'api/teacher/order/getClassroomConversation',
                params: {
                    classroomId: row.id
                }
            }).then(r => {
                this.history = []
                if (r.data.status == 400) {
                    this.dialogVisible = true
                    return
                } else {
                    this.dialogVisible = true
                    function timestampToTime(timestamp) {
                        var date = new Date(timestamp)
                        var Y = date.getFullYear() + '-'
                        var M =
                            (date.getMonth() + 1 < 10
                                ? '0' + (date.getMonth() + 1)
                                : date.getMonth() + 1) + '-'
                        var D = date.getDate() + ' '
                        var h = date.getHours() + ':'
                        var m = date.getMinutes() + ':'
                        var s = date.getSeconds()
                        return Y + M + D + h + m + s
                    }
                    var ess = []
                    for (var i = 0; i < r.data.body.list.length; i++) {
                        var es = []
                        var joinTime = timestampToTime(
                            r.data.body.list[i].joinTime
                        )
                        var leaveTime = timestampToTime(
                            r.data.body.list[i].leaveTime
                        )
                        var userroleid = r.data.body.list[i].userroleid
                        var suerrole = ''
                        if (userroleid == '0') {
                            suerrole = '讲师'
                        } else if (userroleid == '1') {
                            suerrole = '助教'
                        } else if (userroleid == 2) {
                            suerrole = '学员'
                        } else if (userroleid == '3') {
                            suerrole = '直播用户'
                        } else {
                            suerrole = '巡检员'
                        }
                        var m = r.data.body.list[i].duration
                        var duration = m / 60
                        var durations
                        durations = duration.toFixed(2)
                        es.nickname = r.data.body.list[i].nickname
                        es.joinTime = joinTime
                        es.suerrole = suerrole
                        es.duration = durations
                        es.leaveTime = leaveTime
                        ess.push(es)
                    }
                    this.history = ess
                    console.log(this.history)
                }
            })

            this.dialogVisible = true
        },
        success(response, file, fileList) {
            if (response.status == 200) {
                this.$message({
                    message: '上传文件成功',
                    type: 'success'
                })
                this.fileList = []
                // $('.ul').empty()
                this.getclassroomdata()
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
        check(val) {
            if (val == true) {
                $('.checkbox').prop('checked', true)
            } else {
                $('.checkbox').prop('checked', false)
            }
        },
        coursedata() {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/courseware/groupList',
                params: {
                    page: 1,
                    limit: 1000
                }
            }).then(r => {
                if (r.data.status == 200) {
                    var lists = []
                    r.data.body.list.forEach(function(element) {
                        var list = {}
                        list.groupName = element.groupName
                        list.name = element.groupName.split(' ')[0]
                        list.id = element.id
                        lists.push(list)
                    })
                    this.courses = lists
                }
            })
        },
        change_course(courseid) {
            this.data.groupId = courseid
        },
        downFile(url) {
            window.open(url)
        },
        getclassroomdata: function() {
            // return null
            // }
            var ids = this.$route.query.id

            this.wyid = this.$route.query.wyid

            this.$axios({
                url:
                    this.$api.baseURL +
                    'api/teacher/order/queryWyardOrderInfo?courseId=' +
                    ids
            }).then(r => {
                this.dropboxList = r.data.data.order.completed_work
                this.wyorder = r.data.data.order
                this.wyassociated = r.data.data.associated
                this.wylog = r.data.data.log
                this.wyactiveNames = r.data.data.order.activeNames
            })
            this.$axios({
                url:
                    this.$api.baseURL + 'api/teacher/order/getCourseObject?id=' + ids + '',
                params: {
                    page: 1,
                    limit: 6,
                    exceptionType: ''
                }
            }).then(r => {
                var json = r.data
                if (json.body.studPurchaseOrder.type == '0') {
                    this.cailiaofei = false
                }
                this.ruleForm1.hourlyWage = json.body.hourlyWage
                this.classroomdata = json.body.classroomList
                this.studCoursewareList = json.body.studCoursewareList
                this.studdate = json.body.studUser
                this.filelist = json.body.studCoursewareList
                this.ruleForm1.orderNo = json.body.orderNo
                this.ruleForm1.remark = json.body.remark
                this.ruleForm1.scheduledTime =
                        json.body.studPurchaseOrder.scheduledTime
                this.ruleForm1.allSchooltime = json.body.allSchooltime
                this.ruleForm1.totalPrice =
                        json.body.studPurchaseOrder.totalPrice +
                        ' ' +
                        json.body.studPurchaseOrder.currency
                this.ruleForm1.prepayment =
                        json.body.studPurchaseOrder.prepayment +
                        ' ' +
                        json.body.studPurchaseOrder.currency
                this.ruleForm1.prices1 =
                        Number(json.body.teacG) + Number(json.body.teacPreG)
                this.ruleForm1.prices2 =
                        Number(json.body.teacOtg) +
                        Number(json.body.teacPreOtg)
                this.ruleForm1.sellerDemandDesc =
                        json.body.studPurchaseOrder.sellerDemandDesc
                this.ruleForm2.spareTime =
                        json.body.studPurchaseOrder.spareTime
                if (this.ruleForm2.spareTime != null) {
                    var spareTime = json.body.studPurchaseOrder.spareTime.split(
                        '|'
                    )
                    var one = spareTime[0]
                    var ones = one.split(',')
                    this.ruleForm2.am1 = ones[0]
                    this.ruleForm2.bm1 = ones[1]
                    this.ruleForm2.pm1 = ones[2]
                    var two = spareTime[1]
                    var twos = two.split(',')
                    this.ruleForm2.am2 = twos[0]
                    this.ruleForm2.bm2 = twos[1]
                    this.ruleForm2.pm2 = twos[2]
                    var three = spareTime[2]
                    var threes = three.split(',')
                    this.ruleForm2.am3 = threes[0]
                    this.ruleForm2.bm3 = threes[1]
                    this.ruleForm2.pm3 = threes[2]
                    var four = spareTime[3]
                    var fours = four.split(',')
                    this.ruleForm2.am4 = fours[0]
                    this.ruleForm2.bm4 = fours[1]
                    this.ruleForm2.pm4 = fours[2]
                    var five = spareTime[4]
                    var fives = five.split(',')
                    this.ruleForm2.am5 = fives[0]
                    this.ruleForm2.bm5 = fives[1]
                    this.ruleForm2.pm5 = fives[2]
                    var six = spareTime[5]
                    var sixs = six.split(',')
                    this.ruleForm2.am6 = sixs[0]
                    this.ruleForm2.bm6 = sixs[1]
                    this.ruleForm2.pm6 = sixs[2]
                    var seven = spareTime[6]
                    var sevens = seven.split(',')
                    this.ruleForm2.am7 = sevens[0]
                    this.ruleForm2.bm7 = sevens[1]
                    this.ruleForm2.pm7 = sevens[2]
                }
                if (json.body.statused == 1) {
                    this.ruleForm1.statused = '未处理（无任何销售接单）'
                }
                if (json.body.statused == 2) {
                    this.ruleForm1.statused = '待审核'
                }
                if (json.body.statused == 4) {
                    this.ruleForm1.statused = '待确定'
                }
                if (json.body.statused == 8) {
                    this.ruleForm1.statused = '待规划（等待教师/运营接单）'
                }
                if (json.body.statused == 16) {
                    this.ruleForm1.statused =
                            '规划中(订单第一次超时等待运营接单)'
                }
                if (json.body.statused == 32) {
                    this.ruleForm1.statused =
                            '规划中(订单第二次超时等待运营主管强制指派)'
                }
                if (json.body.statused == 64) {
                    this.ruleForm1.statused =
                            '规划中(运营接单待指派，正在处理)'
                }
                if (json.body.statused == 128) {
                    this.ruleForm1.statused = '待排课'
                }
                if (json.body.statused == 256) {
                    this.ruleForm1.statused = '已排课'
                }
                if (json.body.statused == 512) {
                    this.ruleForm1.statused = '申请结课中'
                }
                if (json.body.statused == 1024) {
                    this.ruleForm1.statused = '已结课'
                }
                if (json.body.statused == 2048) {
                    this.ruleForm1.statused = '已强制结课'
                }
                if (json.body.statused == 4096) {
                    this.ruleForm1.statused = '已取消'
                }
                if (json.body.statused == 8192) {
                    this.ruleForm1.statused = '坏单申请中'
                }
                if (json.body.statused == 16384) {
                    this.ruleForm1.statused = '订单作废'
                }
                if (json.body.statused == 32768) {
                    this.ruleForm1.statused = '销售被更换'
                }
                if (json.body.statused == 65536) {
                    this.ruleForm1.statused = '事故单申请中'
                }
                if (json.body.statused == 131072) {
                    this.ruleForm1.statused = '事故单已处理'
                }
                if (json.body.statused == 262144) {
                    this.ruleForm1.statused = '事故单更换教师'
                }
                this.ruleForm1.username = json.body.sysSeller.username
                this.ruleForm1.nickname = json.body.sysUserEntity.username
                this.ruleForm1.nickname1 = json.body.teacUser.username
                this.ruleForm1.teacFixedPrice = json.body.teacFixedPrice

                this.ruleForm2.courseName =
                        json.body.studPurchaseOrder.courseName
                this.ruleForm2.courseCode =
                        json.body.studPurchaseOrder.courseCode
                if (json.body.studPurchaseOrder.type == 0) {
                    this.ruleForm2.type = '定制辅导'
                }
                if (json.body.studPurchaseOrder.type == 1) {
                    this.ruleForm2.type = '考前突击'
                }
                if (json.body.studPurchaseOrder.type == 2) {
                    this.ruleForm2.type = '包课辅导'
                }
                if (json.body.studPurchaseOrder.type == 4) {
                    this.ruleForm2.type = '论文辅导'
                }
                if (json.body.studPurchaseOrder.type == 32) {
                    this.ruleForm2.type = '特殊订单'
                }
                this.ruleForm.nickname = json.body.studUser.nickName
                this.ruleForm.schoolName = json.body.sysUniversity.name
                this.ruleForm.temCourseName =
                        json.body.sysProfessionalCourses.chineseName
                this.ruleForm.levelName = json.body.studUser.eduName
                this.ruleForm.schoolYear =
                        json.body.studPurchaseOrder.schoolYear
                this.ruleForm.endCourseTime =
                        json.body.studPurchaseOrder.endCourseTime
                this.ruleForm.examTime = json.body.studPurchaseOrder.examTime
                this.ruleForm.schoolAccount =
                        json.body.studPurchaseOrder.schoolAccount
                this.ruleForm.schoolPws =
                        json.body.studPurchaseOrder.schoolPws
            })
        }
    }
}
</script>
<style scope>
.sellerDetail {
    padding: 10px;
    background: #e5e9f2;
    /* margin-top: 50px; */
}
.el-dialog__wrapper {
    left: 0 !important;
}

.demo-ruleForm {
    width: 100%;
}

.demo-ruleForm .el-form-item {
    width: 33%;
    float: left;
}

.clears:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}

.grid-content:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
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
    transition: 0.1s;
    border: 1px solid #dcdfe6;
    float: right;
}

.view {
    color: #409eff;
    cursor: pointer;
}

#logs li {
    font-size: 14px !important;
    border-bottom: 1px solid #ddd;
    height: 25px !important;
    line-height: 25px !important;
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

