<template>
  <el-form :inline="true" :model="props.groups" class="demo-form-inline">
    <el-form-item
      v-for="item in props.groups"
      :key="item.label"
      :label="item.label"
    >
      <el-select @change="(v: string)=> onChange(v,item.name)" v-model="formData[item.name]" placeholder="请选择">
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
import { reactive, Ref, ref,watch } from 'vue';
import { QueryGroupType } from './type';
const form = ref();
const props = defineProps<{
  modelValue?: object;
  groups: QueryGroupType;
  onFinish?(data?: any): void;
  onChange?(v: string,name: string):void;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', data: object): void;
}>();

const formData = ref({
  ...props.modelValue,
});

watch(()=> formData.value, ()=> {
  emit('update:modelValue', formData.value);
},{deep: true});

const onSubmit = () => {
  emit('update:modelValue', formData.value);
  props.onFinish && props.onFinish(formData.value);
};

const onChange = (v:string,name: string)=> {
  props.onChange && props.onChange(v,name);
};
</script>
