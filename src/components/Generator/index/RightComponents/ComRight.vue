<template>
  <el-row>
    <el-form-item label="控件标题">
      <el-input v-model="activeData.__config__.label" placeholder="请输入控件标题" />
    </el-form-item>
    <el-form-item label="占位提示" v-if="activeData.__config__.hongan4dKey !=='editor'">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item label="默认值">
      <com-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.hongan4dKey==='comSelect'" :multiple="activeData.multiple"
        :key="key" />
      <dep-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.hongan4dKey==='depSelect'" :multiple="activeData.multiple"
        :key="key" />
      <pos-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.hongan4dKey==='posSelect'" :multiple="activeData.multiple"
        :key="key" />
      <user-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.hongan4dKey==='userSelect'" :multiple="activeData.multiple"
        :key="key" />
      <BillRule v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.hongan4dKey==='billRule'" :key="key" />
      <el-input :value="setDefaultValue(activeData.__config__.defaultValue)" placeholder="请输入默认值"
        @input="onDefaultValueInput" v-if="activeData.__config__.hongan4dKey==='editor'" />
    </el-form-item>
    <el-form-item label="能否清空" v-if="activeData.__config__.hongan4dKey!=='editor'">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="能否搜索"
      v-if="['depSelect','posSelect'].includes(activeData.__config__.hongan4dKey)">
      <el-switch v-model="activeData.filterable" />
    </el-form-item>
    <el-form-item label="能否多选" v-if="needMultiple">
      <el-switch v-model="activeData.multiple" @change="multipleChange" />
    </el-form-item>
    <el-form-item label="是否禁用" v-if="activeData.__config__.hongan4dKey !=='editor'">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
  </el-row>
</template>
<script>
import comMixin from './mixin';
export default {
  props: ['activeData'],
  mixins: [comMixin],
  data() {
    return {
      key: +new Date()
    }
  },
  computed: {
    needMultiple() {
      return ['posSelect', 'userSelect', 'comSelect', 'depSelect'].indexOf(this.activeData.__config__.hongan4dKey) > -1
    },
  },
  created() { },
  methods: {
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
      this.activeData.__config__.renderKey = +new Date()
      this.key = +new Date()
    }
  }
}
</script>