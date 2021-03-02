<template>
  <el-select
    class="ui-select"
    v-model="value"
    placeholder="规模"
    @change="(val) => $emit('input', val)"
    clearable
  >
    <el-option
      v-for="item in optionData"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    placeholder: "",
    optionData: [],
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
