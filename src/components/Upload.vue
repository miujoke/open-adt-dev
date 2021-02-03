<template>

  <el-upload
      class="upload-demo"
      action=""
      :http-request="uploadImg"
      :on-change="handleChange"
      :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
import OSS from 'ali-oss'
export default {
  data() {
    return {
      imageUrl: '',
      fileList:[{}]
    };
  },
  methods: {
    uploadImg(options){
      console.log(options)
      const client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAImMFbWWBPb0qj',
        accessKeySecret: 'CQlAiBzcIHBxUcbPzhq8Kp00maBpDQ',
        bucket: 'localupfile'
      });
      // 名称前面加一个时间戳
      let filename =  Date.now() + options.file.name;
      // console.log(filename)
      try {
        // 上传
        client.put(filename, options.file);

        // 返回到模块里面
        this.$emit('success',filename)

      } catch (e) {
        this.$message.error('上传失败')
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
  }
}
</script>

<style scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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
