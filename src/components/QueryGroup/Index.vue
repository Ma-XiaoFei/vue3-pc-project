<template>
  <el-form :inline="true" :model="props.groups" class="demo-form-inline">
    <el-form-item
      v-for="item in props.groups"
      :key="item.label"
      :label="item.label"
    >
      <el-select v-model="formData[item.name]" placeholder="请选择">
        <el-option
          v-for="o in item.options"
          :key="o.value"
          :label="o.label"
          :value="o.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { onUpdated, reactive, onMounted } from 'vue';
import { QueryGroupType } from './type';

const props = defineProps<{
  modelValue: object;
  groups: QueryGroupType;
  onFinish(data?: any): void;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', data: object): void;
}>();

const formData = reactive({
  ...props.modelValue,
});

const onSubmit = () => {
  emit('update:modelValue', formData);
  props.onFinish(formData);
};
</script>
