<template>
	<div class="block">
		<el-carousel height="200px">
			<el-carousel-item v-for="item in 2" :key="item">
				<h3 class="small">{{ item }}</h3>
			</el-carousel-item>
		</el-carousel>
		<ul class="asideItem">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>
<style lang="less" scoped>
.block{
	padding:10px;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
	text-align: center;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
.asideItem {
	height:calc(100vh - 235px);
	padding:10px;
	margin-top:15px;
	border-radius: 10px;
	overflow: auto;
	background: #e7e8e8;

	li {
		background: #dddddd;
		height: 70px;
		margin-top: 10px;
		list-style: none;
		border-radius: 13px;
	}
	li:nth-child(1){
		cursor: pointer;
	}
}
</style>
