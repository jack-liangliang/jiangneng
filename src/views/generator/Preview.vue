<template>
  <el-dialog :visible.sync="visible" fullscreen lock-scroll class="HONGAN4D-full-dialog"
    :show-close="false" :modal="false">
    <div class="HONGAN4D-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/hongan4d.png" class="header-logo" />
        <p class="header-txt"> · 代码预览</p>
      </div>
      <div class="options">
        <el-button @click="closeDialog()">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <div class="HONGAN4D-common-layout main" v-loading="loading">
      <div class="HONGAN4D-common-layout-left">
        <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
          ref="treeBox" :expand-on-click-node="false" @node-click="handleNodeClick"
          class="HONGAN4D-common-el-tree" node-key="id">
          <span class="custom-tree-node" slot-scope="{ node }">
            <el-tooltip :content="node.label" placement="right">
              <span class="text">{{node.label}}</span>
            </el-tooltip>
          </span>
        </el-tree>
      </div>
      <div class="HONGAN4D-common-layout-center">
        <div class="HONGAN4D-common-layout-main">
          <HONGAN4DCodeEditor v-model="currentContent" :options="options" ref="CodeEditor" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { CodePreview } from '@/api/onlineDev/visualDev'
import HONGAN4DCodeEditor from '@/components/HONGAN4DEditor/monaco'
export default {
  components: { HONGAN4DCodeEditor },
  data() {
    return {
      loading: false,
      visible: false,
      dataForm: {
        module: 'system',
        description: '',
        subClassName: '',
        className: ''
      },
      defaultProps: {
        children: 'children',
        label: 'fileName'
      },
      treeData: [],
      options: {
        language: 'java'
      },
      currentName: '',
      currentId: '',
      currentContent: ''
    }
  },
  methods: {
    init(tables, id) {
      if (!tables || !id) {
        this.closeDialog()
        return
      }
      let tablesList = JSON.parse(tables)
      this.visible = true
      this.loading = true
      this.$nextTick(() => {
        let subClassName = []
        for (let i = 0; i < tablesList.length; i++) {
          let e = tablesList[i]
          if (e.typeId == '1') {
            this.dataForm.className = e.table
            this.dataForm.description = e.table
          } else {
            subClassName.push(e.table)
          }
        }
        this.dataForm.subClassName = subClassName.join()
        CodePreview(id, this.dataForm).then(res => {
          this.treeData = res.data.list
          this.currentName = this.treeData[0].children[0].fileName
          this.currentId = this.treeData[0].children[0].currentId
          this.currentContent = this.treeData[0].children[0].fileContent
          this.$nextTick(() => {
            this.$refs.treeBox.setCurrentKey(this.currentName);
            this.$refs.CodeEditor.changeEditor({
              value: this.currentContent,
              options: this.options
            })
          });
          this.loading = false
        }).catch(() => {
          this.closeDialog()
          this.loading = false
        })
      })
    },
    closeDialog() {
      this.visible = false
      this.$emit('close')
    },
    handleNodeClick(data) {
      if (this.currentName == data.fileName && this.currentId == data.id) return
      this.options.language = data.fileType === 'vue' ? 'html' : 'java'
      this.currentName = data.fileName
      this.currentId = data.id
      this.currentContent = data.fileContent
      this.$refs.CodeEditor.changeEditor({
        value: this.currentContent,
        options: this.options
      })
    },
  }
}
</script>
<style lang="scss" scoped>
>>> .main {
  padding: 10px;
  .HONGAN4D-common-layout-main {
    padding: 0;
  }
}
</style>