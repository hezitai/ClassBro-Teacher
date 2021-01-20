<template>
  <div class="myInfo">
    <div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="基本信息"
          name="first"
        />
        <el-tab-pane
          label="高级设置"
          name="second"
        />
      </el-tabs>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="200px"
        style="width:800px;"
        class="demo-ruleForm"
      >
        <div v-show="!showa">
          <el-form-item label="头像">
            <div class="headimg fl">
              <img id="finalImg" :src="ruleForm.src" width="100%">
            </div>
            <!-- <el-button type="primary" @click="changeheader">更换头像</el-button> -->
          </el-form-item>
          <el-form-item label="账号" prop="mobile">
            <el-input v-model="ruleForm.mobile" :disabled="true" />
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <el-input v-model="ruleForm.username" :disabled="true" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option label="男" value="MALE" />
              <el-option label="女" value="FEMALE" />
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-form-item prop="birthday">
                <el-date-picker
                  v-model="ruleForm.birthday"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="微信号" prop="wxAccount">
            <el-input v-model="ruleForm.wxAccount" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="选择学校" prop="universityName">
            <el-select
              v-model="ruleForm.universityName"
              placeholder="请选择学校"
              :disabled="true"
              style="width:100%;"
            >
              <el-option v-for="item in universitys" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="专业" prop="professionalCourses">
            <el-select
              v-model="ruleForm.professionalCourses"
              multiple
              placeholder="请选择"
              :disabled="true"
              style="width:100%;"
            >
              <el-option
                v-for="item in professionalCoursesNames"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学历" prop="eduName">
            <el-select v-model="ruleForm.eduName" placeholder="请选择学历" :disabled="true">
              <el-option label="本科" value="1" />
              <el-option label="研究生" value="2" />
              <el-option label="硕士" value="3" />
              <el-option label="博士" value="4" />
              <el-option label="博士后" value="5" />
              <el-option label="教授" value="6" />
              <el-option label="院士" value="7" />
            </el-select>
          </el-form-item>
          <el-form-item label="擅长学科" prop="specializeds">
            <el-input v-model="ruleForm.specializeds" :disabled="true" />
          </el-form-item>
          <el-form-item label="个人介绍" prop="description">
            <el-input v-model="ruleForm.description" :disabled="true" />
          </el-form-item>
        </div>
        <div v-show="!showb">
          <el-form-item label="老师类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请输入老师类型" :disabled="true">
              <el-option label="全职" value="1" />
              <el-option label="兼职" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="teacshow" id="gread" label="讲师级别" prop="grade">
            <el-select v-model="ruleForm.grade" placeholder="请输入老师类型" :disabled="true">
              <el-option label="银牌讲师" value="1" />
              <el-option label="金牌讲师" value="2" />
              <el-option label="王牌老师" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="时薪" prop="hourlyWage">
            <el-input v-model="ruleForm.hourlyWage" :disabled="true" style="width:215px" />
            <el-button>G/H</el-button>
          </el-form-item>
          <el-form-item label="授课经验" prop="teachingExperience">
            <el-input v-model="ruleForm.teachingExperience" :disabled="true" style="width:215px" />
            <el-button>小时</el-button>
          </el-form-item>
          <el-form-item label="赠送时长" prop="presenterTimeLimit">
            <el-input v-model="ruleForm.presenterTimeLimit" :disabled="true" style="width:215px" />
            <el-button>MIN</el-button>
          </el-form-item>
          <el-form-item label="最大抢单数" prop="maxLootNum">
            <el-input v-model="ruleForm.maxLootNum" :disabled="true" style="width:215px" />
            <el-button>个</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="update('ruleForm')">更新信息</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-dialog
        title="更新头像"
        :visible.sync="cropperDialog"
        width="50%"
        :before-close="cropperDialoghandleClose"
      >
        <div>这是一段信息</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cropperDialoghandleClose">取 消</el-button>
          <el-button type="primary" @click="cropperDialogSubmit">确 定</el-button>
        </span>
      </el-dialog>

      <!--图片裁剪框 start-->
      <!-- <div style="display: none" class="tailoring-container">
        <div class="black-cloth" onclick="closeTailor(this)" />
        <div class="tailoring-content">
          <div class="tailoring-content-one">
            <label title="上传图片" for="chooseImg" class="l-btn choose-btn">
              <input
                id="chooseImg"
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                name="file"
                class="hidden"
                onchange="selectImg(this)"
              >
              选择图片
            </label>
            <div class="close-tailoring" onclick="closeTailor(this)">×</div>
          </div>
          <div class="tailoring-content-two">
            <div class="tailoring-box-parcel">
              <img id="tailoringImg">
            </div>
            <div class="preview-box-parcel">
              <p>图片预览：</p>
              <div class="square previewImg" />
              <div class="circular previewImg" />
            </div>
          </div>
          <div class="tailoring-content-three">
            <button class="l-btn cropper-reset-btn">复位</button>
            <button class="l-btn cropper-rotate-btn">旋转</button>
            <button class="l-btn cropper-scaleX-btn">换向</button>
            <button id="sureCut" class="l-btn sureCut" @click="sure">确定</button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropper'
