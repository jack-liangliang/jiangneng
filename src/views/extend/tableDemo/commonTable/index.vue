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
              <el-button icon="el-icon-refresh-right" @click="refresh()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="HONGAN4D-common-layout-main HONGAN4D-flex-main">
        <div class="HONGAN4D-common-head">
          <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新建项目
          </el-button>
          <div class="HONGAN4D-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                @click="refresh()" />
            </el-tooltip>
          </div>
        </div>
        <HONGAN4D-table v-loading="listLoading" :data="list" custom-column>
          <template v-for="(item,index) in defaultColumnOptions">
            <template>
              <template v-if="item.prop==='projectType'">
                <el-table-column :prop="item.prop" :label="item.label" sortable :key="index"
                  width="100">
                  <template slot-scope="scope">
                    {{ scope.row[item.prop] | getTypeText(industryTypeList) }}
                  </template>
                </el-table-column>
              </template>
              <template v-else-if="item.prop==='interactionDate' || item.prop==='registerDate'">
                <el-table-column :prop="item.prop" :label="item.label" sortable :key="index"
                  width="100">
                  <template slot-scope="scope">
                    {{ scope.row[item.prop] | toDate("yyyy-MM-dd") }}
                  </template>
                </el-table-column>
              </template>
              <template v-else>
                <el-table-column :prop="item.prop" :label="item.label" sortable :key="index" />
              </template>
            </template>
          </template>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="addOrUpdateHandle(scope.row.id)">编辑
              </el-button>
              <el-button size="mini" type="text" class="HONGAN4D-table-delBtn"
                @click="handleDel(scope.$index,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </HONGAN4D-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
        <HONGAN4D-Form v-if="formVisible" ref="HONGAN4DForm" @refreshDataList="initData" />
      </div>
    </div>
  </div>
</template>

<script>
import { TableExampleList, TableExampleDelete } from '@/api/extend/tableExample'
import { getColumnsByModuleId } from '@/api/common'
import HONGAN4DForm from '../commonForm'
export default {
  name: 'extend-tableDemo-commonTable',
  components: {
    HONGAN4DForm
  },
  data() {
    return {
      keyword: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      formVisible: false,
      industryTypeList: [],
      defaultColumnOptions: [
        {
          label: '项目名称',
          prop: 'projectName'
        },
        {
          label: '项目类型',
          prop: 'projectType'
        },
        {
          label: '项目编码',
          prop: 'projectCode'
        },
        {
          label: '项目阶段',
          prop: 'projectPhase'
        },
        {
          label: '客户名称',
          prop: 'customerName'
        },
        {
          label: '负责人',
          prop: 'principal'
        },
        {
          label: '立项人',
          prop: 'jackStands'
        },
        {
          label: '交互时间',
          prop: 'interactionDate'
        },
        {
          label: '费用金额',
          prop: 'costAmount'
        },
        {
          label: '已用金额',
          prop: 'tunesAmount'
        },
        {
          label: '预计收入',
          prop: 'projectedIncome'
        },
        {
          label: '登记人',
          prop: 'registrant'
        },
        {
          label: '登记时间',
          prop: 'registerDate'
        },
        {
          label: '备注',
          prop: 'description'
        }
      ],
      useColumnPermission: false,
      columnList: []
    }
  },
  created() {
    this.getDictionaryData()
  },
  filters: {
    getTypeText(id, industryTypeList) {
      let item = industryTypeList.filter(o => o.id == id)[0]
      return item && item.fullName ? item.fullName : ''
    }
  },
  methods: {
    getColumnsByModuleId() {
      if (!this.currMenuId) return
      this.listLoading = true
      getColumnsByModuleId(this.currMenuId).then(res => {
        this.settingsColumnList = res.data || []
        this.getRealColumnList()
        this.$nextTick(() => {
          this.getDictionaryData()
        })
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'IndustryType' }).then((res) => {
        this.industryTypeList = res
        this.initData()
      })
    },
    refresh() {
      this.keyword = ''
      this.search()
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      TableExampleList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        TableExampleDelete(id).then(res => {
          this.list.splice(index, 1);
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.HONGAN4DForm.init(this.industryTypeList, id)
      })
    }
  }
}
</script>