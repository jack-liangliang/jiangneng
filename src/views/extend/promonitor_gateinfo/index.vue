<template>
    <div class="HONGAN4D-common-layout">

        <div class="HONGAN4D-common-layout-center">
            <el-row class="HONGAN4D-common-search-box" :gutter="16">
                <el-form @submit.native.prevent>
                                            <el-col :span="6">
                                <el-form-item label="管理单位">
                                        <el-select v-model="query.supplementguid" placeholder="请选择"
                                                   clearable>
                                            <el-option v-for="(item, index) in supplementguidOptions" :key="index"
                                                       :label="item.ManageUnitName" :value="item.Id"
                                                       :disabled="item.disabled"></el-option>
                                        </el-select>
                                </el-form-item>
                            </el-col>
                        <el-col :span="6">
                                <el-form-item label="工程ID">
                                        <el-select v-model="query.proinfoguid" placeholder="请选择"
                                                   clearable>
                                            <el-option v-for="(item, index) in proinfoguidOptions" :key="index"
                                                       :label="item.ProName" :value="item.Id"
                                                       :disabled="item.disabled"></el-option>
                                        </el-select>
                                </el-form-item>
                            </el-col>
                        <el-col :span="6">
                                <el-form-item label="闸门名称">
                                        <el-input v-model="query.gatename" placeholder="请输入" clearable>  </el-input>
                                </el-form-item>
                            </el-col>
                        <template v-if="showAll">
                                    <el-col :span="6">
                                        <el-form-item label="闸门类型">
                                                <el-select v-model="query.gatetypeenumid" placeholder="请选择"
                                                           clearable>
                                                    <el-option v-for="(item, index) in gatetypeenumidOptions" :key="index"
                                                               :label="item.fullName" :value="item.id"
                                                               :disabled="item.disabled"></el-option>
                                                </el-select>
                                        </el-form-item>
                                    </el-col>
                        </template>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                            <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                                <el-button type="text" icon="el-icon-arrow-down" @click="showAll=true" v-if="!showAll">
                                    展开
                                </el-button>
                                <el-button type="text" icon="el-icon-arrow-up" @click="showAll=false" v-else>
                                    收起
                                </el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div class="HONGAN4D-common-layout-main HONGAN4D-flex-main">
                <div class="HONGAN4D-common-head">
                    <div>
                                    <el-button type="primary" icon="el-icon-plus"  @click="addOrUpdateHandle()">新增
                                    </el-button>
                    </div>
                    <div class="HONGAN4D-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                                     @click="reset()"/>
                        </el-tooltip>
                        <screenfull isContainer/>
                    </div>
                </div>
                <HONGAN4D-table v-loading="listLoading" :data="list" @sort-change='sortChange' >
                            <el-table-column prop="supplementguid" label="管理单位" width="0" align="left"
/>
                            <el-table-column prop="stcd" label="测站编码" width="0" align="left"
/>
                            <el-table-column prop="longitude" label="经度" width="0" align="left"
/>
                            <el-table-column prop="latitude" label="纬度" width="0" align="left"
/>
                            <el-table-column prop="orderindex" label="排序" width="0" align="left"
 sortable="custom" />
                            <el-table-column prop="proinfoguid" label="工程ID" width="0" align="left"
/>
                            <el-table-column prop="gatename" label="闸门名称" width="0" align="left"
/>
                            <el-table-column prop="gatetypeenumid" label="闸门类型" width="0" align="left"
/>
                            <el-table-column prop="gateheight" label="闸门盖高度" width="0" align="left"
 sortable="custom" />
                            <el-table-column prop="ua" label="UA" width="0" align="left"
/>
                            <el-table-column prop="ub" label="UB" width="0" align="left"
/>
                            <el-table-column prop="uc" label="UC" width="0" align="left"
/>
                            <el-table-column prop="p" label="功率" width="0" align="left"
