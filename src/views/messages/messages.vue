<template>
  <div class="message">
    <div v-loading="messageLoading">
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
        <el-table-column label="id" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="消息标题" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="消息描述" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope" />
        </el-table-column> -->
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
            limit: 6,
            idss: [],
            courseId: '',
            val: 1,
            page: '',
            ruleForm: {},
            messageLoading: false
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData()
    },
    methods: {
        search: function() {
            this.getTableData()
        },
        getTableData: function() {
            this.messageLoading = true
            this.$axios({
                url: this.$api.baseURL + 'api/teacher/notify/list',
                params: {
                    'page': this.val,
                    'limit': this.limit,
                    'statused': 1,
                    'key': this.tableDataName
                }
            }).then(r => {
                this.messageLoading = false
                this.tableDataEnd = r.data.body.list
                this.total = r.data.body.totalCount
                this.pageSize = r.data.body.totalCount
                this.currentPage = r.data.body.currPage
            }).catch(er => {
                this.messageLoading = false
            })
            // var self = this
            // $.ajax({
            //     type: 'get',
            //     dataType: 'json',
            //     data: {
            //         'token': token,
            //         'page': this.val,
            //         'limit': this.limit,
            //         'statused': 1,
            //         'key': this.tableDataName
            //     },
            //     url: '' + baseURL + 'api/teacher/notify/list',
            //     success: function(json) {
            //         self.tableDataEnd = json.body.list
            //         self.total = json.body.totalCount
            //         self.pageSize = json.body.totalCount
            //         self.currentPage = json.body.currPage
            //         loading.close()
            //     }
            // })
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
.message{
    padding:10px;

    margin-top: 50px;
}
</style>
