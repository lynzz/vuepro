<template>
  <div>
    <el-select
      style="width: 110px"
      filterable
      v-model="provinceId"
      placeholder="请选择省"
      :clearable="clearable">
      <el-option
        :key="item.id"
        :label="item.province"
        :value="item.provinceId"
        v-for="item in provinceList">
      </el-option>
    </el-select>
    <el-select
      style="width: 110px"
      filterable
      :disabled="!cityList.length"
      v-model="cityId"
      placeholder="请选择市"
      :clearable="clearable">
      <el-option
        :key="item.id"
        :label="item.city"
        :value="item.cityId"
        v-for="item in cityList">
      </el-option>
    </el-select>
    <el-select
      style="width: 110px"
      filterable
      :disabled="!areaList.length"
      v-model="areaId"
      placeholder="请选择区"
      :clearable="clearable">
      <el-option
        :key="item.id"
        :label="item.area"
        :value="item.areaId"
        v-for="item in areaList">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { queryProvince, queryCity, queryArea } from "@/api/common";
export default {
  name: "QlSelectCity",
  model: {
    prop: "selected",
    event: "selected-change"
  },
  props: {
    clearable: Boolean,
    // 只有选择区域了，才更新选择中值
    onlyArea: Boolean,
    fetchProvince: Function,
    fetchCity: Function,
    fetchArea: Function,
    selected: [String, Number, Array]
  },
  data() {
    return {
      provinceId: "",
      cityId: "",
      areaId: "",
      defaultValue: [],
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  computed: {
    isMulti() {
      return Array.isArray(this.defaultValue) && this.defaultValue.length;
    },
    isChangeProvince() {
      if (this.isMulti) {
        return this.provinceId !== this.defaultValue[0];
      }
      return false;
    },
    isChangeCity() {
      if (this.isMulti) {
        return this.cityId !== this.defaultValue[1];
      }
      return false;
    }
  },
  watch: {
    selected(val) {
      if (Array.isArray(val) && val.length) {
        this.defaultValue = val;
        this.provinceId = val[0];
      }
    },
    cityList(val) {
      if (val && this.isMulti && val.length && !this.isChangeProvince) {
        this.$nextTick(() => {
          this.cityId = this.defaultValue[1];
        });
      }
    },
    areaList(val) {
      if (val && this.isMulti && val.length && !this.isChangeCity) {
        this.$nextTick(() => {
          this.areaId = this.defaultValue[2];
        });
      }
    },
    provinceId(val) {
      this.$emit("province-change", val);

      if (!this.onlyArea) {
        this.$emit("selected-change", val);
      }
      this.cityId = "";
      this.areaId = "";
      this.cityList = [];
      this.areaList = [];
      if (val) {
        queryCity(val).then(data => {
          this.cityList = data || [];
        });
      }
    },
    cityId(val) {
      this.$emit("city-change", val);
      this.areaId = "";
      this.areaList = [];
      if (val) {
        if (!this.onlyArea) {
          this.$emit("selected-change", val);
        }
        queryArea(val).then(data => {
          this.areaList = data || [];
        });
      } else if (!this.onlyArea) {
        this.$emit("selected-change", this.provinceId);
      }
    },
    areaId(val) {
      let selected = this.onlyArea ? val : val || this.cityId;
      this.$emit("selected-change", selected + "");
    }
  },
  mounted() {
    queryProvince().then(data => {
      this.provinceList = data;
    });
  },
  methods: {
    emitValidator(val) {
      if (this.onlyArea) {
        this.$parent.$emit("el.form.change", val);
      }
    }
  }
};
</script>
