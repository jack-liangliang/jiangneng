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
          <el-button type="primary" icon="el-icon-plus" @click="addHandle()" :loading="btnLoading">
            新建数据</el-button>
          <div class="HONGAN4D-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
          </div>
        </div>
        <HONGAN4D-table v-loading="listLoading" :data="list">
          <el-table-column prop="enCode" label="编码" sortable />
          <el-table-column prop="fullName" label="名称" sortable />
          <el-table-column prop="creatorTime" label="创建时间" sortable
            :formatter="hongan4d.tableDateFormat" />
        </HONGAN4D-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
  </div>
</template>

<script>
import { BigDataList, BigDataCreate } from '@/api/extend/bigData'
export default {
  name: 'extend-bigData',
  data() {
    return {
      keyword: '',
      list: [],
      total: 0,
      listLoading: true,
      btnLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
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
      BigDataList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    // 新增 
    addHandle() {
      this.$confirm('您确定要创建10000条数据吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.btnLoading = true
        BigDataCreate().then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
          })
          this.btnLoading = false
          this.initData()
        })
      }).catch(() => { this.btnLoading = false })
    }
  }
}
</script>