<template>
  <div>
    <el-dialog :title="!dataForm.id ? '新建任务' : '编辑任务'" :close-on-click-modal="false"
      :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scrol append-to-body
      width="600px">
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
        v-loading="loading">
        <el-form-item label="上级任务" prop="parentId">
          <HONGAN4D-TreeSelect :options="taskTreeData" v-model="dataForm.parentId" placeholder="选择上级任务">
          </HONGAN4D-TreeSelect>
        </el-form-item>
        <el-form-item label="任务名称" prop="fullName">
          <el-input v-model="dataForm.fullName" placeholder="任务名称" maxlength="50" />
        </el-form-item>
        <el-form-item label="任务工期" prop="timeLimit">
          <el-input-number v-model="dataForm.timeLimit" :step="1" :min="0"
            controls-position="right">
          </el-input-number>&nbsp;&nbsp;天
        </el-form-item>
        <el-form-item label="开始日期" prop="startTime">
          <el-date-picker v-model="dataForm.startTime" type="date" placeholder="选择日期"
            value-format="timestamp" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endTime">
          <el-date-picker v-model="dataForm.endTime" type="date" placeholder="选择日期"
            value-format="timestamp" :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参与人员" prop="managerIds">
          <el-select v-model="managerIds" placeholder="请选择参与人员" multiple @change="handleChange">
            <el-option v-for="item in options" :key="item.id" :label="item.fullName"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="完成进度" prop="schedule">
          <el-input-number v-model="dataForm.schedule" :precision="2" :step="0.1" :min="0"
            :max="100" controls-position="right" label="11">
          </el-input-number>&nbsp;&nbsp;%
        </el-form-item>
        <el-form-item label="标记颜色" prop="signColor">
          <el-color-picker v-model="dataForm.signColor"
            :predefine="['#188ae2', '#35b8e0', '#26bf8c','#f9c851','#ff5b5b', '#5b69bc', '#ff8acc', '#3b3e47','#282828' ]" />
        </el-form-item>
        <el-form-item label="任务描述" prop="description">
          <el-input v-model="dataForm.description" placeholder="项目描述" type="textarea" :rows="4" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { TaskInfo, TaskCreate, TaskUpdate, TaskTreeView } from '@/api/extend/projectGantt'
import { getUserInfoList } from '@/api/permission/user'
export default {
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.endTime) {
        callback()
      } else {
        if (this.dataForm.endTime < value) {
          callback(new Error('开始日期应该小于结束日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.startTime) {
        callback()
      } else {
        if (this.dataForm.startTime > value) {
          callback(new Error('结束日期应该大于开始日期'));
        } else {
          callback()
        }
      }
    }
    return {
      visible: false,
      btnLoading: false,
      loading: false,
      dataForm: {
        id: 0,
        parentId: '',
        fullName: '',
        managerIds: '',
        startTime: '',
        endTime: '',
        timeLimit: 0,
        schedule: 0,
        description: '',
        projectId: '',
        signColor: '#188ae2'
      },
      dataRule: {
        parentId: [
          { required: true, message: '上级任务不能为空', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        managerIds: [
          { required: true, message: '参与人员不能为空', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '开始日期不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '结束日期不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        timeLimit: [
          { required: true, message: '项目工期不能为空', trigger: 'blur' }
        ],
        schedule: [
          { required: true, message: '完成进度不能为空', trigger: 'blur' }
        ],
      },
      managerIds: [],
      taskTreeData: [],
      projectId: '',
      options: [],
    }
  },
  methods: {
    init(projectId, id, managerIds) {
      this.projectId = projectId
      this.dataForm.id = id || ''
      this.managerIds = []
      this.dataForm.managerIds = ''
      this.visible = true
      this.$nextTick(async () => {
        this.$refs['dataForm'].resetFields()
        this.loading = true
        let res = await TaskTreeView(this.projectId, id || 0)
        this.taskTreeData = res.data.list
        this.changeUser(managerIds)
        if (this.dataForm.id) {
          TaskInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.managerIds = this.dataForm.managerIds.split(',')
          })
        } else {
          this.dataForm.parentId = this.projectId
          this.dataForm.projectId = this.projectId
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? TaskUpdate : TaskCreate
          formMethod(this.dataForm).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('refreshDataList')
              }
            })
          }).catch(() => { this.btnLoading = false })
        }
      })
    },
    handleChange(val) {
      this.dataForm.managerIds = val.join(',')
    },
    async changeUser(value) {
      if (!value) return this.loading = false
      let ids = value.split(',')
      let res = await getUserInfoList(ids)
      if (!res) return
      this.options = res.data.list
      this.loading = false
    }
  }
}
</script>