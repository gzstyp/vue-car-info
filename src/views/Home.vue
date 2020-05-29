<template>
    <div>
        <el-row>
            <el-row :span="18" :push="3">
                <el-form label-width="80px">
                    <el-form-item label="汽车名称">
                        <el-col :span="10">
                            <el-input v-model="searchForm.carName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="价格区间">
                        <el-col :span="11">
                            <el-input prefix-icon="el-icon-money" placeholder="最小价格" v-model="searchForm.minPrice" style="width: 100%;"></el-input>
                        </el-col>
                        <el-col :span="11">
                            <el-input prefix-icon="el-icon-money" placeholder="最大价格" v-model="searchForm.maxPrice" style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :push="0">
                            <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
                            <el-button type="info" icon="el-icon-circle-close" @click="onReset()">重置</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" icon="el-icon-plus" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-col>
        </el-row>
        <el-table :data="carList" border stripe style="width: 100%">
            <el-table-column prop="carName" label="汽车名称" width="180"></el-table-column>
            <el-table-column prop="price" label="销售价格" width="180"></el-table-column>
            <el-table-column prop="stock" label="库存数量"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="changeSize"
          @current-change="changeCurrent"
          :current-page="page.current"
          :page-size="page.size"
          :page-sizes="page.sizes"
          layout="total,sizes,prev,pager,next,jumper"
          :total="page.total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: 'Home',
        components: {
        },
        data() {
            return {
                searchForm: {
                    carName: '',
                    minPrice: '',
                    maxPrice: '',
                },
                carList: [],//空数组,要从后端获取数据
                page : {
                    current : 1,//当前页,page.currentPage
                    total : 0,
                    size : 2,//默认10每页条数,page.pageSize
                    sizes : [2,4,10]//下拉选项每页条数,page.listSize
                }
            }
        },
        /*html加载完成之前，执行。执行顺序：父组件-子组件,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。*/
        created : function(){
            this.search();
        },
        /*页面初始化方法,html加载完成后执行。执行顺序：子组件-父组件,在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作*/
        mounted : function(){
        },
        /*事件方法执行*/
        methods : {
            onSubmit : function (){
            },
            onReset : function (){
            },
            search : function(){
                var params = {
                    current : this.page.current,
                    pageSize : this.page.size,
                };
                //这个写法有值时才传递
                if(this.searchForm.carName){
                    params.carName = this.searchForm.carName;
                }
                if(this.searchForm.minPrice){
                    params.minPrice = this.searchForm.minPrice;
                }
                if(this.searchForm.maxPrice){
                    params.maxPrice = this.searchForm.maxPrice
                }
                var _this = this;
                this.$axios.get('http://192.168.3.108:8082/api/listData',{
                    params : params
                }).then(data =>{
                    data = data.data;
                    if (data.code === 200){
                        _this.page.total = data.total;
                        _this.carList = data.data;
                    }
                }).catch(err =>{
                    console.info(err);
                });
            },
            //更改每页条数触发
            changeSize : function (pageSize){
                this.page.current = 1;
                this.page.size = pageSize;
                this.search();
            },
            /*当前页更改时触发*/
            changeCurrent : function (page){
                this.page.current = page;
                this.search();
            }
        }
    }
</script>
