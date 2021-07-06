import React, { Component } from 'react'
import ReactCharts from 'echarts-for-react'
import {Card,Button} from 'antd'

export default class Line extends Component {

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
            legend :{
                data : ["销量","库存"]
            },
            tooltip : {},
            xAxis: {
                type: 'category',
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: "销量",
                data: sales,
                type: 'line'
            },{
                name : '库存',
                data : stores,
                type: 'line'
            }]
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
