<template>
  <el-select v-model="valueTitle" :clearable="clearable" :disabled="disabled" @clear="clearHandle"
    ref='elSelect' :placeholder="placeholder" :popper-class="`HONGAN4D-select-tree ${themeClass}`"
    @focus="selectFocus" :filterable="filterable" :filter-method="selectFilter"
    class="HONGAN4D-selectTree" @visible-change="visibleChange" :multiple="multiple"
    :collapse-tags="collapseTags" @remove-tag="removeTag" :key="key">
    <el-option v-for="item in selectOptions" :key="item.id" :label="item[props.label]"
      :value="item[props.value]" style="display:none"></el-option>
    <el-option :value="optionTitle" :label="optionTitle" class="options">
      <el-tree id="tree-option" ref="selectTree" :accordion="accordion" :data="options"
        :default-expand-all="defaultExpandAll" :props="props" :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey" @node-click="handleNodeClick"
        :filter-node-method="filterNode" :show-checkbox="multiple" :check-on-click-node="multiple"
        :class="{'single':!multiple}" :expand-on-click-node="!multiple" @check="check"
        v-show="options.length">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <slot :data="{ node, data }">
            <i :class="data.icon" v-if="data.icon"></i>
            <span class="text">{{node.label}}</span>
          </slot>
          <!-- 自定义slot示例 开始 -->
          <!-- <template slot-scope="{data}">
            <i :class="data.data.icon"></i>
            <span class="text">{{data.node.label}}</span>
          </template> -->
          <!-- 自定义slot示例 结束 -->
        </span>
      </el-tree>
      <p v-show="!options.length" class="empty-text">无数据</p>
    </el-option>
  </el-select>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "el-tree-select",
  props: {
    // 配置项
    props: {
      type: Object,
      default: () => ({
        value: 'id',             // ID字段名
        label: 'fullName',       // 显示名称
        children: 'children',    // 子级字段名
      })
    },
    // 是否禁用
    disabled: { type: Boolean, default: false },
    // 选项列表数据(树形结构的对象数组)
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: '请选择' },
    // 初始值
    value: {
      type: [String, Array]
    },
    // 可清空选项
    clearable: { type: Boolean, default: false },
    // 能否搜索
    filterable: { type: Boolean, default: true },
    // 只能选择最后一层的数值
    lastLevel: { type: Boolean, default: false },
    // 只能选择最后一层的数值时，需要根据 lastLevelKey来判断是否最后一层
    lastLevelKey: { type: String, default: "hasChildren" },
    lastLevelValue: { default: false },
    // 自动收起
    accordion: { type: Boolean, default: false },
    defaultExpandAll: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false }, // 是否多选，默认单选
    collapseTags: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapState({
      themeClass: state => state.settings.themeClass
    })
  },
  data() {
    return {
      valueTitle: '',
      defaultExpandedKey: [],
      selectOptions: [],
      optionTitle: "",
      key: +new Date()
    }
  },
  mounted() {
    if (this.value) {
      this.initHandle()
    }
  },
  methods: {
    visibleChange(val) {
      this.$emit('visible-change', val)
    },
    selectFilter(val) {
      if (this.options.length) this.$refs.selectTree.filter(val);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.props.label].indexOf(value) !== -1;
    },
    selectFocus() {
      this.initHandle()
    },
    // 初始化值
    initHandle() {
      this.$refs.selectTree.filter('');
      if (this.value) {
        if (this.multiple) {
          setTimeout(() => {
            let titleList = []
            this.$refs.selectTree.setCheckedKeys(this.value)
            if (this.lastLevel) {
              titleList = this.$refs.selectTree.getCheckedNodes(true)
            } else {
              titleList = this.$refs.selectTree.getCheckedNodes()
            }
            this.selectOptions = titleList
            this.valueTitle = titleList.map(o => o[this.props.value])
          }, 10)
        } else {
          setTimeout(() => {
            this.valueTitle = this.$refs.selectTree.getNode(this.value) ? this.$refs.selectTree.getNode(this.value).data[this.props.label] : ''     // 初始化显示
            this.$refs.selectTree.setCurrentKey(this.value)       // 设置默认选中
            this.defaultExpandedKey = [this.value]   // 设置默认展开
          }, 10);
        }
      } else {
        if (this.multiple) {
          this.valueTitle = []
          this.$refs.selectTree.setCheckedKeys([])
        } else {
          this.valueTitle = ''
          this.$refs.selectTree.setCurrentKey(null)
        }
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let list = document.querySelectorAll('.HONGAN4D-select-tree .el-scrollbar .el-select-dropdown__wrap')
        // 有多个下拉框，造成页面错位
        let index = list.length - 1
        let scrollWrap = list[index]
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style && (scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;')
        for (let i = 0; i < scrollBar.length; i++) {
          scrollBar[i].style.width = 0
        }
      })
    },
    // 单选切换选项
    handleNodeClick(node) {
      if (!this.multiple) {
        if (this.lastLevel && node[this.lastLevelKey] && node[this.lastLevelKey] != this.lastLevelValue) return
        this.valueTitle = node[this.props.label]
        this.$emit('input', node[this.props.value], node)
        this.$emit('change', node[this.props.value], node)
        this.defaultExpandedKey = []
        this.$refs.elSelect.blur()
      }
    },
    // 多选选择
    check(node) {
      if (!this.multiple) return
      let selectedData = [], titleList = [], selectedTextData = []
      if (this.lastLevel) {
        selectedTextData = this.$refs.selectTree.getCheckedNodes(true)
        for (let i = 0; i < selectedTextData.length; i++) {
          const e = selectedTextData[i];
          if (e[this.lastLevelKey] == this.lastLevelValue) {
            selectedData.push(e[this.props.value])
            titleList.push(e[this.props.label])
          }
        }
      } else {
        selectedTextData = this.$refs.selectTree.getCheckedNodes()
        for (let i = 0; i < selectedTextData.length; i++) {
          const e = selectedTextData[i];
          selectedData.push(e[this.props.value])
          titleList.push(e[this.props.label])
        }
      }
      this.$emit('input', selectedData, selectedTextData)
      this.$emit('change', selectedData, selectedTextData)
    },
    removeTag(tag) {
      this.$refs.selectTree.setChecked(tag, false)
      this.check()
    },
    // 清除选中
    clearHandle() {
      if (this.multiple) {
        this.valueTitle = []
        this.$emit('input', [])
        this.$emit('change', [], [])
        this.$refs.selectTree.setCheckedKeys([])
      } else {
        this.valueTitle = ''
        this.$emit('input', '')
        this.$emit('change', '', '')
      }
      this.defaultExpandedKey = []
      this.clearSelected()
    },
    // 清空选中样式
    clearSelected() {
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      for (let i = 0; i < allNode.length; i++) {
        allNode[i].classList.remove('is-current')
      }
    }
  },
  watch: {
    value(val) {
      this.initHandle()
    },
    multiple(val) {
      this.key = +new Date()
    },
    options(val) {
      if (this.value) this.initHandle()
    }
  }
}
</script>

<style lang="scss" scoped>
.HONGAN4D-selectTree {
  width: 100%;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: #fff;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree.single >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree.single >>> .is-current .el-tree-node__content .custom-tree-node {
  color: #409eff;
  font-weight: 700;
}
.el-tree.single >>> .is-current .el-tree-node__children .custom-tree-node {
  color: #606266;
  font-weight: normal;
}
.el-tree.single >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.empty-text {
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
  background: #fff;
  cursor: auto;
  padding: 0;
  line-height: 24px;
}
</style>