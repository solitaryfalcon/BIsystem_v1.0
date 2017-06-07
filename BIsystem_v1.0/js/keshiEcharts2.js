function KScharts2(){
	require.config({
		paths: {
			echarts: './build/dist' //引用资源文件夹路径，注意路径
		}
	});
	require(
		[
			'echarts',
			//'echarts/chart/pie'     //饼图  （如需饼漏斗图动态类型切换，require时还需要echarts/chart/funnel）
			//'echarts/chart/chord'   //和弦图
			//'echarts/chart/map'     //地图
			//'echarts/chart/radar'   //雷达
			//'echarts/chart/line',   // 按需加载所需图表，用到什么类型就加载什么类型，这里不需要考虑路径
			'echarts/chart/bar'     //柱形图
			//'echarts/chart/line'    //折线图
		],
		function (ec) {
			var url = KSCharts2url;
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					//console.log(dataSource);
					addData();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax 取
			function addData(){
				var myChart = ec.init(document.getElementById('KS_Echarts2'));
				var ecConfig = require('echarts/config');
				var colors = ['yellow','blue'];
				var option = {
					color: colors,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						right: '20%'
					},
					toolbox: {
						feature: {
							dataView: {show: true, readOnly: false},
							restore: {show: true},
							saveAsImage: {show: true}
						}
					},
					legend: {
						data:['急诊手术例数','择期手术例数']
					},
					xAxis: [
						{
							type: 'category',
							axisTick: {
								alignWithLabel: true
							},
							data: dataSource.x,
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '手术例数',
							min: 0,
							//max: 250,
							//position: 'left',
						},
						{
							type: 'value',
							name: '',
							min: 0,
						}
					],
					series: [
						{
							name:'急诊手术例数',
							type:'bar',
							data:dataSource.y1,
						},
						{
							name:'择期手术例数',
							type:'bar',
							yAxisIndex: 1,
							data:dataSource.y2,
						}
					]
				};
				myChart.setOption(option);
			}
		}
	);
}
addLoadEvent(KScharts2());