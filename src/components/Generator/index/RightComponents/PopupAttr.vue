<template>
  <el-row>
    <el-form-item label="控件标题">
      <el-input v-model="activeData.__config__.label" placeholder="请输入控件标题" />
    </el-form-item>
    <el-form-item label="关联弹窗">
      <el-select v-model="activeData.relationField" placeholder="请选择关联弹窗" clearable>
        <el-option v-for="(item,i) in options" :key="i" :label="item.__config__.label"
          :value="item.prop" />
      </el-select>
    </el-form-item>
    <el-form-item label="关联字段">
      <el-input v-model="activeData.showField" placeholder="请输入关联字段" />
    </el-form-item>
  </el-row>
</template>
<script>
import comMixin from './mixin'
import { getDrawingList } from '@/components/Generator/utils/db'
export default {
  props: ['activeData'],
  mixins: [comMixin],
  data() {
    return {
      options: [],
      fieldOptions: [],
    }
  },
  methods: {
    getOptions() {
      const drawingList = getDrawingList() || []
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__config__ && data.__config__.hongan4dKey) {
          if (data.__config__.hongan4dKey === 'popupSelect' && data.__vModel__) {
            list.push(data)
          }
        }
      }
      loop(drawingList)
      this.options = list.map(o => ({
        ...o,
        prop: o.__config__ && o.__config__.tableName ? o.__vModel__ + '_hongan4dTable_' + o.__config__.tableName + (o.__config__.isSubTable ? '0' : "1") : o.__vModel__
      }))
    }
  }
}
</script>