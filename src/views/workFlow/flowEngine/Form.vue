<template>
  <el-dialog :visible.sync="visible" fullscreen lock-scroll class="HONGAN4D-full-dialog"
    :show-close="false" :modal="false" append-to-body>
    <div class="HONGAN4D-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/hongan4d.png" class="header-logo" />
        <p class="header-txt"> · 流程设计</p>
      </div>
      <el-steps :active="activeStep" finish-status="success" simple class="steps">
        <el-step title="基础信息" @click.native="stepChick(0)" />
        <el-step title="表单设计" @click.native="stepChick(1)" />
        <el-step title="流程设计" @click.native="stepChick(2)" />
      </el-steps>
      <div class="options">
        <el-button @click="prev" :disabled="activeStep<=0">{{$t('common.prev')}}</el-button>
        <el-button @click="next" :disabled="activeStep>=2 || loading">{{$t('common.next')}}
        </el-button>
        <el-button type="primary" @click="dataFormSubmit()" :disabled="activeStep<2"
          :loading="btnLoading">{{$t('common.confirmButton')}}</el-button>
        <el-button @click="closeDialog()">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <div class="main" v-loading="loading">
      <el-row type="flex" justify="center" align="middle" v-if="!activeStep" class="basic-box">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="10" class="basicForm">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px"
            @submit.native.prevent label-position="right">
            <el-form-item label="流程名称" prop="fullName">
              <el-input v-model="dataForm.fullName" placeholder="流程名称" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="流程编码" prop="enCode">
              <el-input v-model="dataForm.enCode" placeholder="流程编码" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="流程分类" prop="category">
              <el-select v-model="dataForm.category" placeholder="选择分类">
                <el-option :key="item.enCode" :label="item.fullName" :value="item.enCode"
                  v-for="item in categoryList" />
              </el-select>
            </el-form-item>
            <el-form-item label="流程类型" prop="type">
              <el-select v-model="dataForm.type" placeholder="选择类型" @change="typeChange"
                :disabled="!!dataForm.id || dataForm.formType !== 1">
                <el-option label="发起流程" :value="0" />
                <el-option label="功能流程" :value="1" />
              </el-select>
            </el-form-item>
            <template v-if="dataForm.type==0">
              <el-form-item label="流程图标" prop="icon">
                <el-row type="flex">
                  <div style="flex:1;margin-right:10px">
                    <el-input v-model="dataForm.icon" placeholder="请选择流程图标" readonly
                      :suffix-icon="dataForm.icon">
                      <el-button slot="append" @click="openIconBox()">选择</el-button>
                    </el-input>
                  </div>
                  <el-color-picker v-model="dataForm.iconBackground" title="图标背景色"
                    :predefine="['#008cff', '#35b8e0', '#00cc88','#ff9d00','#ff4d4d', '#5b69bc', '#ff8acc', '#3b3e47','#282828']" />
                </el-row>
              </el-form-item>
            </template>
            <el-form-item label="表单类型" prop="formType">
              <el-input v-model="formType" maxlength="50" disabled></el-input>
            </el-form-item>
            <template v-if="dataForm.formType == 1">
              <el-form-item label="Web地址" prop="formUrl">
                <el-input v-model="dataForm.formUrl" placeholder="Web地址">
                  <template slot="prepend">@/views/</template>
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="App地址" prop="appFormUrl">
                <el-input v-model="dataForm.appFormUrl" placeholder="App地址" />
              </el-form-item> -->
            </template>
            <el-form-item label="流程排序" prop="sortCode">
              <el-input-number :min="0" :max="999999" v-model="dataForm.sortCode"
                controls-position="right" />
            </el-form-item>
            <el-form-item label="流程状态" prop="enabledMark">
              <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="流程说明" prop="description">
              <el-input v-model="dataForm.description" placeholder="流程说明" type="textarea"
                :rows="3" />
            </el-form-item>
            <template v-if="dataForm.formType == 2">
              <el-form-item label="数据连接">
                <el-select v-model="dataForm.dbLinkId" placeholder="请选择数据库" @change="onDbChange"
                  clearable>
                  <el-option-group v-for="group in dbOptions" :key="group.fullName"
                    :label="group.fullName">
                    <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
                      :value="item.id" />
                  </el-option-group>
                </el-select>
              </el-form-item>
              <el-table :data="tables" class="HONGAN4D-common-table"
                empty-text="点击“新增”可选择 1 条（单表）或 2 条以上（多表）">
                <el-table-column type="index" label="序号" width="50" align="center" />
                <el-table-column prop="typeId" label="类别" width="65">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.typeId=='1'">主表</el-tag>
                    <el-tag type="warning" v-else @click="changeTable(scope.row)"
                      style="cursor:pointer" title="点击设置成主表">子表</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="table" label="表名">
                  <template slot-scope="scope">
                    <el-tooltip :content="scope.row.tableName||scope.row.table" placement="top">
                      <span>{{scope.row.table}}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="tableField" label="外键字段">
                  <template slot-scope="scope" v-if="scope.row.typeId !=='1'">
                    <el-select v-model="scope.row.tableField" placeholder="请选择">
                      <el-option v-for="item in scope.row.fields" :key="item.field"
                        :label="item.field" :value="item.field">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="relationTable" label="关联主表" /> -->
                <el-table-column prop="relationField" label="关联主键">
                  <template slot-scope="scope" v-if="scope.row.typeId !=='1'">
                    <el-select v-model="scope.row.relationField" placeholder="请选择">
                      <el-option v-for="item in mainTableFields" :key="item.field"
                        :label="item.field" :value="item.field">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="50">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" class="HONGAN4D-table-delBtn"
                      @click="delItem(scope.row,scope.$index)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-actions" @click="openTableBox">
                <el-button type="text" icon="el-icon-plus">新增一行</el-button>
              </div>
            </template>
          </el-form>
        </el-col>
      </el-row>
      <template v-if="activeStep==1">
        <template v-if="dataForm.formType==1">
          <el-row type="flex" justify="center" align="middle" class="basic-box">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="10" class="basicForm">
              <FieldForm ref="fieldForm" :conf="formData" :enCode="dataForm.enCode" />
            </el-col>
          </el-row>
        </template>
        <template v-if="dataForm.formType==2">
          <Generator ref="generator" :conf="formData" :modelType="6" />
        </template>
      </template>
      <template v-if="activeStep==2">
        <Process ref="processDesign" :conf="flowTemplateJson" @startNodeChange="onStartChange"
          :flowType="dataForm.type" />
      </template>
    </div>
    <icon-box :visible.sync="iconBoxVisible" ref="iconBox" :current="dataForm.icon"
      @choiceIcon="choiceIcon" />
    <TableForm :visible.sync="formVisible" ref="tableForm" @closeForm="closeForm"
      :dbLinkId="dataForm.dbLinkId" />
  </el-dialog>
