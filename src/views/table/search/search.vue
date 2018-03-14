<template>
  <el-card>
    <ql-search :fetch="fetchData" :model="searchForm" @search="handleSearch">
      <template slot="simple">
        <el-form-item>
          <el-input v-model="searchForm.keywords" placeholder="请输入关键字"></el-input>
        </el-form-item>
      </template>
      <el-table :data="tableData" border>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="名字" prop="name"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="props">
            <ql-badge-status v-if="props.row.status === 1" type="primary">正常</ql-badge-status>
            <ql-badge-status v-if="props.row.status === 2">停用</ql-badge-status>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </ql-search>
  </el-card>
</template>

<script>
export default {
  name: "TableSearch",
  data() {
    return {
      tableData: [],
      searchForm: {
        keywords: ""
      }
    };
  },
  methods: {
    fetchData() {
      return new Promise(resolve => {
        resolve({
          data: [
            {
              id: "233111",
              name: "李四",
              status: 1,
              address: "福州"
            },
            {
              id: "23311122",
              name: "张三",
              status: 2,
              address: "福州"
            }
          ],
          pageNo: 1,
          totalCount: 100
        });
      });
    },
    handleSearch(data) {
      this.tableData = data;
    }
  }
};
</script>
