<template>
  <div class="HONGAN4D-common-layout">
    <div class="HONGAN4D-common-layout-center">
      <el-row class="HONGAN4D-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="HONGAN4D-common-layout-main HONGAN4D-flex-main">
        <div class="HONGAN4D-common-head">
          <topOpts @add="addOrUpdateHandle()" addText="新建委托"></topOpts>
          <div class="HONGAN4D-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
          </div>
        </div>
        <HONGAN4D-table v-loading="listLoading" :data="list">
          <el-table-column prop="toUserName" label="被委托人" width="150" />
          <el-table-column prop="flowName" label="委托流程" width="250" />
          <el-table-column prop="flowCategory" label="流程分类" width="100">
            <template slot-scope="scope">
              {{ scope.row.flowCategory|getCategoryText(categoryList) }}
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="120"
            :formatter="hongan4d.tableDateFormat" />
          <el-table-column prop="endTime" label="结束时间" width="120"
            :formatter="hongan4d.tableDateFormat" />
          <el-table-column prop="status" label="状态" width="100" align="center">
            <template slot-scope="scope">
              <el-tag type="info" v-if='scope.row.status==1'>未开始</el-tag>
              <el-tag type="danger" v-else-if='scope.row.status==2'>已失效</el-tag>
              <el-tag type="primary" v-else>委托中</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="委托说明" />
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)"
                @del="handleDel(scope.$index,scope.row.id)">
              </tableOpts>
            </template>
          </el-table-column>
        </HONGAN4D-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="reset" />
  </div>
</template>

<script>
import { FlowDelegateList, Delete } from '@/api/workFlow/FlowDelegate'
import Form from './Form'
export default {
  name: 'workFlow-entrust',
  components: { Form },
  data() {
    return {
      keyword: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      formVisible: false
    }
  },
  filters: {
    getCategoryText(id, categoryList) {
      let item = categoryList.filter(o => o.enCode == id)[0]
      return item && item.fullName ? item.fullName : ''
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'WorkFlowCategory' }).then((res) => {
        this.categoryList = res
        this.initData()
      })
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      }
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.search()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      FlowDelegateList(query).then(res => {
        this.list = res.data.list
        let currTime = this.hongan4d.toDate(new Date())
        for (let i = 0; i < this.list.length; i++) {
          let e = this.list[i];
          let startTime = this.hongan4d.toDate(e.startTime);
          let endTime = this.hongan4d.toDate(e.endTime);
          e.startTime = startTime
          e.endTime = endTime
          // 0-委托中 1-未开始 2-已失效
          let status = 0
          if (startTime > currTime) {
            status = 1
          } else if (endTime < currTime) {
            status = 2
          } else {
            status = 0
          }
          e.status = status
        }
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        this.asyncDel(index, id);
      }).catch(() => { });
    },
    asyncDel(index, id) {
      Delete(id).then(res => {
        this.list.splice(index, 1);
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    formatter(row, column) {
      return this.hongan4d.dateFormat(row, column)
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
  }
}
</script>