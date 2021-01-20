<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
    <!-- <div class="showName">
      欢迎 {{ userName.nickName }}
    </div> -->
    <div class="right-menu">
      <span class="nav-right-btn" @click="tongzhi"><i class="el-icon-bell marginleftright5" />通知</span>
      <span class="nav-right-btn" @click="takeIM"><i class="el-icon-chat-line-round marginleftright5" />在线聊天</span>
      <span class="nav-right-btn" @click="resetPassword"><i class="el-icon-lock marginleftright5" />修改密码</span>
      <span class="nav-right-btn" @click="logout"><i class="el-icon-right marginleftright5" />退出系统</span>
      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
    <el-dialog title="修改密码" :modal-append-to-body="true" :append-to-body="true" :visible.sync="resetPasswordDialog" width="50%" :before-close="resetPasswordHandleClose">
      <div>
        <el-form label-width="120px">
          <el-form-item label="账号">
            <span>
              {{ userName.mobile }}
            </span>
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input v-model="oldPassword" type="password" />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="newPassword" type="password" />
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="confirmPassword" type="password" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPasswordHandleClose">取 消</el-button>
        <el-button type="primary" @click="resetPasswordSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog v-loading="loadingUploadImg" title="实名认证" :visible.sync="realnameConfirm" width="50%" :before-close="realnameConfirmhandleClose">
      <div>
        <el-form ref="form" :model="ruleForm" label-width="160px">
          <el-form-item label="上传身份证正面">
            <p style="color:red;font-size:12px;    margin: 0;">图片大小不得超过1MB，格式为JPEG/BMP/PNG</p>
            <el-button id="userIdcardOn" :disabled="isUploadOn">选择照片</el-button>
            <div id="ossfile1" style="padding: 10px 0;" />
            <el-button id="postfiles" type="primary" style="display: none;">上传</el-button>
          </el-form-item>
          <el-form-item label="上传身份证反面">
            <el-button id="userIdcardOff" :disabled="isUploadOff">选择照片</el-button>
            <div id="ossfile2" style="padding: 10px 0;" />
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="realnameId" placeholder="请输入证件号码" />
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">

        <el-button type="primary" @click="realnameConfirmSubmit">提交审核</el-button>
      </span>
    </el-dialog> -->
    <!-- <el-form-item label="证件类型">
            <el-select v-model="realnameIdType" placeholder="请选择证件类型">
              <el-option label="居民身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
              <el-option label="通行证" value="4"></el-option>
              <el-option label="台胞证" value="8"></el-option>
            </el-select>
          </el-form-item> -->
    <!-- <el-button @click="realnameConfirmhandleClose">取 消</el-button> -->
  </div>
</template>

