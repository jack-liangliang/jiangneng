<template>
  <el-dialog
    :title="!dataForm.id ? '新建字段' : '编辑字段'"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible"
    lock-scroll
    class="HONGAN4D-dialog HONGAN4D-dialog_center"
    width="600px"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="80px"
      v-loading="formLoading"
      class="menuForm"
    >
      <!--      <el-form-item label="绑定表格" prop="bindTable">-->
      <!--        <el-input v-model="dataForm.bindTable" placeholder="输入绑定表格" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="表格描述" prop="bindTableName">-->
      <!--        <el-input v-model="dataForm.bindTableName" placeholder="绑定表格描述" />-->
      <!--      </el-form-item>-->
      <!-- <el-form-item label="字段名称" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入字段名称" />
      </el-form-item> -->
      <el-form-item label="字段名称" prop="enCode">
        <el-select
          v-if="enCodeOptions.length > 0"
          v-model="dataForm.enCode"
          placeholder="请选择字段名称"
          clearable
          @change="onEnCodeChange"
        >
          <el-option
            v-for="item in enCodeOptions"
            :key="item.field"
            :label="item.field"
            :value="item.field"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="dataForm.enCode"
          placeholder="输入字段名称"
          v-else-if="enCodeOptions.length === 0"
        />
      </el-form-item>
      <el-form-item label="字段规则" prop="fieldRule">
        <el-select
          v-model="dataForm.fieldRule"
          placeholder="请选择字段名称"
          clearable
        >
          <el-option
            v-for="item in fieldRuleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段说明" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入字段说明" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number
          :min="0"
          :max="999999"
          v-model="dataForm.sortCode"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch
          v-model="dataForm.enabledMark"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="dataForm.description" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{
        $t("common.cancelButton")
      }}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{ $t("common.confirmButton") }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import {
  createColumn,
  updateColumn,
  getColumnInfo
} from "@/api/system/columnAuthorize";

export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: "",
        moduleId: "",
        bindTable: "",
        bindTableName: "",
        fullName: "",
        enCode: "",
        sortCode: 0,
        enabledMark: 1,
        description: "",
        fieldRule: 0
      },
      enCodeOptions: [],
      fieldRuleOptions: [
        { value: 0, label: "主表规则" },
        { value: 1, label: "副表规则" }
      ],
      dataRule: {
        enCode: [
          { required: true, message: "字段名称不能为空", trigger: "blur" }
        ],
        fullName: [
          { required: true, message: "字段说明不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(moduleId, id, menuType, dbList, tableName) {
      this.menuType = menuType;
      this.dataForm.id = id || "";
      this.dataForm.moduleId = moduleId;
      this.visible = true;
      this.formLoading = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.enCodeOptions = dbList;
        this.dataForm.bindTable = tableName;
        // 获取字段数据
        if (this.dataForm.id) {
          getColumnInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data;
          });
        }
        this.formLoading = false;
      });
    },
    onEnCodeChange(e) {
      let objVal;
      this.dataForm.fullName = "";
      this.dataForm.type = "";
      if (!!e) {
        this.enCodeOptions.forEach(o => {
          if (o.field === e) {
            objVal = {
              fullName: o.fieldName,
              type: o.dataType
            };
            return objVal;
          }
        });
        this.dataForm.fullName = objVal["fullName"];
        this.dataForm.type = objVal["type"];
      }
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const formMethod = this.dataForm.id ? updateColumn : createColumn;
          formMethod(this.dataForm)
            .then(res => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.btnLoading = false;
                  this.$emit("refreshDataList");
                }
              });
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
