// 商品存货周转天数
var formatUtil = echarts.format;
var turnaround = echarts.init(document.getElementById('turnaround'));
$.get("data/各类商品存货周转天数.json").done(function (data) {
    //data = JSON.parse(data),
    turnaround.setOption({
        tooltip:{
        formatter: '{b}：{c}'
    },
    series: [{
        type: 'treemap',
        label:{
            show:true,
            position:'insideTopLeft',
            distance:0,
            padding:10,
            formatter:"{b}\n{a|{c}}",
            rich: {
                a: {
                    padding:6,
                    align:'right',
                    verticalAlign:'bottom',
                    color:'#fff',
                }
            }
        },
        roam:false,
        nodeClick:false,
        breadcrumb:{show:false},
        itemStyle:{
            gapWidth:5,
            borderColor:'transparent'
        },
        data: data.data
    }]
        })
});



// 存销量
var stockSales = echarts.init(document.getElementById('stockSales'));
$.get("data/商品库存数量和销售数量.json").done(function (data) {
    //data = JSON.parse(data),
	stockSales.setOption({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		left: '0%',
		top:'60',
		right:'5%',
		bottom: '10',
		containLabel: true
	},
	barWidth:'45%',
	legend: {
		data:data.数量类型,
		top:'22'
	},
	xAxis: {
		type: 'value',
		min: 0,
		boundaryGap: [0, 0.01],
		axisLine:{lineStyle:{width:0}},
	},
	yAxis: {
		type: 'category',
		splitLine:{lineStyle:{width:0}},
		data: data.商品名称
	},
	series: [
		{
			name: '销售数量',
			type: 'bar',
			stack: '数量',
			label:{
				position:'insideRight',
				padding:[0,5,0,0],
			},
			data: data.销售数量
		},
		{
			name: '库存数量',
			type: 'bar',
			stack: '数量',
			label:{
				position:'insideRight',
				padding:[0,5,0,0],
			},
			data: data.库存数量
		}
	]
		})
});



// 滞销商品
var unsalable = echarts.init(document.getElementById('unsalable'));
$.get("data/商品滞销数据.json").done(function (data) {
	//data = JSON.parse(data),
	unsalable.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    grid: {
        left: '10',
        right: '10',
        bottom: '10',
        containLabel: true
    },
    toolbox: {
        show:false,
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:data.name
    },
    barGap:'10%',
    barCategoryGap:'25%',
    xAxis: [
        {
            type: 'category',
            data: data.商品名称,
            axisPointer:{type:'shadow'},
            splitLine:{lineStyle:{width:0}},
            axisLabel:{rotate:30}
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '',
            min: 0,
            max: 500,
            interval: 100,
            axisLabel: {
                formatter: '{value}'
            },
            axisLine:{lineStyle:{width:0}},
        },
        {
            type: 'value',
            name: '',
            min: 0,
            max: 1,
            interval: 0.2,
            axisLabel: {
                formatter: '{value} '
            },
            axisLine:{lineStyle:{width:0}},
            
        }
    ],
    series: [
        {
            name:'滞销金额',
            type:'bar',
            data:data.滞销金额
        },
        {
            name:'存货周转率',
            type:'line',
            yAxisIndex: 1,
            label:{
                show:'true',
                color:'#fff',
                backgroundColor:'rgba(235,48,48,0.8)',
                verticalAlign:'middle',
                padding:[2,4,0,4],
                borderRadius:4,
                position:'inside'
            },
            data:data.存货周转率
        },
        {
            name:'库存数量',
            type:'bar',
            data:data.库存数量
        }
    ]
		})
});



//品类库存占比
var categoryStock = echarts.init(document.getElementById('categoryStock'));
$.get("data/不同类型的商品库存数量.json").done(function (data) {
	//data = JSON.parse(data),
	categoryStock.setOption({
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        data:data.类型,
        left: 10,
        top: 20,
    },
    series: [
        {
            name:'品类',
            type:'pie',
            radius: [0, '40%'],
            center : ['55%', '53%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:data.一级商品
        },
        {
            name:'品类',
            type:'pie',
            color:['LimeGreen', 'DarkGreen', 'red', 'blue', 'Purple',
                'DarkOrchid', 'Navy', '#061e42', 'black', '#4f8fa8'],
            radius: ['40%', '66%'],
            center : ['55%', '53%'],
            selectedMode: 'multiple',
            itemStyle:{
                borderWidth:'2',
                borderColor:'none'
            },
            label: {
            },
            data:data.二级商品
        }
    ]
		})
});



// 设备容量
var mVolume = echarts.init(document.getElementById('mVolume'));
$.get("data/不同地点售货机库存数量和缺货数量.json").done(function (data) {
	//data = JSON.parse(data),
	mVolume.setOption({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:data.类型,
        type:'scroll',
    },
    barWidth:'35%',
    barCategoryGap:'40%',
    grid: {
        left: '10',
        right: '20',
        bottom: '10',
        containLabel: true
    },
    xAxis:  {
        type: 'category',
        data: data.地点
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name:'库存总量',
            type:'bar',
            stack: '总量',
            label:{
                position:'insideTop',
                padding:[5,0,0,0]
            },
            data:data.库存数量,
        },
        {
            type:'line',
            name:'预警线',
            connectNulls: 'true',
            data:[150,150,150,150,150],
        },
        {
            name:'缺货总量',
            type:'bar',
            stack: '总量',
            label:{
                position:'insideTop',
                padding:[5,0,0,0]
            },
            itemStyle:{
                color:'#ca841e'
            },
            data:data.缺货数量,
        }
    ]
		})
});



window.onresize = function() {
    turnaround.resize();
    stockSales.resize();
    unsalable.resize();
    categoryStock.resize();
    mVolume.resize();
}