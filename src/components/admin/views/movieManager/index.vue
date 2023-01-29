<template>

  电影管理
  <el-button @click="handleAddMovies" type="primary">添加资源</el-button>
  <el-button @click="deleteMovies=!deleteMovies" type="danger" >删除资源</el-button>


  <el-input
      v-model="input"
      placeholder="Please input"
      class="input-with-select"
      style="width: 280px"
  >
    <template #prepend>
      <el-select v-model="select" placeholder="全部" style="width: 100px">
        <el-option label="全部" value="0"/>
        <el-option label="电影" value="1"/>
        <el-option label="电视剧" value="2"/>
        <el-option label="动漫" value="3"/>
        <el-option label="综艺" value="4"/>
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search"/>
    </template>
  </el-input>

  <el-table  @selection-change="handleSelectionChange" :data="modDate.data[modDate.idx-1]" stripe style="width: 100%;">
    <el-table-column :show-overflow-tooltip="true" type="selection" width="55" />
    <el-table-column :show-overflow-tooltip="true" prop="_id" label="id" width="250"/>
    <el-table-column :show-overflow-tooltip="true" prop="movieName" label="Date" width="180"/>
    <el-table-column :show-overflow-tooltip="true" prop="movieImg" label="movieImg" width="180"/>
    <el-table-column :show-overflow-tooltip="true" prop="movieDownload" label="movieDownload"/>
    <el-table-column :show-overflow-tooltip="true" prop="movieMainPage" label="movieMainPage"/>
    <el-table-column :show-overflow-tooltip="true" prop="uploadUserId" label="uploadUserId"/>
    <el-table-column   prop="movieType" label="movieType" width="120"/>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleUserInfo(scope,scope.row)">Edit</el-button>
        <el-button link type="primary" size="small" @click="handleUserInfo">Detail</el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-pagination   layout="prev, pager, next" :hide-on-single-page="true" :page-size="modDate.pageSize" v-model:current-page="modDate.idx" :total="modDate.raw.length" />


  <el-dialog v-model="dialogFormVisible" title="编辑">
    <el-form :model="form">
      <el-form-item label="username" :label-width="140">
        <el-input v-model="form.username" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="email" :label-width="140">
        <el-input v-model="form.username" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 删除得操作框 -->
  <el-dialog v-model="deleteMovies">
    删除所选
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="  deleteMovies= false">取消</el-button>
        <el-button type="primary" @click="handleRemoveMovies">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="资源名称" prop="movieName">
        <el-input v-model="ruleForm.movieName"  autocomplete="off"/>
      </el-form-item>
      <el-form-item label="资源链接" prop="movieDownload">
        <el-input v-model="ruleForm.movieDownload" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="资源图片" prop="movieImg">
        <el-input v-model.number="ruleForm.movieImg"/>
      </el-form-item>
      <el-form-item label="显示在主页" prop="movieMainPage">
          <el-switch v-model="ruleForm.movieMainPage" />
      </el-form-item>
      <el-form-item label="Activity zone" prop="region">
        <el-select v-model="ruleForm.movieType" placeholder="资源类型">
          <el-option label="电影" :value="EMovieType.film" />
          <el-option label="动漫" :value="EMovieType.animation" />
          <el-option label="电视剧" :value="EMovieType.tv" />
          <el-option label="综艺" :value="EMovieType.varietyShow" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>


</template>

<script setup lang="ts">
import {addMovie, allMovies, delMovie} from "@/api";
import {onMounted, reactive, ref, watch} from "vue";
import {FormInstance} from "element-plus";
import {Search} from "@element-plus/icons-vue";
import {oneToTwo} from "@/utils/array";
import {EMovieType, IMovie, ITableData} from "@/components/admin/modules/movie";

const modDate= ref<ITableData>({
  data:[],
  idx:1,
  pageSize:10,
  raw:[]
})
// 修改信息的弹窗
const dialogFormVisible = ref(false);
// 抽屉是否可见
const drawer = ref(false);
const form = reactive({
  username: '',
  email: '',
  userAdmin: false,
  userPower: false,
  userStop: false
});
const select = ref('');
const input = ref('');
//表格数据选择
const multipleSelection=ref<IMovie[]>([]);
const deleteMovies=ref(false)


onMounted( ()=>{
  allMovies().then((res:IMovie[])=>{
    modDate.value.raw=res
    modDate.value.data=oneToTwo(modDate.value.raw,modDate.value.pageSize);
  })

})



const handleSelectionChange = (val: IMovie[]) => {
  multipleSelection.value = val
}
// 修改信息
const handleUserInfo = function (scope:any,row:any) {
  ruleForm= reactive({...row})
  drawer.value = true


}

// const mod
const handleAddMovies = () => {
  drawer.value = true;
}

const handleRemoveMovies = () => {
  multipleSelection.value.forEach((e)=>{
    delMovie(e._id as string).then(async ()=>{
        modDate.value.raw=await allMovies()
        deleteMovies.value=false
    })
  })
   deleteMovies.value=false
}



const movie = ref<IMovie>();
// 表单得dom
const ruleFormRef = ref<FormInstance>()
// 验证参数得规则
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the content'))
  } else {
    if (ruleForm.movieName !== '' && ruleForm.movieDownload!=='') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}


let ruleForm = reactive({
  movieName: '',
  movieImg: '',
  movieDownload: '',
  movieMainPage: false,
  movieType:EMovieType.film
})

const rules = reactive({
  movieName: [{validator: validatePass, trigger: 'blur'}],
  movieDownload: [{validator: validatePass, trigger: 'blur'}],
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      addMovie(ruleForm).then( async ()=>{
        modDate.value.raw=await allMovies()
        deleteMovies.value=false
      })
    } else {
      console.log('error submit!')
      return false
    }
    drawer.value = false;
    resetForm(ruleFormRef.value)

  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>

<style lang="less" scoped>

</style>