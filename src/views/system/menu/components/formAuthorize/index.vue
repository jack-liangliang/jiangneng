<template>
  <div>
    <el-drawer :title="dialogTitle" :visible.sync="listDrawer" :wrapperClosable="false" ref="drawer"
      size="700px" class="HONGAN4D-common-drawer">
      <div class="HONGAN4D-flex-main">
        <div class="HONGAN4D-common-head">
          <topOpts @add="addOrUpdateHandle('')">
            <el-button type="text" icon="el-icon-copy-document" @click="handleBatchAdd">
              批量新增
            </el-button>
            <el-button v-if="menuType === 2" type="text" icon="icon-ym icon-ym-dbLink"
              @click="addDataConnect">
              数据连接
            </el-button>
          </topOpts>
          <div class="HONGAN4D-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh
              HONGAN4D-common-head-icon" :underline="false" @click="getList()" />
            </el-tooltip>
          </div>
        </div>
        <HONGAN4D-table v-loading="listLoading" :data="treeList" row-key="id" default-expand-all
          :tree-props="{ children: 'children', hasChildren: '' }">
          <el-table-column prop="bindTable" label="数据库表" width="120" v-if="menuType == 2"/>
          <el-table-column prop="enCode" label="字段名称" width="160"/>
          <el-table-column prop="fullName" label="字段说明"/>
          <el-table-column prop="sortCode" label="排序" width="90" align="center"/>
          <el-table-column prop="enabledMark" label="状态" width="90">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enabledMark == 1 ? 'success' : 'danger'" disable-transitions>
                {{ scope.row.enabledMark == 1 ? "正常" : "停用" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)" @del="handleDel(scope.row.id)" />
            </template>
          </el-table-column>
        </HONGAN4D-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-drawer>
    <Form v-if="formVisible" ref="form" @refreshDataList="getList" />
    <BatchForm v-if="batchFormVisible" ref="batchForm" @refreshDataList="getList" />
    <FormConnectForm v-if="FormConnectFormVisible" ref="FormConnectForm"
      @refreshDataList="getConnectList" />
  </div>
</template>

<script>
import {
  getFormAuthorizeList,
  updateFormState,
  delForm,
} from "@/api/system/formAuthorize";
import Form from "./Form";
import BatchForm from "./BatchForm";
import FormConnectForm from "../connectForm";
import { getFieldNameList } from "@/api/system/menu";
import { getDataSourceListAll } from "@/api/systemData/dataSource";
export default {
  components: {
    Form,
    BatchForm,
    FormConnectForm,
  },
  data() {
    return {
      listDrawer: false,
      formVisible: false,
      batchFormVisible: false,
      FormConnectFormVisible: false,
      dialogTitle: "",
      listQuery: {
        keyword: "",
      },
      moduleId: "",
      loading: false,
      btnLoading: false,
      listLoading: false,
      treeList: [],
      menuType: 2,
      dbOptions: [],
      dbList: [],
      tableName:''
    };
  },
  methods: {
    init(moduleId, fullName, type) {
      this.menuType = type;/* 2=代码生成 3=在线 */
      this.listDrawer = true;
      this.moduleId = moduleId;
      this.dialogTitle = `表单权限 - ${fullName}`;
      this.dbList = [];
      this.dbOptions = [];
      this.$nextTick(() => {
        if (this.$refs["FormConnectForm"]) {
          this.$refs["FormConnectForm"].dataForm.dataSelect = "";
        }
        this.listQuery.keyword = "";
        this.getList();
      });
      if (this.menuType === 3) {
        getFieldNameList(this.moduleId,'Form').then((res) => {
          this.dbList = res.data || [];
        });
      } else {
        if (this.menuType === 2) {
          this.getDataSourceListAll();
        }
      }
    },
    getDataSourceListAll() {
      const defaultItem = {
        fullName: "",
        children: [
          {
            fullName: "默认数据库",
            id: "0",
          },
        ],
      };
      getDataSourceListAll()
        .then((res) => {
          const list = [defaultItem, ...res.data.list];
          this.dbOptions = list.filter((o) => o.children && o.children.length);
        })
        .catch(() => {
          this.dbOptions = [defaultItem];
        });
    },
    //数据连接
    addDataConnect() {
      this.FormConnectFormVisible = true;
      this.$nextTick(() => {
        this.$refs.FormConnectForm.init(this.dbOptions);
      });
    },
    getConnectList(data,tableName) {
       this.tableName = tableName || ''
      this.dbList = data;
    },
    getList() {
      this.listLoading = true;
      getFormAuthorizeList(this.moduleId, this.listQuery)
        .then((res) => {
          this.treeList = res.data.list;
          this.listLoading = false;
          this.btnLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
          this.btnLoading = false;
        });
    },
    handleReLoad() {
      this.btnLoading = true;
      this.getList();
    },
    handleUpdateState(row) {
      const txt = row.enabledMark ? "禁用" : "开启";
      this.$confirm(`您确定要${txt}当前表单权限吗, 是否继续?`, "提示", {
        type: "warning",
      })
        .then(() => {
          updateFormState(row.id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                row.enabledMark = row.enabledMark ? 0 : 1;
              },
            });
          });
        })
        .catch(() => { });
    },
    addOrUpdateHandle(id) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.form.init(this.moduleId, id, this.menuType, this.dbList,this.tableName);
      });
    },
    handleBatchAdd() {
      this.batchFormVisible = true;
      this.$nextTick(() => {
        this.$refs.batchForm.init(this.moduleId);
      });
    },
    handleDel(id) {
      this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
        type: "warning",
      })
        .then(() => {
          delForm(id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1500,
              onClose: () => {
                this.getList();
              },
            });
          });
        })
        .catch(() => { });
    },
  },
};
</script>
