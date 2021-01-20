<template>
  <div class="finishedCourse">
    <div v-loading="finishedCourseLoading">
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
        <el-table-column label="学生姓名" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.studName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课堂说明" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课堂名称" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上课时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上课时长(min)" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.schooltime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="see(scope.row,scope.$index)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

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
export default {
    data() {
        return {
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
            rules: {},
            finishedCourseLoading: false
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData()
    },
    methods: {
        see(row, index) {
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
        search: function() {
            this.getTableData()
        },
        getTableData: function() {
            this.finishedCourseLoading = true
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/classRoom/list',
                params: {
                    'page': this.val,
                    'limit': this.limit,
                    'statusedArr': '8;16',
                    'key': this.tableDataName
                }
            }).then(r => {
                this.finishedCourseLoading = false
                this.tableDataEnd = r.data.body.list
                this.total = r.data.body.totalCount
                this.pageSize = r.data.body.totalCount
                this.currentPage = r.data.body.currPage
            }).catch(er => {
                this.finishedCourseLoading = false
            })
            // var self = this
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': this.val,
            //         'limit': this.limit,
            //         'statusedArr': '8;16',
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
.finishedCourse{
    padding:10px;
    margin-top: 50px;
}
</style>