/>
                        <el-table-column label="操作" fixed="right"
                                         width="100" >
                            <template slot-scope="scope">
                                        <el-button type="text"
                                                   @click="addOrUpdateHandle(scope.row.id)" >编辑
                                        </el-button>
                                        <el-button type="text" class="HONGAN4D-table-delBtn"  @click="handleDel(scope.row.id)">删除
                                        </el-button>
                            </template>
                        </el-table-column>
                </HONGAN4D-table>
                    <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="initData"/>
            </div>
        </div>
        <HONGAN4D-Form v-if="formVisible" ref="HONGAN4DForm" @refresh="refresh"/>
        <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download"/>
        <Detail v-if="detailVisible" ref="Detail" @refresh="detailVisible=false"/>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import {getDictionaryDataSelector} from '@/api/systemData/dictionary'
    import HONGAN4DForm from './Form'
    import ExportBox from './ExportBox'
    import {getDataInterfaceRes} from '@/api/systemData/dataInterface'
    import Detail from './Detail'

    export default {
        components: {HONGAN4DForm, ExportBox,Detail},
        data() {
            return {
                    showAll: false,
                detailVisible: false,
                query: {
                                supplementguid:undefined,
                                proinfoguid:undefined,
                                gatename:undefined,
                                gatetypeenumid:undefined,
                },
                treeProps: {
                    children: 'children',
                    label: 'fullName',
                    value: 'id'
                },
                list: [],
                listLoading: true,
                    total: 0,
                listQuery: {
                        currentPage: 1,
                        pageSize: 20,
                    sort: "desc",
                    sidx: "",
                },
                formVisible: false,
                exportBoxVisible: false,
                columnList: [
                    {prop: 'supplementguid', label: '管理单位'},
                    {prop: 'stcd', label: '测站编码'},
                    {prop: 'longitude', label: '经度'},
                    {prop: 'latitude', label: '纬度'},
                    {prop: 'orderindex', label: '排序'},
                    {prop: 'proinfoguid', label: '工程ID'},
                    {prop: 'gatename', label: '闸门名称'},
                    {prop: 'gatetypeenumid', label: '闸门类型'},
                    {prop: 'gateheight', label: '闸门盖高度'},
                    {prop: 'ua', label: 'UA'},
                    {prop: 'ub', label: 'UB'},
                    {prop: 'uc', label: 'UC'},
                    {prop: 'p', label: '功率'},
                ],
                            supplementguidOptions:[],
                            supplementguidProps:{"label":"ManageUnitName","value":"Id"},
                            proinfoguidOptions:[],
                            proinfoguidProps:{"label":"ProName","value":"Id"},
                            gatetypeenumidOptions:[],
                            gatetypeenumidProps:{"label":"fullName","value":"id"},
            }
        },
        computed: {
            menuId() {
                return this.$route.meta.modelId || ''
            }
        },
        created() {
                this.initData()
                    this.getsupplementguidOptions();
                    this.getproinfoguidOptions();
                    this.getgatetypeenumidOptions();
        },
        methods: {
                    getsupplementguidOptions() {
                        getDataInterfaceRes('306353102468939909').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.supplementguidOptions = data
                        })
                    },
                    getproinfoguidOptions() {
                        getDataInterfaceRes('306039649598439557').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.proinfoguidOptions = data
                        })
                    },
                    getgatetypeenumidOptions() {
                        getDictionaryDataSelector('306061602317140101').then(res => {
                            this.gatetypeenumidOptions = res.data.list
                        })
                    },
            goDetail(id){
                this.detailVisible = true
                this.$nextTick(() => {
                    this.$refs.Detail.init(id)
                })
            },
            sortChange({column, prop, order}) {
                this.listQuery.sort = order == 'ascending' ? 'asc' : 'desc'
                this.listQuery.sidx = !order ? '' : prop
                this.initData()
            },
            initData() {
                this.listLoading = true;
                let _query = {
                    ...this.listQuery,
                    ...this.query,
                    menuId:this.menuId
                };
                request({
                    url: `/api/example/ProMonitor_GateInfo/getList`,
                    method: 'post',
                    data: _query
                }).then(res => {
                    var _list =[];
                    for(let i=0;i<res.data.list.length;i++){
                        let _data = res.data.list[i];
                        _list.push(_data)
                    }
                    this.list = _list
                        this.total = res.data.pagination.total

                    this.listLoading = false
                })
            },
            handleDel(id) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    request({
                        url: `/api/example/ProMonitor_GateInfo/${id}`,
                        method: 'DELETE'
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: res.msg,
                            onClose: () => {
                                this.initData()
                            }
                        });
                    })
                }).catch(() => {
                });
            },
            addOrUpdateHandle(id, isDetail) {
                this.formVisible = true
                this.$nextTick(() => {
                    this.$refs.HONGAN4DForm.init(id, isDetail)
                })
            },
            exportData() {
                this.exportBoxVisible = true
                this.$nextTick(() => {
                    this.$refs.ExportBox.init(this.columnList)
                })
            },
            download(data) {
                let query = {...data, ...this.listQuery, ...this.query,menuId:this.menuId}
                request({
                    url: `/api/example/ProMonitor_GateInfo/Actions/Export`,
                    method: 'GET',
                    data: query
                }).then(res => {
                    if (!res.data.url) return
                    window.location.href = this.define.comUrl + res.data.url
                    this.$refs.ExportBox.visible = false
                    this.exportBoxVisible = false
                })
            },
            search() {
                this.listQuery = {
                        currentPage: 1,
                        pageSize: 20,
                    sort: "desc",
                    sidx: "",
                }
                this.initData()
            },
            refresh(isrRefresh) {
                this.formVisible = false
                if (isrRefresh) this.reset()
            },
            reset() {
                for (let key in this.query) {
                    this.query[key] = undefined
                }
                this.search()
            }
        }
    }
</script>
