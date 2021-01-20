<template>
    <div v-loading="sellerDetail" class="sellerDetail">
        <transition name="el-fade-in-linear">
            <div v-cloak v-show="downloadFiles" class="maskLoading">
                <div class="imgText">
                    <img style="margin-left: 40%;" src="images/loading.gif" alt="">
                    <p>打包下载中，请耐心等待。<br>过程中请不要关闭或刷新浏览器！避免下载失败。</p>
                </div>
            </div>
        </transition>
        <el-row :gutter="20" style="margin:0;    background: #fff;" class="mid">
            <!-- background:#fff  style="background:#fff" style="background:#fff"-->
            <el-col id="leftContent" :span="12">
                <div class="grid-content bg-purple">
                    <p class="title">订单信息</p>
                    <div v-if='afterSaleRemark != null'>
                        <div class="grid-content bg-purple" v-for='(item, index) in afterSaleRemark'>
                            <span class="label">{{item.question}}</span>
                            <span style='color:#FF9900;font-weight: 600'>{{item.answer}}</span>
                        </div>
                        <p style="border-top:1px dashed #409EFF"></p>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">订单号:</span>
                        <span>{{ ruleForm1.orderNo }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">课程代码:</span>
                        <span>{{ ruleForm2.courseCode }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">订单状态:</span>
                        <span>{{ ruleForm1.statused }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">销售名称:</span>
                        <span>{{ ruleForm1.username }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">负责师资:</span>
                        <span>{{ ruleForm1.nickname }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">辅导讲师:</span>
                        <span>{{ ruleForm1.nickname1 }}</span>
                    </div>
                    <p style="border-top:1px dashed #409EFF" />
                    <div v-show="!typeOrder" class="grid-content bg-purple">
                        <span class="label">购买课时:</span>
                        <span>{{ ruleForm1.scheduledTime }} H</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">学生已上课时:</span>
                        <span>{{ ruleForm1.allSchooltime }} MIN</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">系统赠送时长:</span>
                        <span>{{ ruleForm1.persenterTime }} MIN</span>
                    </div>
                    <p style="border-top:1px dashed #409EFF" />
                    <div v-show="typeOrder" class="grid-content bg-purple">
                        <span class="label">字数:</span>
                        <span>{{ ruleForm1.wordsNum }} 字</span>
                    </div>
                    <p v-show="typeOrder" style="border-top:1px dashed #409EFF" />
                    <div class="grid-content bg-purple">
                        <span class="label">Deal Deadline:</span>
                        <span>{{ ruleForm.endCourseTime }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">Offcial Deadline:</span>
                        <span>{{ ruleForm.examTime }}</span>
                    </div>
                    <p style="border-top:1px dashed #409EFF" />
                    <div class="grid-content bg-purple">
                        <span class="label">师资费用(G):</span>
                        <span v-show="isKaoqiantuji == false">{{ ruleForm1.teacFixedPrice }}</span>
                        <span v-show="isKaoqiantuji == true">90.0</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">讲师已获(G):</span>
                        <span>{{ ruleForm1.prices1 }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">讲师已获(OTG):</span>
                        <span>{{ ruleForm1.prices2 }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">订单讲师时薪:</span>
                        <span>{{ ruleForm1.hourlyWage }}</span>
                        <span> G</span>
                    </div>
                    <p style="border-top:1px dashed #409EFF" />
                    <div v-if="isDingzhifudaoNew == false" class="grid-content bg-purple">
                        <span class="label">辅导需求:</span>
                        <span>{{ question }}</span>
                    </div>
                    <div v-if="isDingzhifudaoNew == true" class="grid-content bg-purple" style="clear: both">
                        <p v-for="(item, $index) in question" :key="$index" style="display: block;clear: both;margin: 10px 0">
                            <span style="color:#409EFF;font-weight: 600">{{ item.question }}</span>{{ item.answer }}
                        </p>
                    </div>
                    <p class="title" style="margin-top:20px!important">学生信息</p>
                    <div class="grid-content bg-purple">
                        <span class="label">姓名:</span>
                        <span>{{ ruleForm.nickname }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">学校名称:</span>
                        <span>{{ ruleForm.schoolName }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">专业:</span>
                        <span>{{ ruleForm.temCourseName }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">学历:</span>
                        <span>{{ ruleForm.levelName }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">学年:</span>
                        <span>{{ ruleForm.schoolYear }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">学校系统账号:</span>
                        <span>{{ ruleForm.schoolAccount }}</span>
                    </div>
                    <div class="grid-content bg-purple">
                        <span class="label">学校系统密码:</span>
                        <span>{{ ruleForm.schoolPws }}</span>
                    </div>
                </div>
            </el-col>
            <el-col id="rightContent" :span="12">
                <div style="background:#fff;padding: 10px;">
                    <p class="title">课件信息<a v-show="downfileTypeOtherBtn == true" style=" margin-left:20px;color:red;text-decoration:underline;cursor:pointer;" @click="downfileTypeOther">资料整理模板 / 编辑文件
                            下载</a>
                        <a v-show="downfileType4Btn == true" style=" margin-left:20px;color:red;text-decoration:underline;cursor:pointer;" type="primary" @click="downfileType4">论文大礼包模板 /
                            编辑文件
                            下载</a></p>
                    <div style="height:40px;padding-bottom:20px;margin-bottom:10px">
                        <div>
                            <p>
                                <el-button type="primary" :loading="downLoadChooseCourseLoading" title="选中你想下载的文件后点击" @click="downloadZip">选择批量下载</el-button>
                                <el-button type="warning" :loading="downloadAllCourseLoading" title="直接下载包含整个课件的压缩包" @click="checkBoxAll">下载全部课件</el-button>
                            </p>
                        </div>
                    </div>
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
                                        <div v-show="index == 2" style="color:#000000;padding-left:10px;">文件描述：{{it.description}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p class="title">作业： <el-button type="primary" @click="uploadDropbox">上传作业</el-button>
                    </p>
                    <!-- <div style="width:100%;height:1px;background:#000;"></div> -->
                    <!-- <div> -->
                    <ul style="margin:0;padding:0 0 0 10px;">
                        <li v-for="(item, $index) in dropBoxList" :key="$index" style="background:#fff;line-height:30px;border:none;">
                            <a style="text-decoration:none;color:#409EFF;cursor: pointer;" @click="downDropBox(item.url)">{{ item.name }}</a>
                        </li>
                    </ul>
                    <!-- </div> -->
                </div>
                <div style="background:#fff;padding:10px;margin:8px 0px 0 0;height:412px">
                    <p class="title">空余时间 (北京时间)</p>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">周一</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">上午:</span>
                                <span>{{ ruleForm2.am1 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">中午:</span>
                                <span>{{ ruleForm2.bm1 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">下午:</span>
                                <span>{{ ruleForm2.pm1 }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">周二</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">上午:</span>
                                <span>{{ ruleForm2.am2 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">中午:</span>
                                <span>{{ ruleForm2.bm2 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">下午:</span>
                                <span>{{ ruleForm2.pm2 }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">周三</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">上午:</span>
                                <span>{{ ruleForm2.am3 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">中午:</span>
                                <span>{{ ruleForm2.bm3 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">下午:</span>
                                <span>{{ ruleForm2.pm3 }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">周四</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">上午:</span>
                                <span>{{ ruleForm2.am4 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">中午:</span>
                                <span>{{ ruleForm2.bm4 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">下午:</span>
                                <span>{{ ruleForm2.pm4 }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">周五</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">上午:</span>
                                <span>{{ ruleForm2.am5 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">中午:</span>
                                <span>{{ ruleForm2.bm5 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">下午:</span>
                                <span>{{ ruleForm2.pm5 }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">周六</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">上午:</span>
                                <span>{{ ruleForm2.am6 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">中午:</span>
                                <span>{{ ruleForm2.bm6 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">下午:</span>
                                <span>{{ ruleForm2.pm6 }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">周日</div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">上午:</span>
                                <span>{{ ruleForm2.am7 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">中午:</span>
                                <span>{{ ruleForm2.bm7 }}</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <span class="label">下午:</span>
                                <span>{{ ruleForm2.pm7 }}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div style="background:#fff;padding:10px;margin:8px 0px;">
            <p class="title">课堂信息</p>
            <el-table :data="classroomdata" border style="width: 100%;margin-top:5px;background: #e5e9f2;">
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
                <el-table-column label="实际开始时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reaStartTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="实际结束时间" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.reaEndTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="上课时长" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.schooltime }}分</span>
                    </template>
                </el-table-column>
                <el-table-column label="赠送时长" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.presenterTime }}分</span>
                    </template>
                </el-table-column>
                <el-table-column label="评分" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.rate }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="revise(scope.row,scope.$index)">课堂记录</el-button>
          </template>
        </el-table-column> -->
            </el-table>
        </div>
        <el-dialog title="课堂记录" :visible.sync="dialogVisible" width="30%">
            <div v-for="(item, $index) in history" :key="$index" class="text item">
                <div>讲师 {{ item.nickname }} {{ item.joinTime }} 进入了课堂</div>
                <div>讲师 {{ item.nickname }} {{ item.leaveTime }} 离开了课堂</div>
                <div>持续了 {{ item.duration }} 分钟</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="uploadDropBoxDialog" width="50%">
            <div class="coursewaressssss">
                <div style="padding-left: 25px;margin-top:10px;">
                    <el-button id="selectfiles" type="primary">选择文件</el-button>
                    <div id="ossfile" style="padding: 10px 0;" />
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button id="postfiles" type="primary">上传</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import plupload from 'plupload'
export default {
    filters: {
        rounding(value) {
            return value.toFixed(2)
        },
        spliting(value) {
            return value.split(' ')[0]
        }
    },
    data() {
        return {
            afterSaleRemark: null,
            sellerDetail: false,
            uploadFilesArray: [],
            isKaoqiantuji: false,
            uploadDropBoxDialog: false,
            uploadUseData: {},
            uploadStatus: 'exception',
            uploadPercent: 20,
            showUploadProgress: false,
            span: 0,
            dropboxLoading: false,
            fileListnum: 0,
            fileList: [],
            uploadImgTimes: 0,
            formdata: new FormData(), // 创建一个上传图片用的new formdata
            downfileTypeOtherBtn: false,
            downfileType4Btn: false,
            dropBoxList: [],
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
            },
            checkedArray: [],
            checkedBoxAll: false,
            downloadAllCourseLoading: false,
            downLoadChooseCourseLoading: false,
            downloadFiles: false,
            coursesItem: [],
            question: '',
            isDingzhifudao: false,
            isDingzhifudaoNew: false,
            uploader: null
        }
    },
    mounted() {
        this.getclassroomdata()
        this.coursedata()
        this.sameHeight()
    },
    methods: {
        sameHeight() {
            const left = document.getElementById('leftContent').clientHeight
            const right = document.getElementById('rightContent').clientHeight
            console.log(left, right)
            // if (left > right) {
            //     document.getElementById('rightContent').style.height = left + 'px'
            //     document.getElementById('leftContent').style.borderRight = '10px solid #e5e9f2'
            // } else if (left < right) {
            //     document.getElementById('leftContent').style.height = right + 'px'
            //     document.getElementById('rightContent').style.borderLeft = '10px solid #e5e9f2'
            // }
        },
        downFiles: function(row) {
            window.open(row.url + '0000')
        },
        downloadZip: function() {
            var arr = JSON.stringify(this.checkedArray)
            this.downLoadChooseCourse(arr)
        },
        downLoadChooseCourse: function(urlArray) {
            // console.log(this.checkedArray);
            this.downloadFiles = true
            this.$message({
                type: 'success',
                message: '文件正在打包中...'
            })
            this.$axios({
                    url: this.$api.baseURL + '/resource/getZipFile',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'post',
                    data: urlArray
                })
                .then(r => {
                    this.downloadFiles = false
                    if (r.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '文件打包成功'
                        })
                        window.location.href =
                            this.$api.baseURL + r.data.body.filePath
                    } else {
                        this.$message({
                            type: 'warning',
                            message: r.data.body.msg
                        })
                    }
                })
                .catch(er => {
                    this.downloadFiles = false
                })
        },
        chooseDownLoadCheckBox: function(row) {
            console.log(row)
            row.checkbox = !row.checkbox
            // console.log(row.checkbox);
            if (row.checkbox == true) {
                this.checkedArray.push(row.url)
            } else {
                for (var i in this.checkedArray) {
                    if (this.checkedArray[i] == row.url) {
                        this.checkedArray.splice(i, 1)
                    }
                }
            }
        },
        checkBoxAll: function(val) {
            var checkedArray = []
            for (var i in this.coursesItem) {
                checkedArray.push(this.coursesItem[i].url)
            }
            var arr = JSON.stringify(checkedArray)
            this.downLoadChooseCourse(arr)
        },

        uploadDropbox: function() {
            this.uploadDropBoxDialog = true

            function GUID() {
                this.date = new Date() /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
                if (typeof this.newGUID !== 'function') {
                    /* 生成GUID码 */
                    GUID.prototype.newGUID = function() {
                        this.date = new Date()
                        let guidStr = ''
                        const sexadecimalDate = this.hexadecimal(
                            this.getGUIDDate(),
                            16
                        )
                        const sexadecimalTime = this.hexadecimal(
                            this.getGUIDTime(),
                            16
                        )
                        for (var i = 0; i < 9; i++) {
                            guidStr += Math.floor(Math.random() * 16).toString(
                                16
                            )
                        }
                        guidStr += sexadecimalDate
                        guidStr += sexadecimalTime
                        while (guidStr.length < 32) {
                            guidStr += Math.floor(Math.random() * 16).toString(
                                16
                            )
                        }
                        return this.formatGUID(guidStr)
                    }
                    /* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDDate = function() {
                        return (
                            this.date.getFullYear() +
                            this.addZero(this.date.getMonth() + 1) +
                            this.addZero(this.date.getDay())
                        )
                    }
                    /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDTime = function() {
                        return (
                            this.addZero(this.date.getHours()) +
                            this.addZero(this.date.getMinutes()) +
                            this.addZero(this.date.getSeconds()) +
                            this.addZero(
                                parseInt(this.date.getMilliseconds() / 10)
                            )
                        )
                    }
                    /* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
                    GUID.prototype.addZero = function(num) {
                        if (
                            Number(num).toString() != 'NaN' &&
                            num >= 0 &&
                            num < 10
                        ) {
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

            let uploadFilesNo = 0
            let uploadFilesTimes = 0
            let accessid = ''
            let host = ''
            let policyBase64 = ''
            let signature = ''
            let g_dirname = ''
            let uploadFileName = ''
            const guid = new GUID()
            const ids = this.$route.query.id
            this.$axios({
                    url: this.$api.baseURL +
                        'api/oss/getAliOSSUploadSign?dir=' +
                        'courseware/' +
                        guid.newGUID() +
                        '/'
                })
                .then(r => {
                    if (r.data.status == 200) {
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
                                key: g_dirname + filename,
                                policy: policyBase64,
                                OSSAccessKeyId: accessid,
                                success_action_status: '200', // 让服务端返回200,不然，默认会返回204
                                signature: signature
                            }

                            up.setOption({
                                url: host,
                                multipart_params: new_multipart_params
                            })

                            up.start()
                        }
                        const _this = this
                        this.uploader = new plupload.Uploader({
                            runtimes: 'html5,flash,silverlight,html4',
                            browse_button: 'selectfiles',
                            // multi_selection: false,
                            // container: document.getElementById('container'),
                            // flash_swf_url: "js/Moxie.swf",
                            // silverlight_xap_url: "js/Moxie.xap",
                            url: 'http://oss.aliyuncs.com',
                            init: {
                                PostInit: function() {
                                    document.getElementById(
                                        'ossfile'
                                    ).innerHTML = ''
                                    document.getElementById(
                                        'postfiles'
                                    ).onclick = function() {
                                        // if (vm.getCourseData.course != '') {
                                        set_upload_param(
                                            _this.uploader,
                                            '',
                                            false
                                        )
                                        return false
                                        // } else {
                                        //  vm.$message({
                                        //    type: 'error',
                                        //    message: '请选择要上传的课件组'
                                        //  })
                                        // }
                                    }
                                },
                                FilesAdded: function(up, files) {
                                    console.log(files)
                                    uploadFilesNo = files.length
                                    plupload.each(files, function(file) {
                                        document.getElementById(
                                                'ossfile'
                                            ).innerHTML +=
                                            '<div id="' +
                                            file.id +
                                            '" style="padding: 10px 0;">' +
                                            file.name +
                                            ' (' +
                                            plupload
                                            .formatSize(file.size)
                                            .split(' ')[0] +
                                            plupload
                                            .formatSize(file.size)
                                            .split(' ')[1]
                                            .toUpperCase() +
                                            ')<b></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>'
                                    })
                                    _this.uploadFileActive = 2
                                },

                                BeforeUpload: function(up, file) {
                                    set_upload_param(up, file.name, true)
                                },

                                UploadProgress: function(up, file) {
                                    _this.updataFiles = true
                                    var d = document.getElementById(file.id)
                                    d.getElementsByClassName(
                                        'progress'
                                    )[0].style.display = 'block'
                                    d.getElementsByTagName('b')[0].innerHTML =
                                        '<span style="display:inline-block;padding-left:10px;">' +
                                        file.percent +
                                        '%</span>'
                                    var prog = d.getElementsByTagName('div')[0]
                                    var progBar = prog.getElementsByTagName(
                                        'div'
                                    )[0]
                                    progBar.style.width = file.percent + '%'
                                    progBar.setAttribute(
                                        'aria-valuenow',
                                        file.percent
                                    )
                                },
                                FileUploaded: function(up, file, info) {
                                    if (info.status == 200) {
                                        // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传准备完成，等待上传';
                                        // console.log(host + '/' + g_dirname + file.name);
                                        uploadFilesTimes++
                                        var aaa = {
                                            cdId: _this.$route.query.id,
                                            groupId: 0,
                                            name: file.name,
                                            url: host +
                                                '/' +
                                                g_dirname +
                                                uploadFileName
                                        }
                                        _this.uploadFilesArray.push(aaa)
                                        if (
                                            uploadFilesTimes === uploadFilesNo
                                        ) {
                                            _this
                                                .$axios({
                                                    method: 'post',
                                                    url: _this.$api.baseURL +
                                                        'api/teacher/courseware/saveWithOssUrl',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    data: JSON.stringify(
                                                        _this.uploadFilesArray
                                                    )
                                                })
                                                .then(e => {
                                                    _this.updataFiles = false
                                                    if (r.status == 200) {
                                                        _this.$message({
                                                            type: 'success',
                                                            message: '文件上传成功'
                                                        })
                                                        setInterval(function() {
                                                            window.location.reload()
                                                        }, 1000)
                                                    }
                                                })
                                                .catch(er => {
                                                    _this.updataFiles = false
                                                })
                                        }
                                    } else {
                                        document
                                            .getElementById(file.id)
                                            .getElementsByTagName(
                                                'b'
                                            )[0].innerHTML = info.response
                                    }
                                },

                                Error: function(up, err) {
                                    _this.$message({
                                        type: 'error',
                                        message: '文件上传失败， 请刷新重试'
                                    })

                                    _this.updataFiles = false
                                    // document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                                    // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '文件上传失败';
                                }
                            }
                        })

                        this.uploader.init()
                    }
                })
                .catch(er => {})
        },

        downfileTypeOther: function() {
            window.open(
                'https://classbro-oss.oss-cn-hongkong.aliyuncs.com/statice-resource/%E8%B5%84%E6%96%99%E6%95%B4%E7%90%86%E6%A8%A1%E6%9D%BF.zip'
            )
        },
        downfileType4: function() {
            window.open(
                'https://classbro-oss.oss-cn-hongkong.aliyuncs.com/statice-resource/%E8%AE%BA%E6%96%87%E5%A4%A7%E7%A4%BC%E5%8C%85%EF%BC%88%E5%8C%85%E6%8B%AC%E5%A4%A7%E8%AE%BA%E6%96%87%EF%BC%89(1).zip'
            )
        },
        downDropBox: function(url) {
            window.open(url)
        },

        // check(val) {
        //     if (val == true) {
        //         $('.checkbox').prop('checked', true)
        //     } else {
        //         $('.checkbox').prop('checked', false)
        //     }
        // },
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
                console.log(this.courses)
            })
        },

        // downfile() {
        //     this.$message({
        //         message: '文件正在服务器打包,请耐心等待,不要刷新页面',
        //         type: 'success'
        //     })
        //     vm.btnstatus = true
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
        //                 vm.btnstatus = false
        //                 vm.$message({
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
        //             url: '' + baseURL + 'api/teacher/courseware/delete',
        //             success: function(json) {
        //                 vm.$message({
        //                     type: 'success',
        //                     message: '删除成功!'
        //                 })
        //                 vm.getclassroomdata()
        //             }
        //         })
        //     }).catch(() => {})
        // },
        getclassroomdata: function() {
            // const getUrlStr = function(name) {
            //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            //     var r = window.location.hash.substr(1).match(reg)
            //     if (r != null) return unescape(r[2])
            //     return null
            // }
            // var id = getUrlStr('id')
            var id = this.$route.query.id
            this.sellerDetail = true
            this.$axios({
                url: this.$api.baseURL +
                    'api/teacher/order/getCourseObject?id=' +
                    id +
                    '',
                params: {
                    page: 1,
                    limit: 6,
                    exceptionType: ''
                }
            }).then(r => {
                this.afterSaleRemark = JSON.parse(r.data.body.afterSaleRemark)
                this.sellerDetail = false
                this.question = r.data.body.studPurchaseOrder.sellerDemandDesc
                if (r.data.body.studPurchaseOrder.type === 0 || r.data.body.studPurchaseOrder.type === 1 || r.data.body.studPurchaseOrder.type === 4) {
                    this.cailiaofei = false
                    this.isDingzhifudao = true
                    if (r.data.body.studPurchaseOrder.orderQuestions == null) {
                        this.isDingzhifudaoNew = false
                    } else {
                        this.isDingzhifudaoNew = true
                        this.question =
                            r.data.body.studPurchaseOrder.orderQuestions
                    }
                }

                this.dropBoxList = r.data.body.dropBoxList
                this.ruleForm1.hourlyWage = r.data.body.hourlyWage
                this.classroomdata = r.data.body.classroomList
                this.studCoursewareList = r.data.body.studCoursewareList
                this.studdate = r.data.body.studUser
                this.filelist = r.data.body.studCoursewareList
                this.ruleForm1.orderNo = r.data.body.orderNo
                this.ruleForm1.remark = r.data.body.remark
                this.ruleForm1.scheduledTime =
                    r.data.body.studPurchaseOrder.scheduledTime
                this.ruleForm1.allSchooltime = r.data.body.allSchooltime
                this.ruleForm1.totalPrice =
                    r.data.body.studPurchaseOrder.totalPrice +
                    ' ' +
                    r.data.body.studPurchaseOrder.currency
                this.ruleForm1.prepayment =
                    r.data.body.studPurchaseOrder.prepayment +
                    ' ' +
                    r.data.body.studPurchaseOrder.currency
                this.ruleForm1.prices1 =
                    Number(r.data.body.teacG) + Number(r.data.body.teacPreG)
                this.ruleForm1.prices2 =
                    Number(r.data.body.teacOtg) +
                    Number(r.data.body.teacPreOtg)
                this.ruleForm1.sellerDemandDesc =
                    r.data.body.studPurchaseOrder.sellerDemandDesc
                this.ruleForm2.spareTime =
                    r.data.body.studPurchaseOrder.spareTime
                if (this.ruleForm2.spareTime != null) {
                    var spareTime = r.data.body.studPurchaseOrder.spareTime.split(
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
                if (r.data.body.statused == 1) {
                    this.ruleForm1.statused = '未处理（无任何销售接单）'
                }
                if (r.data.body.statused == 2) {
                    this.ruleForm1.statused = '待审核'
                }
                if (r.data.body.statused == 4) {
                    this.ruleForm1.statused = '待确定'
                }
                if (r.data.body.statused == 8) {
                    this.ruleForm1.statused = '待规划（等待教师/运营接单）'
                }
                if (r.data.body.statused == 16) {
                    this.ruleForm1.statused =
                        '规划中(订单第一次超时等待运营接单)'
                }
                if (r.data.body.statused == 32) {
                    this.ruleForm1.statused =
                        '规划中(订单第二次超时等待运营主管强制指派)'
                }
                if (r.data.body.statused == 64) {
                    this.ruleForm1.statused =
                        '规划中(运营接单待指派，正在处理)'
                }
                if (r.data.body.statused == 128) {
                    this.ruleForm1.statused = '待排课'
                }
                if (r.data.body.statused == 256) {
                    this.ruleForm1.statused = '已排课'
                }
                if (r.data.body.statused == 512) {
                    this.ruleForm1.statused = '申请结课中'
                }
                if (r.data.body.statused == 1024) {
                    this.ruleForm1.statused = '已结课'
                }
                if (r.data.body.statused == 2048) {
                    this.ruleForm1.statused = '已强制结课'
                }
                if (r.data.body.statused == 4096) {
                    this.ruleForm1.statused = '已取消'
                }
                if (r.data.body.statused == 8192) {
                    this.ruleForm1.statused = '坏单申请中'
                }
                if (r.data.body.statused == 16384) {
                    this.ruleForm1.statused = '订单作废'
                }
                if (r.data.body.statused == 32768) {
                    this.ruleForm1.statused = '销售被更换'
                }
                if (r.data.body.statused == 65536) {
                    this.ruleForm1.statused = '事故单申请中'
                }
                if (r.data.body.statused == 131072) {
                    this.ruleForm1.statused = '讲师已更换'
                }
                if (r.data.body.statused == 262144) {
                    this.ruleForm1.statused = '事故单更换教师待委派'
                }
                this.ruleForm1.username = r.data.body.sysSeller.username
                this.ruleForm1.nickname = r.data.body.sysUserEntity.username
                this.ruleForm1.nickname1 = r.data.body.teacUser.username
                this.ruleForm1.teacFixedPrice = r.data.body.teacFixedPrice

                this.ruleForm2.courseName =
                    r.data.body.studPurchaseOrder.courseName
                this.ruleForm2.courseCode =
                    r.data.body.studPurchaseOrder.courseCode
                if (r.data.body.studPurchaseOrder.type == 0) {
                    this.ruleForm2.type = '定制辅导'
                    this.downfileType4Btn = false
                    this.downfileTypeOtherBtn = false
                }
                if (r.data.body.studPurchaseOrder.type == 1) {
                    this.ruleForm2.type = '考前突击'
                    this.downfileType4Btn = false
                    this.downfileTypeOtherBtn = true
                    this.isKaoqiantuji = true
                }
                if (r.data.body.studPurchaseOrder.type == 2) {
                    this.ruleForm2.type = '包课辅导'
                    this.downfileType4Btn = false
                    this.downfileTypeOtherBtn = true
                }
                if (r.data.body.studPurchaseOrder.type == 4) {
                    this.ruleForm2.type = '论文辅导'
                    this.downfileType4Btn = true
                    this.downfileTypeOtherBtn = false
                }
                if (r.data.body.studPurchaseOrder.type == 32) {
                    this.ruleForm2.type = '特殊订单'
                    this.downfileType4Btn = false
                    this.downfileTypeOtherBtn = true
                }
                this.ruleForm.nickname = r.data.body.studUser.nickName
                this.ruleForm.schoolName = r.data.body.sysUniversity.name
                this.ruleForm.temCourseName =
                    r.data.body.sysProfessionalCourses.chineseName
                this.ruleForm.levelName = r.data.body.studUser.eduName
                this.ruleForm.schoolYear =
                    r.data.body.studPurchaseOrder.schoolYear
                this.ruleForm.endCourseTime =
                    r.data.body.studPurchaseOrder.endCourseTime
                this.ruleForm.examTime = r.data.body.studPurchaseOrder.examTime
                this.ruleForm.schoolAccount =
                    r.data.body.studPurchaseOrder.schoolAccount
                this.ruleForm.schoolPws =
                    r.data.body.studPurchaseOrder.schoolPws
                // const studCoursewareList = r.data.body.studCoursewareList
                // var groupName = studCoursewareList.groupName
                // style='display:inline-block;max-width:300px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                this.coursesItem = JSON.parse(
                    JSON.stringify(r.data.body.studCoursewareList)
                )
                for (var i in this.coursesItem) {
                    this.coursesItem[i].checkbox = false
                }

                // console.log(this.coursesItem)
            })
        }
    }
}

</script>
<style scope>
.mid {
    position: relative
}

.mid::before {
    content: '';
    display: block;
    width: 8px;
    position: absolute;
    left: 49%;
    top: 0;
    height: 100%;
    background: #E5E9F2;

}

.sellerDetail {
    padding: 10px;
    background: #e5e9f2;
    /* margin-top: 50px; */
}

#leftContent {}

#rightContent {}

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
    /* height: 46px; */
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
    padding: 10px 15px 10px 10px;
    box-sizing: border-box;
}

.el-table__empty-block {
    background: #fff;
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
    background-image: linear-gradient(45deg,
        rgba(255, 255, 255, 0.14902) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.14902) 50%,
        rgba(255, 255, 255, 0.14902) 75%,
        transparent 75%,
        transparent);
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
