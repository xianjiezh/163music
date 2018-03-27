
<template>
  <div id="product-wrapper">
    <ul>
      <li v-for="product in products" class="product">
        <div class="product-img">
          <img :src="product.imgLink">
        </div>

        <div class="product-inner">
          <h4 class="product-name">{{product.name}}</h4>
          <div class="content-title">包装包含以下内容：</div>
          <ul class="content-wrapper">
            <li v-for="content in product.contents" class="content-item">{{content}}</li>
          </ul>
          <div class="ship-time" v-if="product.time">{{product.time}}</div>
          <div class="divide-line"></div>
          <div class="priceWords">售价：￥<span>{{product.price}}</span></div>
          <button class="buy-now">{{product.btnContent}}</button>
        </div>

      </li>
    </ul>

  </div>
</template>

<script>
  export default {
  name: 'product',
  data () {
    return {
      products: [
        {name: 'Geio (蓝色)', imgLink: 'img/img_robot_2.jpg"',
          contents: ['Geio(蓝色）主机 × 1', '图腾(纸)× 4', '说明书 × 1', '充电线 × 1' ], price: 1288,
          time: '注： Geio 将于 2018 年春季按订单顺序发货',
          btnContent: '现在预购'
        },
        {name: 'Geio (红色)', imgLink: 'img/img_robot_2.jpg"',
          contents: ['Geio(红色)主机 × 1', '图腾(纸)× 4', '说明书 × 1', '充电线 × 1', '枪 × 2', '螺丝刀，螺丝盒 × 1', '螺丝若干'],
          price: 1288, time: '注： Geio 将于 2018 年春季按订单顺序发货',
          btnContent: '现在预购'

        },
        {name: 'Ganker 标准版', imgLink: '#',
          contents: ['Ganker(复合色)主机 × 1', '电池，充电器  × 1', '剑 × 1', '备用舵机 × 2', '枪 × 2', '螺丝刀，螺丝盒 × 1', '螺丝若干'],
          price: 2580,
          btnContent: '立即购买'
        },
        {name: 'Ganker(高配版)', imgLink: '#',
          contents: ['Ganker(复合色)主机 ', '电池，充电器 × 1', '剑 × 1', '备用舵机 × 2','枪 × 2', '螺丝刀，螺丝盒 × 1', '螺丝若干'],
          price: 2680,
          btnContent: '立即购买'
        },

        {name: 'Ganker 专用电池', imgLink: '#', contents: ['电池 × 1'], price: 88, btnContent: '立即购买'},
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h4.product-name{
    margin-top: 10px;
  }
  .product-inner{
    background-color: white;
    margin-top: 25px;
    padding: 20px 30px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .product{
    margin: 15px 5px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }
  .product-name{
  }
  .content-title{
    font-weight: bold;
    color: #a6a6a6;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .content-wrapper{
    display: flex;
    width: 100%;
    flex-flow: row wrap;
  }
  .content-item{
    margin-bottom: 5px;
    color: #a6a6a6;
    font-size: 12px;
    margin-top: 5px;
    width: 50%;
  }
  .ship-time{
    font-weight: bold;
    color: #a6a6a6;
    font-size: 12px;
    margin-top: 18px;
  }
  .divide-line{
    width: 100%;
    border-bottom: 1px solid #eee;
    height: 1px;
    margin-top: 14px;
  }
  .buy-now{
    width: 100%;
    text-align: center;
    background: linear-gradient(to bottom, #7399f4, #678ff2);
    color: white;
    border-radius: 5px;
    font-size: 17px;
    padding: 10px;
    border: none;
    margin-top: 25px;
  }
  .priceWords{
    font-size: 15px;
    text-align: right;
    color: rgb(165, 165, 165);
    margin-top: 19px;
  }
  .priceWords span{
    line-height: 35px;
    font-size: 25px;
    color: #a5a5a5;
  }
</style>
