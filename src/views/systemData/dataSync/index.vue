<template>
  <div class="DbCopy-container app-container nohead  HONGAN4D-flex-main">
    <el-alert title="温馨提示：数据同步是由A数据库同步到B数据库，必须确保数据库表结构一致否则会同步失败。" type="warning" :closable="false"
      show-icon class="mb-20">
    </el-alert>
    <el-form ref="dataForm" :model="dataForm" label-width="140px" :rules="dataRule"
      @submit.native.prevent class="mt-10">
      <el-form-item label="数据库连接 From" prop="dbConnectionFrom">
        <el-select v-model="dataForm.dbConnectionFrom" placeholder="请选择连接">
          <el-option-group v-for="group in dbOptions" :key="group.fullName" :label="group.fullName">
            <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
              :value="item.id" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="数据库连接 To" prop="dbConnectionTo">
        <el-select v-model="dataForm.dbConnectionTo" placeholder="请选择连接">
          <el-option-group v-for="group in dbOptions" :key="group.fullName" :label="group.fullName">
            <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
              :value="item.id" />
          </el-option-group>
        </el-select>
        <el-button type="primary" @click="check" style="margin-left:10px">验证连接</el-button>
      </el-form-item>
    </el-form>
    <div class="HONGAN4D-common-title">
      <h2>数据库表</h2>
    </div>
    <HONGAN4D-table v-loading="listLoading" :data="list">
      <el-table-column prop="table" label="表名" show-overflow-tooltip />
      <el-table-column prop="sum" label="总数" />
      <el-table-column prop="result" label="结果" />
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="copy(scope.row)"
            :loading="scope.row.btnLoading">数据同步
          </el-button>
        </template>
      </el-table-column>
    </HONGAN4D-table>
  </div>
</template>

<script>
import { getDataSourceListAll, Execute, DataSync } from '@/api/systemData/dataSource'
import { DataModelList } from '@/api/systemData/dataModel'
export default {
  name: 'systemData-dataSync',
  data() {
    return {
      key: '',
      dataForm: {
        dbConnectionFrom: '',
        dbConnectionTo: ''
      },
      dbOptions: [],
      dataRule: {
        dbConnectionFrom: [
          { required: true, message: '数据库连接 From不能为空', trigger: 'blur' }
        ],
        dbConnectionTo: [
          { required: true, message: '数据库连接 To不能为空', trigger: 'blur' }
        ]
      },
      list: [],
      listLoading: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getDataSourceListAll().then(res => {
        this.dbOptions = res.data.list.filter(o => o.children && o.children.length)
      })
    },
    check() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.dbConnectionFrom === this.dataForm.dbConnectionTo) {
            this.$message({
              message: '不能与数据库连接 From 相同',
              type: 'error',
              duration: 1000,
            })
            return
          }
          this.listLoading = true
          DataModelList(this.dataForm.dbConnectionFrom).then((res) => {
            this.list = res.data.list
            for (let i = 0; i < this.list.length; i++) {
              const e = this.list[i];
              this.$set(this.list[i], 'result', '')
              this.$set(this.list[i], 'btnLoading', false)
            }
            this.listLoading = false
          })
        }
      })
    },
    copy(row) {
      row.btnLoading = true
      row.result = ''
      let data = {
        dbConnectionFrom: this.dataForm.dbConnectionFrom,
        dbConnectionTo: this.dataForm.dbConnectionTo,
        dbTable: row.table
      }
      DataSync(data).then((res) => {
        if (res.data == 0) {
          this.execute(row, res.data)
        } else if (res.data == 1) {
          this.$message({
            message: '初始库表中没有数据',
            type: 'warning',
            duration: 1000,
          })
          row.btnLoading = false
        } else if (res.data == 2) {
          this.$confirm('目标库中该表不存在，是否在目标库中创建该表，并同步数据?', '提示', {
            type: 'warning'
          }).then(() => {
            this.execute(row, res.data)
          }).catch(() => { row.btnLoading = false });
        } else if (res.data == 3) {
          this.$confirm('目标表存在数据,是否自动清除并同步数据?', '提示', {
            type: 'warning'
          }).then(() => {
            this.execute(row, res.data)
          }).catch(() => { row.btnLoading = false });
        }
      }).catch(() => {
        row.btnLoading = false
      })
    },
    execute(row, type) {
      row.result = ''
      let data = {
        type,
        dbConnectionFrom: this.dataForm.dbConnectionFrom,
        dbConnectionTo: this.dataForm.dbConnectionTo,
        dbTable: row.table
      }
      Execute(data).then((res) => {
        row.result = res.msg
        row.btnLoading = false
      }).catch(() => {
        row.btnLoading = false
      })
    }
  }
}
</script>
