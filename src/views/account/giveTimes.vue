<template>
    <div class="giveTimes">
        <div v-loading="giveTimes">
            <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px" />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary">本月可赠送时长{{ user.presenterTimeLimit }}分钟</el-button>
            <el-button type="primary">本月可赠额度{{ time }}分钟</el-button>
            <el-table ref="multipleTable" :data="tableDataEnd" border style="width: 100%;margin-top:5px;" @selection-change="handleSelectionChange">
                <!-- <el-table-column
            type="selection"
            width="50">
          </el-table-column> -->
                <el-table-column label="赠送时间" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.updateAt }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="学生姓名" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.studentName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="课堂名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.classroomName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="课程名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.offCourseName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="赠送时长" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.preTime }}分钟</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" />
            </el-table>

            <el-pagination style="margin-top:15px" :current-page="currentPage" :page-sizes="[15,20]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            giveTimes: false,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            user: "",
            modal: false,
            modal_time: false,
            total: 0,
            limit: 15,
            time: "",
            idss: [],
            courseId: "",
            val: 1,
            page: "",
            ruleForm: {}
        };
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getUser();
    },
    methods: {
        search() {
            this.getTableData();
        },
        getTableData: function() {
            this.giveTimes = true;
            this.$axios({
                url: this.$api.baseURL + "api/teacher/presentertime/list",
                params: {
                    page: this.val,
                    limit: this.limit,
                    key: this.tableDataName
                }
            })
                .then(r => {
                    this.giveTimes = false;
                    this.tableDataEnd = r.data.body.list;
                    this.total = r.data.body.totalCount;
                    this.pageSize = r.data.body.totalCount;
                    this.currentPage = r.data.body.currPage;
                })
                .catch(er => {
                    this.giveTimes = false;
                });
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },
        getUser() {
            this.$axios({
                url: this.$api.baseURL + "api/teacher/user/getMyInfo"
            })
                .then(r => {
                    if (r.data.status === 400) {
                        if (r.data.body.code === 4011) {
                            this.$router.push({ path: "/login" });
                        }
                    }
                    this.user = r.data.body;
                    this.time = Number(this.user.presenterTimeLimit) - Number(this.user.presenterTimeConsume);
                })
                .catch(er => {});
        },
        handleChangearea(val) {
            let obj = {};
            obj = this.selects.find(item => {
                return item.userId === val;
            });
            this.userId = obj.userId;
            this.username = obj.username;
        },
        handleCurrentChange(val) {
            this.val = val;
            this.getTableData();
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            const ids = [];
            this.multipleSelection.map(item => {
                var id = item.id;
                ids.push("" + id + "");
            });
            this.selectedIDs = ids;
            console.log("多选", ids);
            this.idss = this.selectedIDs;
            console.log(this.idss);
        }
    }
};
</script>
<style scoped>
.giveTimes {
    padding: 10px;

    margin-top: 50px;
}
</style>
