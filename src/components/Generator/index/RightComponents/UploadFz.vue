<template>
  <el-row>
    <el-form-item label="控件标题">
      <el-input v-model="activeData.__config__.label" placeholder="请输入控件标题" />
    </el-form-item>
    <el-form-item label="文件类型">
      <el-select v-model="activeData.accept" placeholder="不限制" clearable @change="onChange">
        <el-option label="图片" value="image/*" />
        <el-option label="视频" value="video/*" />
        <el-option label="音频" value="audio/*" />
        <el-option label="excel" value=".xls,.xlsx" />
        <el-option label="word" value=".doc,.docx" />
        <el-option label="pdf" value=".pdf" />
        <el-option label="txt" value=".txt" />
      </el-select>
    </el-form-item>
    <el-form-item label="文件大小">
      <el-input v-model.number="activeData.fileSize" placeholder="请输入文件大小" @change="onChange">
        <el-select slot="append" v-model="activeData.sizeUnit" :style="{ width: '66px' }"
          @change="onChange">
          <el-option label="KB" value="KB" />
          <el-option label="MB" value="MB" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item label="按钮文字">
      <el-input v-model="activeData.buttonText" placeholder="请输入按钮文字" />
    </el-form-item>
    <el-form-item label="最大上传数">
      <el-input-number :value="activeData.limit" :min="0" placeholder="最大上传数"
        @input="$set(activeData, 'limit', $event?$event:undefined)" :step="1"
        controls-position="right" @change="onChange" />
    </el-form-item>
    <el-form-item label="显示提示">
      <el-switch v-model="activeData.showTip" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
  </el-row>
</template>
<script>
import comMixin from './mixin';
export default {
  props: ['activeData'],
  mixins: [comMixin],
  data() {
    return {}
  },
  created() { },
  methods: {
    onChange() {
      this.activeData.__config__.renderKey = +new Date()
    }
  }
}
</script>