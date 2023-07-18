<template>
  <div v-loading="loading" class="cm-table">
    <!--表格栏-->
    <el-table class="cm-table__tb" :data="data.content" v-bind="attrs" @selection-change="selectionChange">
      <!-- 表格内容 -->
      <el-table-column v-for="column in columns" :key="column.prop" v-bind="column"></el-table-column>
      <!-- 表格右侧操作拦 -->
      <el-table-column v-if="showOperation" fixed="right" :label="'操作'">
        <template #default="{ row }">
          <template v-for="(opr, i) in operations" :key="i">
            <template v-if="isShow(opr.show, row)">
              <el-button v-if="opr.type === 'edit'" type="text" :disabled="isDisabled(opr.disabled, row)" @click="handleEdit(row)"> 编辑 </el-button>
              <el-button v-else-if="opr.type === 'delete'" type="text" class="danger" :disabled="isDisabled(opr.disabled, row)" @click="handleDelete(row)">
                删除
              </el-button>
              <el-button v-else type="text" :disabled="isDisabled(opr.disabled, row)" @click="opr.onclick(row)">
                {{ opr.label }}
              </el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格底部栏 -->
    <div class="cm-table__toolbar">
      <el-button v-if="showBatchDelete" type="danger" :disabled="selections.length === 0" @click="handleBatchDelete()"> 批量删除 </el-button>
      <!--分页栏-->
      <el-pagination
        class="cm-table__pagination"
        v-if="showPagination"
        v-model:currentPage="pageRequest.pageNum"
        v-model:page-size="pageRequest.pageSize"
        :page-sizes="[10, 20, 50, 100, 200]"
        layout="total, prev, pager, next, sizes, jumper"
        :total="data.totalSize || 0"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
const attrs = useAttrs()

const props = defineProps({
  getPage: Function, //获取表格分页数据的方法
  filters: Object,
  showPagination: {
    type: Boolean,
    default: true,
  },
  //是否显示操作组件
  showOperation: {
    type: Boolean,
    default: true,
  },
  operations: {
    type: Array,
    default: () => {
      // 默认显示‘编辑’和‘删除’
      return [
        {
          type: 'edit',
        },
        {
          type: 'delete',
        },
      ]
    },
  },
  oprwidth: {
    type: Number,
    default: 185,
  },
  //是否显示操作组件
  showBatchDelete: {
    type: Boolean,
    default: true,
  },
  columns: Array,
})
const emit = defineEmits(['handleEdit', 'handleDelete'])
const loading = ref(false)
const pageRequest = reactive({
  pageNum: 1,
  pageSize: 10,
})
const data = ref({})
//分页查询
function findPage() {
  if (!props.getPage) {
    return
  }
  loading.value = true
  const req = props.getPage({ ...pageRequest, ...(props.filters || {}), sortby: props.sortby })
  if (Object(req).constructor === Promise) {
    req
      .then((res) => {
        if (res.data instanceof Array) {
          data.value = {
            content: res.data,
            totalSize: res.data.length,
          }
        } else {
          data.value = res.data
        }
        console.log(data.value.content)
      })
      .catch(() => {
        data.value = {}
      })
      .finally(() => {
        loading.value = false
      })
  }
}

function reload() {
  handlePageChange(1)
}
function handleSizeChange(pageSize) {
  pageRequest.pageSize = pageSize
  pageRequest.pageNum = 1
  findPage()
}
//换页刷新
function handlePageChange(pageNum) {
  pageRequest.pageNum = pageNum
  findPage()
}

function isShow(showFn, row) {
  if (showFn && typeof showFn === 'function') {
    return showFn(row)
  }
  return true
}
function isDisabled(disabledFn, row) {
  if (disabledFn && typeof disabledFn === 'function') {
    return disabledFn(row)
  }
  return false
}
//编辑
function handleEdit(row) {
  emit('handleEdit', row)
}
//删除
function handleDelete(row) {
  onDelete(row.id)
}
const selections = ref([])
function selectionChange(slts) {
  selections.value = slts
}
//批量删除
function handleBatchDelete() {
  let ids = selections.value.map((item) => item.id).toString()
  onDelete(ids)
}
//删除操作
function onDelete(ids) {
  ElMessageBox.confirm('确认批量删除？', {
    type: 'warning',
    draggable: true,
  })
    .then(() => {
      const callback = () => {
        ElMessage({ message: '操作成功！', type: 'success' })
        reload()
      }
      emit('handleDelete', ids, callback)
    })
    .catch(() => {})
}

reload()

defineExpose({
  refresh: findPage,
  reload,
})
</script>

<style lang="scss" scoped>
.cm-table__tb {
  border: 1px solid #eee;
  border-bottom: none;
  width: 100%;
}
.cm-table__toolbar {
  padding: 10px 5px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
.cm-table__pagination {
  float: right;
  padding-right: 0;
}
.danger {
  color: #f56c6c;
}
</style>