<script>
import Bus from '@/eventBus'
import { mapGetters } from 'vuex'
import { getLocal, removeLocal, setCookie } from '@/utils/auth'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import plupload from 'plupload'
export default {
    components: {
        Breadcrumb,
        Hamburger
    },
    data() {
        return {
            resetPasswordDialog: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            userName: {},
            realNameCertification: {},
            realnameConfirm: false,
            uploaderOn: null,
            uploaderOff: null,
            loadingUploadImg: false,
            idcardOn: '',
            idcardOff: '',
            isUploadOn: false,
            isUploadOff: false,
            uploadFilesLength: [],
            realnameId: '',
            realnameIdType: '',
            ruleForm: {}
            // username:{}
        }
    },
    computed: {
        ...mapGetters(['sidebar', 'avatar'])
    },
    mounted() {
        this.getUser()
    },
    methods: {
        tongzhi() {
            this.$router.push({ path: '/messages/messages' })
        },
        // realnameConfirmhandleClose() {
        //     this.realnameConfirm = false
        //     this.uploaderOn.destroy()
        //     this.uploaderOff.destroy()
        //     this.realnameId = ''
        //     this.realnameIdType = ''
        // },
        getUser() {
            // this.userName = window
            ('teacinfo')
            this.userName = window.localStorage.getItem('teacinfo')
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/user/getMyInfo'
            }).then(r => {
                if (r.data.status === 400) {
                    if(r.data.body.code === 4011){
                        this.$router.push({ path: '/login' })
                    }
                }
                this.realNameCertification = r.data.body.realNameCertification
                setCookie('teacid', 'teac' + r.data.body.id)
                
                // if (
                //     this.realNameCertification == null ||
                //     this.realNameCertification === 8
                // ) {
                //     this.showDialogEvent()
                // }
            })
        },

        // showDialogEvent: function() {
        //     this.realnameConfirm = true

        //     function GUID() {
        //         this.date = new Date() /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
        //         if (typeof this.newGUID !== 'function') {
        //             /* 生成GUID码 */
        //             GUID.prototype.newGUID = function() {
        //                 this.date = new Date()
        //                 var guidStr = ''
        //                 var sexadecimalDate = this.hexadecimal(
        //                     this.getGUIDDate(),
        //                     16
        //                 )
        //                 var sexadecimalTime = this.hexadecimal(
        //                     this.getGUIDTime(),
        //                     16
        //                 )
        //                 for (var i = 0; i < 9; i++) {
        //                     guidStr += Math.floor(Math.random() * 16).toString(
        //                         16
        //                     )
        //                 }
        //                 guidStr += sexadecimalDate
        //                 guidStr += sexadecimalTime
        //                 while (guidStr.length < 32) {
        //                     guidStr += Math.floor(Math.random() * 16).toString(
        //                         16
        //                     )
        //                 }
        //                 return this.formatGUID(guidStr)
        //             }
        //             /* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
        //             GUID.prototype.getGUIDDate = function() {
        //                 return (
        //                     this.date.getFullYear() +
        //                     this.addZero(this.date.getMonth() + 1) +
        //                     this.addZero(this.date.getDay())
        //                 )
        //             }
        //             /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
        //             GUID.prototype.getGUIDTime = function() {
        //                 return (
        //                     this.addZero(this.date.getHours()) +
        //                     this.addZero(this.date.getMinutes()) +
        //                     this.addZero(this.date.getSeconds()) +
        //                     this.addZero(
        //                         parseInt(this.date.getMilliseconds() / 10)
        //                     )
        //                 )
        //             }
        //             /* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
        //             GUID.prototype.addZero = function(num) {
        //                 if (
        //                     Number(num).toString() != 'NaN' &&
        //                     num >= 0 &&
        //                     num < 10
        //                 ) {
        //                     return '0' + Math.floor(num)
        //                 } else {
        //                     return num.toString()
        //                 }
        //             }
        //             /*  * 功能：将y进制的数值，转换为x进制的数值 * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10 * 返回值：返回转换后的字符串 */
        //             GUID.prototype.hexadecimal = function(num, x, y) {
        //                 if (y != undefined) {
        //                     return parseInt(num.toString(), y).toString(x)
        //                 } else {
        //                     return parseInt(num.toString()).toString(x)
        //                 }
        //             }
        //             /* * 功能：格式化32位的字符串为GUID模式的字符串 * 参数：第1个参数表示32位的字符串 * 返回值：标准GUID格式的字符串 */
        //             GUID.prototype.formatGUID = function(guidStr) {
        //                 var str1 = guidStr.slice(0, 8) + '-'
        //                 var str2 = guidStr.slice(8, 12) + '-'
        //                 var str3 = guidStr.slice(12, 16) + '-'
        //                 var str4 = guidStr.slice(16, 20) + '-'
        //                 var str5 = guidStr.slice(20)
        //                 return str1 + str2 + str3 + str4 + str5
        //             }
        //         }
        //     }
        //     var accessid,
        //         host,
        //         policyBase64,
        //         signature,
        //         g_dirname,
        //         uploadFileNameOn,
        //         uploadFileNameOff,
        //         uploadFilesTimes
        //     var guid = new GUID()
        //     this.$axios({
        //         url:
        //             this.$api.baseURL +
        //             'api/oss/getAliOSSUploadSign?dir=' +
        //             'sensitive-information/' +
        //             guid.newGUID() +
        //             '/'
        //     }).then(r => {
        //         if (r.data.status == 200) {
        //             accessid = r.data.body.accessid
        //             host = r.data.body.host
        //             policyBase64 = r.data.body.policy
        //             signature = r.data.body.signature
        //             g_dirname = r.data.body.dir

        //             function formatFileName1(up, filename) {
        //                 uploadFileNameOn = encodeURIComponent(filename)
        //                 console.log(uploadFileNameOn)
        //                 set_upload_param1(up, filename, false)
        //             }

        //             function set_upload_param1(up, filename, ret) {
        //                 if (ret) {
        //                     formatFileName1(up, filename)
        //                 }
        //                 var new_multipart_params = {
        //                     key: g_dirname + filename,
        //                     policy: policyBase64,
        //                     OSSAccessKeyId: accessid,
        //                     success_action_status: '200', // 让服务端返回200,不然，默认会返回204
        //                     signature: signature
        //                 }

        //                 up.setOption({
        //                     url: host,
        //                     multipart_params: new_multipart_params
        //                 })

        //                 up.start()
        //             }
        //             var _this = this
        //             _this.uploaderOn = new plupload.Uploader({
        //                 runtimes: 'html5,flash,silverlight,html4',
        //                 browse_button: 'userIdcardOn',
        //                 flash_swf_url: 'js/Moxie.swf',
        //                 silverlight_xap_url: 'js/Moxie.xap',
        //                 multi_selection: false,
        //                 url: 'http://oss.aliyuncs.com',
        //                 init: {
        //                     PostInit: function() {
        //                         document.getElementById('ossfile1').innerHTML =
        //                             ''
        //                     },
        //                     FilesAdded: function(up, files) {
        //                         console.log(files)
        //                         plupload.each(files, function(file) {
        //                             document.getElementById(
        //                                 'ossfile1'
        //                             ).innerHTML +=
        //                                 '<div id="' +
        //                                 file.id +
        //                                 '" style="padding: 10px 0;">' +
        //                                 file.name +
        //                                 ' (' +
        //                                 plupload
        //                                     .formatSize(file.size)
        //                                     .split(' ')[0] +
        //                                 plupload
        //                                     .formatSize(file.size)
        //                                     .split(' ')[1]
        //                                     .toUpperCase() +
        //                                 ')<b></b>' +
        //                                 '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
        //                                 '</div>'
        //                         })
        //                         set_upload_param1(_this.uploaderOn, '', false)
        //                         return false
        //                     },

        //                     BeforeUpload: function(up, file) {
        //                         set_upload_param1(up, file.name, true)
        //                         _this.loadingUploadImg = true
        //                     },

        //                     UploadProgress: function(up, file) {
        //                         // _this.updataFiles = true;
        //                         var d = document.getElementById(file.id)
        //                         d.getElementsByClassName(
        //                             'progress'
        //                         )[0].style.display = 'block'
        //                         d.getElementsByTagName('b')[0].innerHTML =
        //                             '<span style="display:inline-block;padding-left:10px;">' +
        //                             file.percent +
        //                             '%</span>'
        //                         var prog = d.getElementsByTagName('div')[0]
        //                         var progBar = prog.getElementsByTagName(
        //                             'div'
        //                         )[0]
        //                         progBar.style.width = file.percent + '%'
        //                         progBar.setAttribute(
        //                             'aria-valuenow',
        //                             file.percent
        //                         )
        //                     },
        //                     FileUploaded: function(up, file, info) {
        //                         if (info.status == 200) {
        //                             _this.isUploadOn = true
        //                             _this.idcardOn =
        //                                 host +
        //                                 '/' +
        //                                 g_dirname +
        //                                 uploadFileNameOn
        //                         } else {
        //                             document
        //                                 .getElementById(file.id)
        //                                 .getElementsByTagName(
        //                                     'b'
        //                                 )[0].innerHTML = info.response
        //                         }
        //                         _this.loadingUploadImg = false
        //                     },
        //                     Error: function(up, err) {
        //                         _this.$message({
        //                             type: 'error',
        //                             message: '证件上传失败， 请刷新页面重试'
        //                         })
        //                         _this.uploaderOn.destroy()
        //                         _this.loadingUploadImg = false
        //                     }
        //                 }
        //             })
        //             _this.uploaderOn.init()

        //             function formatFileName2(up, filename) {
        //                 uploadFileNameOff = encodeURIComponent(filename)
        //                 console.log(uploadFileNameOff)
        //                 set_upload_param2(up, filename, false)
        //             }

        //             function set_upload_param2(up, filename, ret) {
        //                 if (ret) {
        //                     formatFileName2(up, filename)
        //                 }
        //                 var new_multipart_params = {
        //                     key: g_dirname + filename,
        //                     policy: policyBase64,
        //                     OSSAccessKeyId: accessid,
        //                     success_action_status: '200', // 让服务端返回200,不然，默认会返回204
        //                     signature: signature
        //                 }

        //                 up.setOption({
        //                     url: host,
        //                     multipart_params: new_multipart_params
        //                 })

        //                 up.start()
        //             }

        //             _this.uploaderOff = new plupload.Uploader({
        //                 runtimes: 'html5,flash,silverlight,html4',
        //                 browse_button: 'userIdcardOff',
        //                 flash_swf_url: 'js/Moxie.swf',
        //                 silverlight_xap_url: 'js/Moxie.xap',
        //                 multi_selection: false,
        //                 url: 'http://oss.aliyuncs.com',
        //                 init: {
        //                     PostInit: function() {
        //                         document.getElementById('ossfile2').innerHTML =
        //                             ''
        //                     },
        //                     FilesAdded: function(up, files) {
        //                         console.log(files)
        //                         plupload.each(files, function(file) {
        //                             document.getElementById(
        //                                 'ossfile2'
        //                             ).innerHTML +=
        //                                 '<div id="' +
        //                                 file.id +
        //                                 '" style="padding: 10px 0;">' +
        //                                 file.name +
        //                                 ' (' +
        //                                 plupload
        //                                     .formatSize(file.size)
        //                                     .split(' ')[0] +
        //                                 plupload
        //                                     .formatSize(file.size)
        //                                     .split(' ')[1]
        //                                     .toUpperCase() +
        //                                 ')<b></b>' +
        //                                 '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
        //                                 '</div>'
        //                         })
        //                         set_upload_param2(_this.uploaderOff, '', false)
        //                         return false
        //                     },

        //                     BeforeUpload: function(up, file) {
        //                         set_upload_param2(up, file.name, true)
        //                         _this.loadingUploadImg = true
        //                     },

        //                     UploadProgress: function(up, file) {
        //                         // _this.updataFiles = true;
        //                         var d = document.getElementById(file.id)
        //                         d.getElementsByClassName(
        //                             'progress'
        //                         )[0].style.display = 'block'
        //                         d.getElementsByTagName('b')[0].innerHTML =
        //                             '<span style="display:inline-block;padding-left:10px;">' +
        //                             file.percent +
        //                             '%</span>'
        //                         var prog = d.getElementsByTagName('div')[0]
        //                         var progBar = prog.getElementsByTagName(
        //                             'div'
        //                         )[0]
        //                         progBar.style.width = file.percent + '%'
        //                         progBar.setAttribute(
        //                             'aria-valuenow',
        //                             file.percent
        //                         )
        //                     },
        //                     FileUploaded: function(up, file, info) {
        //                         if (info.status == 200) {
        //                             _this.isUploadOff = true
        //                             _this.idcardOff =
        //                                 host +
        //                                 '/' +
        //                                 g_dirname +
        //                                 uploadFileNameOff
        //                         } else {
        //                             document
        //                                 .getElementById(file.id)
        //                                 .getElementsByTagName(
        //                                     'b'
        //                                 )[0].innerHTML = info.response
        //                         }
        //                         _this.loadingUploadImg = false
        //                     },
        //                     Error: function(up, err) {
        //                         _this.$message({
        //                             type: 'error',
        //                             message: '证件上传失败， 请刷新页面重试'
        //                         })
        //                         _this.uploaderOff.destroy()
        //                         _this.loadingUploadImg = false
        //                     }
        //                 }
        //             })
        //             _this.uploaderOff.init()
        //         }
        //     })
        // },
        // realnameConfirmSubmit: function() {
        //     var _this = this
        //     var url
        //     if (this.realNameCertification == null) {
        //         url =
        //             this.$api.baseURL + 'api/teacher/user/saveRealNameAuthOSS'
        //     } else if (this.realNameCertification == 8) {
        //         url =
        //             this.$api.baseURL +
        //             'api/teacher/user/updateRealNameAuthOSS'
        //     }
        //     // this.idcardOn = 'https://www.baidu.com/img/baidu_jgylogo3.gif';
        //     // this.idcardOff = 'https://www.baidu.com/img/baidu_jgylogo3.gif';
        //     this.$axios({
        //         url: url,
        //         method: 'post',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         data: JSON.stringify({
        //             idCardObverseUrl: this.idcardOn,
        //             idCardReversedUrl: this.idcardOff,
        //             idCardNo: this.realnameId
        //             // certificateType:this.realnameIdType,
        //         })
        //     }).then(r => {
        //         if (r.data.status == 200) {
        //             this.$message({
        //                 type: 'success',
        //                 message: r.data.body.msg
        //             })
        //             this.realnameConfirm = false
        //             this.uploaderOn.destroy()
        //             this.uploaderOff.destroy()
        //             this.realnameId = ''
        //             this.realnameIdType = ''
        //         } else {
        //             this.$message({
        //                 type: 'warning',
        //                 message: r.data.body.msg
        //             })
        //         }
        //     })
        // },

        resetPassword() {
            this.resetPasswordDialog = true
            this.getUser()
        },
        resetPasswordHandleClose() {
            this.oldPassword = ''
            this.newPassword = ''
            this.confirmPassword = ''
            this.resetPasswordDialog = false
        },
        resetPasswordSubmit() {
            if (this.newPassword === this.confirmPassword) {
                this.$axios({
                    url: this.$api.baseURL + 'api/teacher/user/updatePws',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        token: window.localStorage.getItem('teactoken')
                    },
                    method: 'post',
                    data: {
                        oldPws: this.oldPassword,
                        newPws: this.confirmPassword,
                        userId: this.userName.id
                    }
                })
                    .then(r => {
                        if (r.data.status === 200) {
                            this.$message({
                                type: 'success',
                                message: r.data.body.msg
                            })
                            // window.setInterval(() => {
                            //     window.location.reload()
                            // }, 1200)
                            this.resetPasswordHandleClose()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: r.data.body.msg
                            })
                        }
                    })
                    .catch(er => {
                        this.$message({
                            type: 'warning',
                            message: '网络出现故障，请刷新重试'
                        })
                    })
            } else {
                this.$message({
                    type: 'warning',
                    message: '两次密码输入不正确，请重试'
                })
            }
        },
        toggleSideBar() {
            // console.log(this.$api.navBarWidth)
            // console.log(document.getElementsByClassName('sidebar-container')[0].offsetWidth)
            if (document.getElementsByClassName('sidebar-container')[0].offsetWidth === 210) {
                this.$api.navBarWidth = false
            } else if (document.getElementsByClassName('sidebar-container')[0].offsetWidth === 54) {
                this.$api.navBarWidth = true
            } else {
                this.$api.navBarWidth = null
            }
            // this.$api.navBarWidth = !this.$api.navBarWidth
            this.$store.dispatch('app/toggleSideBar')
            // console.log(this.$api.navBarWidth)
            Bus.$emit('navBarWidth', {
                navBarWidth: this.$api.navBarWidth
            })
        },
        async logout() {
            // await this.$store.dispatch('user/logout')
            removeLocal('teactoken')
            removeLocal('teacinfo')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        takeIM() {
            // window.open(

            //     this.$api.url + '/teacherweb' + '/im/main.html',
            //     '_blank',
            //     'top=20,left=20,width=800,height=600'
            // )
            // this.$api.redirectURL /teacherweb
            window.open(this.$api.baseURL + 'teacherweb/im/main.html', '_blank', 'top=20,left=20,width=800,height=600')
        }
    }
}
</script>
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
.el-dialog__wrapper {
    background: rgba(0, 0, 0, 0.4);
}
</style>

<style lang="scss" scoped>
.showName {
    // display: inline-block
    float: left;
    line-height: 50px;
    margin-left: 20px;
    color: #666666;
    font-size: 14px;
}
.marginleftright5 {
    margin-left: 5px;
    margin-right: 5px;
}
.nav-right-btn {
    display: inline-block;
    cursor: pointer;
    color: #666666;
    font-size: 14px;
    width: 100px;
    text-align: center;
}
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
