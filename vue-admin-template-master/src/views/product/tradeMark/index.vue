<template>
  <div>
    <el-button type="primary" @click="show"> 添加</el-button>
    <el-table :data="list" style="width: 100%; margin-bottom: 20px" border>
      <el-table-column type="index" label="序号" width="width">
      </el-table-column>
      <el-table-column prop="tmName" label="属性名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="属性值列表" width="width">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="" srcset="" width="100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <el-button type="primary" size="mini" icon="el-icon-edit"
        @click="edit"
          >修改</el-button
        >
        <el-button type="success" size="mini" icon="el-icon-delete"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
      <el-form >
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth" >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar"   />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15]"
      :page-size="limit"
      :pager-count="7"
      layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total"
      align="center"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1,
      limit: 5,
      list: [],
      total: 0,
      imageUrl: '',
      dialogFormVisible:false
    };
  },
  created() {},
  mounted() {
    this.getTradeMarkList();
  },
  methods: {
    async getTradeMarkList() {
      let result = await this.$API.trademark.getTradeMarkList(
        this.page,
        this.limit
      );
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(vaule) {
      this.limit = vaule;
      tiis.getTradeMarkList();
    },
    handleCurrentChange(vaule) {
      this.page = vaule;
      this.getTradeMarkList();
    },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      show(){
        this.dialogFormVisible=true
      },
      edit(){
                this.dialogFormVisible=true

      }
    }
  
};
</script>

<style>
avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
