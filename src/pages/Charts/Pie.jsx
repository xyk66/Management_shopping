import React, { Component } from 'react'
import ReactCharts from 'echarts-for-react'
import {Card,Button} from 'antd'

export default class Pie extends Component {

    state = {
        sales : [5,1,3,8,5,9],//销量的数组
        stores : [10,10,10,10,10,10] //库存的数组
    }


    //更新
    Update = ()=>{
        this.setState(state => {
            this.setState({sales: state.sales.map(i => i+=1),stores: state.stores.reduce( 
                (pre,store) => {
                pre.push(store-1);
                    return pre;
            } ,[])});
        });
    }

    //获取信息
    getOptions = (sales,stores)=>{
        return {
            backgroundColor: '#2c343c',

            title: {
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
        
            tooltip: {
                trigger: 'item'
            },
        
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 274, name: '联盟广告'},
                        {value: 235, name: '视频广告'},
                        {value: 400, name: '搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
        
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
    }

    render() {

        const {sales,stores} = this.state;
        return (
            <>
            <Card>
                <Button type="primary" onClick={this.Update}>更新</Button>
            </Card>
            <Card>
                <ReactCharts option={this.getOptions(sales,stores)}/>
            </Card>
            </>
        )
    }
}
