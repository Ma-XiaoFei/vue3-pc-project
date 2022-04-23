<script setup lang="ts">
import LayoutAside from './LayoutAside.vue';
import LayoutMain from './LayoutMain.vue';
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="220px">
				<LayoutAside />
			</el-aside>
			<el-main>
				<LayoutMain />
			</el-main>
		</el-container>
	</div>
</template>

<style lang="less" scoped>
.common-layout {
	// padding: 10px;
	// height: 100vh;
	background: #f0f0f0;
	.el-aside {
		background: #f0f0f0;
	}
	.el-main {
		margin: 10px 10px 10px 0;
		border-radius: 10px;
		background: #e8e8e8;
	}
}
</style>
