<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>请假申请</h1>
      <span class="number">流程编码：{{dataForm.billNo}}</span>
    </div>
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
      :disabled="setting.readonly">
      <el-row>
        <el-col :span="12" v-if="judgeShow('flowTitle')">
          <el-form-item label="流程标题" prop="flowTitle">
            <el-input v-model="dataForm.flowTitle" placeholder="流程标题"
              :disabled="judgeWrite('flowTitle')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('flowUrgent')">
          <el-form-item label="紧急程度" prop="flowUrgent">
            <el-select v-model="dataForm.flowUrgent" placeholder="选择紧急程度"
              :disabled="judgeWrite('flowUrgent')">
              <el-option :key="item.value" :label="item.label" :value="item.value"
                v-for="item in flowUrgentOptions" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('applyUser')">
          <el-form-item label="申请人员" prop="applyUser">
            <el-input v-model="dataForm.applyUser" placeholder="申请人员" readonly
              :disabled="judgeWrite('applyUser')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('applyDate')">
          <el-form-item label="申请日期" prop="applyDate">
            <el-date-picker v-model="dataForm.applyDate" type="date" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd" :editable="false" readonly
              :disabled="judgeWrite('applyDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('applyDept')">
          <el-form-item label="申请部门" prop="applyDept">
            <el-input v-model="dataForm.applyDept" placeholder="申请部门" readonly
              :disabled="judgeWrite('applyDept')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('applyPost')">
          <el-form-item label="申请职位" prop="applyPost">
            <el-input v-model="dataForm.applyPost" placeholder="申请职位" readonly
              :disabled="judgeWrite('applyPost')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="judgeShow('leaveType')">
          <el-form-item label="请假类别" prop="leaveType">
            <el-radio-group v-model="dataForm.leaveType" :disabled="judgeWrite('leaveType')">
              <el-radio :label="item" v-for="item in leaveTypeOptions" :key="item">{{item}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="judgeShow('leaveReason')">
          <el-form-item label="请假原因" prop="leaveReason">
            <el-input v-model="dataForm.leaveReason" placeholder="请假原因" type="textarea" :rows="3"
              :disabled="judgeWrite('leaveReason')" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('leaveStartTime')">
          <el-form-item label="起始时间" prop="leaveStartTime">
            <el-date-picker v-model="dataForm.leaveStartTime" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="judgeWrite('leaveStartTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('leaveEndTime')">
          <el-form-item label="结束时间" prop="leaveEndTime">
            <el-date-picker v-model="dataForm.leaveEndTime" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="judgeWrite('leaveEndTime')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('leaveDayCount')">
          <el-form-item label="请假天数" prop="leaveDayCount">
            <el-input v-model="dataForm.leaveDayCount" placeholder="请假天数"
              :disabled="judgeWrite('leaveDayCount')">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="judgeShow('leaveHour')">
          <el-form-item label="请假小时" prop="leaveHour">
            <el-input v-model="dataForm.leaveHour" placeholder="请假小时"
              :disabled="judgeWrite('leaveHour')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="judgeShow('fileJson')">
          <el-form-item label="相关附件" prop="fileJson">
            <HONGAN4D-UploadFz v-model="fileList" type="workFlow" :disabled="judgeWrite('fileJson')" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import comMixin from '../mixin';

export default {
  mixins: [comMixin],
  name: 'LeaveApply',
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!this.dataForm.leaveEndTime) {
        callback()
      } else {
        if (this.dataForm.leaveEndTime < value) {
          callback(new Error('起始日期应该小于结束日期'));
        } else {
          this.$refs.dataForm.validateField('endTime');
          callback()
        }
      }
    }
    var checkEndTime = (rule, value, callback) => {
      if (!this.dataForm.leaveStartTime) {
        callback()
      } else {
        if (this.dataForm.leaveStartTime > value) {
          callback(new Error('结束日期应该大于起始日期'));
        } else {
          callback()
        }
      }
    }
    return {
      billEnCode: 'WF_LeaveApplyNo',
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        applyUser: '',
        applyDate: '',
        applyDept: '',
        applyPost: '',
        leaveType: '事假',
        leaveReason: '',
        leaveStartTime: '',
        leaveEndTime: '',
        leaveDayCount: '',
        leaveHour: '',
        fileJson: ''
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        leaveType: [
          { required: true, message: '请假类别不能为空', trigger: 'change' },
        ],
        leaveReason: [
          { required: true, message: '请假原因不能为空', trigger: 'blur' },
        ],
        leaveStartTime: [
          { required: true, message: '起始时间不能为空', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        leaveEndTime: [
          { required: true, message: '结束时间不能为空', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        leaveDayCount: [
          { required: true, message: '请假天数不能为空', trigger: 'blur' },
          { validator: this.formValidate('allDate', '请假时间必须是整数和0.5的倍数'), trigger: 'blur' },
        ],
        leaveHour: [
          { required: true, message: '请假小时不能为空', trigger: 'blur' },
          { validator: this.formValidate('allDate', '请假小时必须是整数和0.5的倍数'), trigger: 'blur' },
        ],
      },
      leaveTypeOptions: ['事假', '病假', '婚假', '产假', '丧假', '年假', '调休', '其他']
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.applyDate = new Date().getTime()
      this.dataForm.flowTitle = this.userInfo.userName + "的请假申请"
      this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
      this.dataForm.applyDept = this.userInfo.organizeName
      if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
        let list = this.userInfo.positionIds.map(o => o.name)
        this.dataForm.applyPost = list.join(',')
      }
    }
  }
}
</script>