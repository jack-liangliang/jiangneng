<template>
  <div class="transfer__body" v-loading="loading" :style="{height}">
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <el-input placeholder="输入关键词进行搜索" v-model="filterText" @keyup.enter.native="search"
          clearable>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="transfer-pane__body">
        <el-tree :data="treeData" :props="props" default-expand-all ref="treeBox"
          :expand-on-click-node="false" check-on-click-node class="HONGAN4D-common-el-tree"
          node-key="id" show-checkbox v-loading="loading" :filter-node-method="filterNode"
          @check="onCheck">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i :class="data.icon"></i>
            <span class="text">{{node.label}}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <span>已选</span>
        <el-button @click="removeAll" type="text" class="removeAllBtn">清空列表</el-button>
      </div>
      <div class="transfer-pane__body shadow right-pane">
        <template>
          <div v-for="(item, index) in selectedTextData" :key=" index" class="selected-item">
            <span>{{ item.fullName}}</span>
            <i class="el-icon-delete" @click="removeData(item,index)"></i>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HONGAN4D-transfer',
  data() {
    return {
      selectedData: [],
      selectedTextData: [],
      filterText: ''
    }
  },
  props: {
    height: {
      type: String,
      default: "380px"
    },
    loading: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {
        return { value: "id", label: "fullName", children: "children" };
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    value(val) {
      this.initHandle()
    },
  },
  methods: {
    initHandle() {
      if (this.value.length) {
        this.$refs.treeBox.setCheckedKeys(this.value)
        this.$nextTick(_ => {
          this.selectedTextData = this.$refs.treeBox.getCheckedNodes(true)
          this.selectedData = this.$refs.treeBox.getCheckedKeys(true)
        })
      } else {
        this.$refs.treeBox.setCheckedKeys([])
        this.selectedTextData = []
        this.selectedData = []
      }
    },
    search() {
      this.$refs.treeBox.filter(this.filterText);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.fullName.indexOf(value) !== -1;
    },
    onCheck(data, checked) {
      if (this.type) {
        let list = this.$refs.treeBox.getCheckedNodes(true)
        this.selectedTextData = list.filter(o => o.type == this.type)
      } else {
        this.selectedTextData = this.$refs.treeBox.getCheckedNodes(true)
      }
      this.selectedData = this.selectedTextData.map(o => o.id)
      this.$emit('input', this.selectedData)
      this.$emit('getValue', this.selectedData, this.selectedTextData)
    },
    removeData(item, index) {
      this.$refs.treeBox.setChecked(item.id, false)
      this.selectedData.splice(index, 1)
      this.selectedTextData.splice(index, 1)
      this.$emit('input', this.selectedData)
      this.$emit('getValue', this.selectedData, this.selectedTextData)
    },
    removeAll() {
      this.$refs.treeBox.setCheckedKeys([])
      this.selectedData = []
      this.selectedTextData = []
      this.$emit('input', this.selectedData)
      this.$emit('getValue', this.selectedData, this.selectedTextData)
    },
  }
};
</script>