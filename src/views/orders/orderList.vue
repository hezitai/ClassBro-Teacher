<template>
    <div class="order">
        <div v-loading="loading">
            <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px" />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-table ref="multipleTable" :data="tableDataEnd" border style="width: 100%;margin-top:5px;" @selection-change="handleSelectionChange">
                <el-table-column label="订单号" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: pointer;" @click="see(scope.row,scope.$index)">{{ scope.row.orderNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="学校" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.newSchoolName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="专业" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.professionalCourseName }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="课程名称" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{ scope.row.temCourseName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="课时" width="60">
                <template slot-scope="scope">
                    <span>{{ scope.row.scheduledTime }}</span>
                </template>
            </el-table-column> -->
                <el-table-column label="预获G币" width="75">
                    <template slot-scope="scope">
                        <span v-show="scope.row.spoType != 1">{{ scope.row.teacFixedPrice }}</span>
                        <span v-show="scope.row.spoType == 1">90.0</span>
                    </template>
                </el-table-column>
                <el-table-column label="辅导需求" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderQuestions == null">{{ scope.row.explained }}</span>
                        <span v-if="scope.row.orderQuestions != null">
                            <span v-for="(item, $index) in scope.row.orderQuestions" :key="$index">
                                {{ item.question }}:{{ item.answer }}<br>
                            </span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Deal Deadline" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.endCourseTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Offcial Deadline" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.examTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="apply(scope.row,scope.$index)">接单</el-button>
                        <el-button size="mini" @click="noapply(scope.row,scope.$index)">退单</el-button>
                        <el-button size="mini" @click="see(scope.row,scope.$index)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top:15px" :current-page="currentPage" :page-sizes="[15,20]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableDataBegin: [],
            tableDataName: '',
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            idss: [],
            val: 1,
            page: '',
            ruleForm: {},
            rules: {},
            loading: false
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData()
    },
    methods: {
        search() {
            this.getTableData()
        },
        getTableData: function () {
            this.loading = true
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            })
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/order/list',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    page: this.val,
                    limit: this.limit,
                    statused: 0,
                    hasOrderPool: true,
                    key: this.tableDataName
                }
            })
                .then(r => {
                    this.loading = false
                    this.tableDataEnd = r.data.body.list
                    this.total = r.data.body.totalCount
                    this.pageSize = r.data.body.totalCount
                    this.currentPage = r.data.body.currPage
                    loading.close()
                })
                .catch(er => {
                    this.loading = false
                })
        },
        apply(row, index) {
            this.$confirm(
                '接单后，除不可抗力不可中途退单，是否确认接单？',
                '提示',
                {
                    confirmButtonText: '确定接单',
                    cancelButtonText: '我再看看',
                    type: 'warning',
                    // center: true,
                    customClass: 'confirmAlert'
                }
            )
                .then(_ => {
                    this.loading = true
                    this.$axios({
                        url:
                            this.$api.baseURL +
                            'api/teacher/order/receiveOrder',
                        data: {
                            courseId: row.courseId
                        },
                        method: 'post'
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // }
                    })
                        .then(r => {
                            this.loading = false
                            if (r.data.status == 200) {
                                this.$message({
                                    message: r.data.body.msg,
                                    type: 'success'
                                })
                                this.getTableData()
                            }
                            if (r.data.status == 400) {
                                this.loading = false
                                this.$message({
                                    message: r.data.body.msg,
                                    type: 'warning'
                                })
                            }
                        })
                        .catch(er => { })
                })
                .catch(_ => { })
        },
        see(row, index) {
            // console.log(row)
            // if (row.spoType === 64) {
            //     window.open('bigClassroomInfo.html?id=' + row.courseId + '')
            // } else if (row.scTypeed === 4) {
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
        noapply(row, index) {
            this.$confirm('是否要退单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(_ => {
                    this.$axios({
                        url:
                            this.$api.baseURL +
                            'api/teacher/order/returnedOrder',
                        data: {
                            courseId: row.courseId
                        },
                        method: 'post'
                    })
                        .then(r => {
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
                            }
                        })
                        .catch(er => { })
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
        }
    }
}
</script>
<style scoped>
.order {
    padding: 10px;
    margin-top: 50px;
}
.confirmAlert {
    font-family: "微软雅黑";
    width: 460px;
}

.confirmAlert .el-message-box__message {
    font-size: 16px;
}

.confirmAlert .el-button--default {
    border: none;
}

.confirmAlert .el-message-box__content {
    padding: 20px 15px;
}
</style>
