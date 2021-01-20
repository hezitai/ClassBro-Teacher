<template>
  <div class="historyLessons">
    <div v-loading="historyLessons">
      <transition name="el-fade-in-linear">
        <div
          v-cloak
          v-if="updataFiles"
          class="maskLoading"
        >
          <div class="imgText">
            <img
              style="margin-left: 40%;"
              src="../../assets/images/loading.gif"
              alt=""
            >
            <p>文件较大或上行网速较慢，请耐心等待上传。<br>过程中请不要关闭或刷新浏览器！避免上传失败。<br>上传成功后页面自动刷新</p>
          </div>
        </div>
      </transition>
      <el-input
        v-model="tableDataName"
        placeholder="请输入关键字"
        style="width:240px"
      />
      
        <!-- @keydown="search" -->
      <el-button
        type="primary"
        @click="search"
      >搜索</el-button>
      <el-table
        ref="multipleTable"
        :data="tableDataEnd"
        border
        style="width: 100%;margin-top:5px;"
      >
        <!-- @selection-change="handleSelectionChange" -->
        <!-- <el-table-column
            type="selection"
            width="50">
          </el-table-column> -->
        <el-table-column
          label="订单号"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <span
              style="color:#409EFF;cursor: pointer;"
              @click="apply(scope.row,scope.$index)"
            >{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总上课时长(min)"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.allSchooltime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总赠送时长(min)"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.allPresenterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="apply(scope.row,scope.$index)">查看详情</el-button> -->
            <el-button
              size="mini"
              @click="uploadDropbox(scope.row,scope.$index)"
            >提交作业</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :visible.sync="uploadDropBoxDialog"
        width="50%"
        :before-close="uploadDropBoxDialogClose"
      >

        <div style="padding-left: 25px;margin-top:10px;">
          <el-button
            id="selectfiles"
            type="primary"
          >选择文件</el-button>
          <div
            id="ossfile"
            style="padding: 10px 0;"
          />

        </div>

        <span
          slot="footer"
          class="dialog-footer"
        >

          <el-button
            id="postfiles"
            type="primary"
          >上传</el-button>
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
import plupload from 'plupload'
export default {
    data() {
        return {
            uploader: null,
            uploadFilesLength: [],
            uploadButtonEvent: null,
            uploadFilesArray: [],
            formdata: new FormData(), // 创建一个上传图片用的new formdata
            updataFiles: false,
            uploadImgTimes: 0,
            uploadUseData: {},
            showUploadProgress: false,
            uploadStatus: 'exception',
            uploadPercent: 20,
            dropboxLoading: false,

            uploadDropBoxDialog: false,
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
            ruleForm: {},
            historyLessons: false
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData()
        this.searchEnter()
    },

    methods: {
        searchEnter(){
            const _this = this
           document.onkeydown = function (event) {
                if (event.keyCode == 13) {
                    _this.search();
                }
            }; 
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
                        const sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16)
                        const sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16)
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
                        const str1 = guidStr.slice(0, 8) + '-'
                        const str2 = guidStr.slice(8, 12) + '-'
                        const str3 = guidStr.slice(12, 16) + '-'
                        const str4 = guidStr.slice(16, 20) + '-'
                        const str5 = guidStr.slice(20)
                        return str1 + str2 + str3 + str4 + str5
                    }
                }
            }
            var accessid, host, policyBase64, signature, g_dirname, uploadFileName, url, guid, uploadFilesTimes
            guid = new GUID()
            uploadFilesTimes = 0
            if (this.uploadUseData.scTypeed === 4) {
                url = this.$api.baseURL + 'api/oss/getAliOSSUploadSignWyard?dir=' + 'courseware/' + guid.newGUID() + '/'
            } else {
                url = this.$api.baseURL + 'api/oss/getAliOSSUploadSign?dir=' + 'courseware/' + guid.newGUID() + '/'
            }
            this.$axios({
                url: url
            }).then(r => {
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
                    flash_swf_url: '../../../public/libs/Moxie.swf',
                    silverlight_xap_url: '../../../public/libs/Moxie.xap',
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
                            console.log(_this.uploadFilesLength.length)

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
                            this.updataFiles = true
                            const d = document.getElementById(file.id)
                            d.getElementsByClassName('progress')[0].style.display = 'block'
                            d.getElementsByTagName('b')[0].innerHTML =
                                        '<span style="display:inline-block;padding-left:10px;">' + file.percent +
                                        '%</span>'
                            const prog = d.getElementsByTagName('div')[0]
                            const progBar = prog.getElementsByTagName('div')[0]
                            progBar.style.width = file.percent + '%'
                            progBar.setAttribute('aria-valuenow', file.percent)
                        },
                        FileUploaded: function(up, file, info) {
                            if (info.status === 200) {
                                uploadFilesTimes++
                                _this.uploadFilesArray = []
                                var aaa = {
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
                                    if (r.data.status === 200) {
                                        _this.$message({
                                            type: 'success',
                                            message: '文件上传成功'
                                        })
                                        if (uploadFilesTimes === _this.uploadFilesLength.length) {
                                            setInterval(function() {
                                                window.location.reload()
                                            }, 1000)
                                        }
                                    }
                                }).catch(er => {
                                    _this.updataFiles = false
                                })
                            } else {
                                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info
                                    .response
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
            }).catch(er => {

            })
        },
        uploadDropBoxDialogClose: function() {
            this.uploadDropBoxDialog = false
            this.uploadFilesLength = []
            this.uploader.destroy()
        },
        search: function() {
            this.getTableData()
        },

        getTableData: function() {
            this.historyLessons = true
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/order/list',
                params: {
                    page: this.val,
                    limit: this.limit,
                    statused: 48,
                    key: this.tableDataName
                }
            })
                .then(r => {
                    this.historyLessons = false
                    this.tableDataEnd = r.data.body.list
                    this.total = r.data.body.totalCount
                    this.pageSize = r.data.body.totalCount
                    this.currentPage = r.data.body.currPage
                })
                .catch(er => {
                    this.historyLessons = false
                })
        },
        apply(row, index) {
            // if (row.scTypeed == 4) {
            //     window.open(
            //         'seller_detail-wy.html?id=' +
            //             row.courseId +
            //             '&wyid=' +
            //             row.offCourseName +
            //             '&iswy=true'
            //     )
            // } else {
            //     window.open('seller_detail.html?id=' + row.courseId + '')
            // }
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

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.limit = val
            this.getTableData()
        },

        handleCurrentChange(val) {
            this.val = val
            this.getTableData()
        }
    }
}
</script>
<style scoped>
.historyLessons {
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