</template>

<script>
import { FlowEngineInfo, Update, Create } from '@/api/workFlow/FlowEngine'
import { getDataSourceListAll } from '@/api/systemData/dataSource'
import iconBox from '@/components/HONGAN4D-iconBox'
import Process from "@/components/Process"
import Generator from '@/components/Generator/index/Home'
import FieldForm from './FieldForm'
import TableForm from '@/views/generator/TableForm'
import mixin from '@/mixins/generator/common'

export default {
  mixins: [mixin],
  components: { iconBox, Process, Generator, FieldForm, TableForm },
  data() {
    return {
      visible: false,
      activeStep: 0,
      dataForm: {
        id: '',
        category: '',
        fullName: '',
        enCode: '',
        type: 0,
        formData: '',
        description: '',
        formUrl: '',
        appFormUrl: '',
        formType: 1,
        dbLinkId: '0',
        enabledMark: 1,
        sortCode: 0,
        icon: '',
        iconBackground: '#008cff',
        tables: '',
        flowTemplateJson: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '流程名称不能为空', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '流程编码不能为空', trigger: 'blur' },
          { pattern: /^\w+$/, message: '请输入正确的流程编码', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '流程分类不能为空', trigger: 'change' }
        ],
        type: [
          { required: true, message: '流程类型不能为空', trigger: 'change' }
        ],
        formType: [
          { required: true, message: '表单类型不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '流程图标不能为空', trigger: 'click' }
        ],
      },
      tables: [],
      defaultTable: [],
      formVisible: false,
      btnLoading: false,
      mainTableFields: [],
      relationTable: "",
      flowTemplateJson: {},
      formData: null,
      iconBoxVisible: false,
      loading: false,
      categoryList: [],
      formList: [],
      dbOptions: [],
      formType: '系统表单'
    }
  },
  methods: {
    init(categoryList, id, formType) {
      this.categoryList = categoryList
      this.activeStep = 0
      this.tables = []
      this.defaultTable = []
      this.dataForm.id = id || ''
      this.getDbOptions()
      this.visible = true
      this.loading = true
      this.$nextTick(() => {
        if (this.dataForm.id) {
          FlowEngineInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.formType = this.dataForm.formType == 1 ? '系统表单' : '自定义表单'
            this.dataForm.flowTemplateJson && (this.flowTemplateJson = JSON.parse(this.dataForm.flowTemplateJson))
            this.dataForm.formData && (this.formData = JSON.parse(this.dataForm.formData))
            this.tables = this.dataForm.tables && JSON.parse(this.dataForm.tables) || []
            this.defaultTable = this.dataForm.tables && JSON.parse(this.dataForm.tables) || []
            this.updateFields()
            this.loading = false
          }).catch(() => { this.loading = false })
        } else {
          this.dataForm.formType = formType
          this.formType = formType == 1 ? '系统表单' : '自定义表单'
          this.loading = false
        }
      })
    },
    dataFormSubmit() {
      this.$refs['processDesign'].getData().then(res => {
        this.btnLoading = true
        this.flowTemplateJson = res.formData
        this.dataForm.flowTemplateJson = JSON.stringify(this.flowTemplateJson)
        this.dataForm.formData = JSON.stringify(this.formData)
        this.dataForm.tables = JSON.stringify(this.tables)
        const formMethod = this.dataForm.id ? Update : Create
        formMethod(this.dataForm).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.btnLoading = false
              this.closeDialog(true)
            }
          })
        }).catch(() => { this.btnLoading = false })
      }).catch(err => {
        err.msg && this.$message.warning(err.msg)
      })
    },
    next() {
      if (this.activeStep < 1) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (!this.tables.length) {
              if (this.defaultTable.length) {
                this.$message.warning('请至少选择一个数据表')
                return
              }
              this.$store.commit('generator/SET_TABLE', false)
            } else {
              if (!this.exist()) return
              let subTable = this.tables.filter(o => o.typeId == '0')
              this.$store.commit('generator/UPDATE_SUB_TABLE', subTable)
              this.$store.commit('generator/SET_ALL_TABLE', this.tables)
              this.$store.commit('generator/SET_TABLE', true)
              this.$store.commit('generator/UPDATE_FORMITEM_LIST', this.mainTableFields)
            }
            this.activeStep += 1
          }
        })
      } else {
        let model = ''
        if (this.dataForm.formType == 1) {
          model = 'fieldForm'
        } else {
          model = 'generator'
        }
        this.$refs[model].getData().then(res => {
          this.formData = res.formData
          this.activeStep += 1
        }).catch(err => {
          err.msg && this.$message.warning(err.msg)
        })
      }
    },
    typeChange(val) {
      if (val == 1) {
        this.dataForm.icon = ''
        this.dataForm.iconBackground = '#008cff'
      }
    },
    openIconBox() { this.iconBoxVisible = true },
    choiceIcon(value) {
      this.dataForm.icon = value
    },
    onStartChange(node) {
      // console.log(node);
    }
  }
}
</script>