export default {
    data() {
        return {
            cropperDialog: false,
            teacshow: '',
            professionalCoursesNames: '',
            professionalCourses: '',
            tableDataBegin: [],
            activeName: 'first',
            showa: false,
            showb: true,
            tableDataName: '',
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            detail: true,
            total: 0,
            filterTableDataEnd: [],
            dialogFormVisible2: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            val: 1,
            page: '',
            name: '',
            superId: '',
            countrys: '',
            universitys: '',
            label: '',
            dialogStatus: '',
            specializedss: '',
            specializeds: '',
            ruleForm: {
                professionalIds: '',
                src: '',
                username: '',
                sex: '',
                birthday: '',
                eduName: '',
                type: '',
                grade: '',
                coachingSkills: '',
                proKnowledge: '',
                workingAttitude: '',
                jobSpecification: '',
                professionalCourses: '',
                mobile: ''
            },
            rules: {
                // country: [
                //   { required: true, message: '请选择委派的运营', trigger: 'change' }
                // ]
            }
        }
    },

    mounted() {
        this.view_detail()
        // this.getprofessionalCoursesName();
    },
    methods: {
        cropperDialogSubmit() {

        },
        cropperDialoghandleClose() {
            this.cropperDialog = false
        },
        handleClick(tab, first) {
            var val = tab.index
            console.log(val)
            if (val == 0) {
                this.showa = false
                this.showb = true
            } else {
                this.showa = true
                this.showb = false
            }
        },

        handleChange(item) {},
        // getprofessionalCoursesName(){
        //     $.ajax({
        //         type: "get",
        //         url: ""+baseURL+"sys/basedata/professionalCourses/list",
        //         dataType: "json",
        //         data: {
        //           "token": token,
        //           "page": 1,
        //           "limit": 1000
        //           },
        //           success: function(r){
        //             vm.professionalCoursesNames = r.body.list;
        //         }
        // 			});
        //   },
        view_detail(row, index) {
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/user/getMyInfo'
            }).then(r => {
              if (r.data.status === 400) {
                        if (r.data.body.code === 4011) {
                            this.$router.push({ path: "/login" });
                        }
                    }
                var detail = r.data.body
                if (detail.type === 2) {
                    this.teacshow = true
                } else {
                    this.teacshow = false
                }
                this.id = r.data.body.id
                this.$refs.ruleForm.model.src = '' + this.$api.baseURL + '' + detail.thumb + ''
                this.$refs.ruleForm.model.username = detail.username
                this.$refs.ruleForm.model.nickName = detail.nickName
                this.$refs.ruleForm.model.sex = detail.sex
                this.$refs.ruleForm.model.grade = '' + detail.grade + ''
                this.$refs.ruleForm.model.birthday = detail.birthday
                this.$refs.ruleForm.model.wxAccount = detail.wxAccount
                this.$refs.ruleForm.model.mobile = detail.mobile
                this.$refs.ruleForm.model.email = detail.email
                this.$refs.ruleForm.model.universityName = detail.universityName
                this.$refs.ruleForm.model.professionalCourses = [detail
                    .professionalCoursesName
                ]
                this.$refs.ruleForm.model.eduName = '' + detail.eduBackgroundId + ''
                //   vm.$refs.ruleForm.model.specializeds = [detail.specializeds];
                this.$refs.ruleForm.model.specializeds = detail.specializeds
                this.$refs.ruleForm.model.description = detail.description
                this.$refs.ruleForm.model.coachingSkills = '' + detail.teacRate
                    .coachingSkills + ''
                this.$refs.ruleForm.model.proKnowledge = '' + detail.teacRate.proKnowledge +
                        ''
                this.$refs.ruleForm.model.workingAttitude = '' + detail.teacRate
                    .workingAttitude + ''
                this.$refs.ruleForm.model.jobSpecification = '' + detail.teacRate
                    .jobSpecification + ''
                this.$refs.ruleForm.model.presenterTimeLimit = detail.presenterTimeLimit
                this.$refs.ruleForm.model.maxLootNum = detail.maxLootNum
                this.$refs.ruleForm.model.teachingExperience = detail.teachingExperience
                this.$refs.ruleForm.model.type = '' + detail.type + ''
                this.$refs.ruleForm.model.hourlyWage = '' + detail.hourlyWage + ''
            }).catch(er => {

            })
        },
        update(formName) {
            // var self = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        url: this.$api.baseURL + '/api/teacher/user/updateTeacher',
                        method: 'post',
                        data: JSON.stringify({
                            id: this.id,
                            username: this.$refs.ruleForm.model.username,
                            nickName: this.$refs.ruleForm.model.nickName,
                            sex: this.$refs.ruleForm.model.sex,
                            birthday: this.$refs.ruleForm.model.birthday,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
                            email: this.$refs.ruleForm.model.email
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(r => {
                        if (r.data.status == 200) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'success'
                            })
                            setTimeout(function() {
                                window.location.reload()
                            }, 1500)
                        }
                        if (r.data.status == 400) {
                            this.$message({
                                message: r.data.body.msg,
                                type: 'warning'
                            })
                        }
                    }).catch(er => {

                    })
                }
            })
        },

        handleCurrentChange(val) {
            this.val = val
            this.getTableData()
        },
        changeheader() {
            // this.cropperDialog = true
            this.$message({
                type: 'warning',
                message: '请在App端修改头像'
            })
        }
        // selectImg(file) {
        //     if (!file.files || !file.files[0]) {
        //         return;
        //     }
        //     var reader = new FileReader();
        //     reader.onload = function (evt) {
        //         var replaceSrc = evt.target.result;
        //         //更换cropper的图片
        //         $('#tailoringImg').cropper('replace', replaceSrc, false); //默认false，适应高度，不失真
        //     }
        //     reader.readAsDataURL(file.files[0]);
        // },
        // //cropper图片裁剪
        // $('#tailoringImg').cropper({
        //     aspectRatio: 1 / 1, //默认比例
        //     preview: '.previewImg', //预览视图
        //     guides: false, //裁剪框的虚线(九宫格)
        //     autoCropArea: 0.5, //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
        //     movable: false, //是否允许移动图片
        //     dragCrop: true, //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        //     movable: true, //是否允许移动剪裁框
        //     resizable: true, //是否允许改变裁剪框的大小
        //     zoomable: false, //是否允许缩放图片大小
        //     mouseWheelZoom: false, //是否允许通过鼠标滚轮来缩放图片
        //     touchDragZoom: true, //是否允许通过触摸移动来缩放图片
        //     rotatable: true, //是否允许旋转图片
        //     crop: function (e) {
        //         // 输出结果数据裁剪图像。
        //     }
        // });
        // //旋转
        // $(".cropper-rotate-btn").on("click", function () {
        //     $('#tailoringImg').cropper("rotate", 45);
        // });
        // //复位
        // $(".cropper-reset-btn").on("click", function () {
        //     $('#tailoringImg').cropper("reset");
        // });
        // //换向
        // var flagX = true;
        // $(".cropper-scaleX-btn").on("click", function () {
        //     if (flagX) {
        //         $('#tailoringImg').cropper("scaleX", -1);
        //         flagX = false;
        //     } else {
        //         $('#tailoringImg').cropper("scaleX", 1);
        //         flagX = true;
        //     }
        //     flagX != flagX;
        // });

        // closeTailor() {
        //     $(".tailoring-container").toggle();
        // }

    }
}
</script>
<style scoped>
.myInfo{
    padding:10px;

    margin-top: 50px;
}
/* *{
    margin: 0;padding: 0;
} */
.l-btn{
    display: inline-block;
    outline: none;
    resize: none;
    border: none;
    padding:5px 10px;
    background: #409eff;
    color: #fff;
    border:solid 1px #409eff;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
}
.l-btn:hover{
    background: #66b1ff;
    animation: anniu 1s infinite;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
#replaceImg{
    margin-top: 40px;
}
.clears:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
}
.heads{
    width: 200px;
}
.headimg{
    width: 60px;height: 60px;border-radius:60px;border: solid 1px #ddd;cursor: pointer;
    margin-top: -10px;
    margin-right: 10px;
}
.headimg img{
    border-radius: 100%;
}
.l-btn:active{
    box-shadow: 0 2px 3px rgba(0,0,0,.2) inset;
}
.hidden{
    display: none;
}
.tailoring-container, .tailoring-container div, .tailoring-container p{
    margin: 0;padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
.tailoring-container{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
}
.tailoring-container .black-cloth{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: .0;
    z-index: 1001;
}
.tailoring-container .tailoring-content{
    position: absolute;
    width: 575px;
    height: 420px;
    background: #fff;
    z-index: 1002;
    left: 50%;
    top: 50%;
    margin-left: -435px;
    margin-top: -210px;

    /* 水平垂直居中 浏览器版本号低的不支持transform */
    /*left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -weblit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);*/

    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    padding: 10px;
    margin-top: 50px;
}

.tailoring-content-one{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #DDD ;
}
.tailoring-content .choose-btn{
    float: left;
}
.tailoring-content .close-tailoring{
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background: #eee;
    color: #fff;
    font-size: 22px;
    text-align: center;
    line-height: 30px;
    float: right;
    cursor: pointer;
}
.tailoring-content .close-tailoring:hover{
    background: #ccc;
}

.tailoring-content .tailoring-content-two{
    width: 100%;
    height: 310px;
    position: relative;
    padding: 5px 0;
}
.tailoring-content .tailoring-box-parcel{
    width: 400px;
    height: 300px;
    position: absolute;
    left: 0;
    border: solid 1px #ddd;
}
.tailoring-content .preview-box-parcel{
    display: inline-block;
    width: 156px;
    height: 305px;
    position: absolute;
    right: 0;
    padding: 4px 14px;
}
.preview-box-parcel p{
    color: #555;
}
.previewImg{
    width: 128px;
    height: 128px;
    overflow: hidden;
}
.preview-box-parcel .square{
    margin-top: 10px;
    border: solid 1px #ddd;
}
.preview-box-parcel .circular{
    border-radius: 100%;
    margin-top: 10px;
    border: solid 1px #ddd;
}

.tailoring-content .tailoring-content-three{
    width: 100%;
    height: 40px;
    border-top: 1px solid #DDD ;
    padding-top: 10px;
}
.sureCut{
    float: right;
}

@media all and (max-width: 768px) {
    .tailoring-container .tailoring-content{
        width: 100%;
        min-width: 320px;
        height: 460px;
    }
    .tailoring-content .tailoring-content-two{
        height: 360px;
    }
    .tailoring-content .tailoring-box-parcel{
        height: 350px;
    }
    .tailoring-container .tailoring-box-parcel{
        width: 100%;
    }
    .tailoring-container .preview-box-parcel{
        display: none;
    }

}
</style>
<style>
.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:rgba(51,153,255,.75);outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.33333%;left:0;top:33.33333%;width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.33333%;top:0;width:33.33333%}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:" ";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:e-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:n-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:w-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:s-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:e-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:n-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:w-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:ne-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nw-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:sw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:se-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC")}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}
</style>

