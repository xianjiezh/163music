
<template>

  <div class="user-info"  v-title data-title="信息填写">
    <form action="" method="post" @submit.prevent="confirmPurchase">
      <div class="userSelect">
        <div class="picWrapper"><img :src="product.imgLink" alt="商品"></div>
        <div class="selectText">
          <p>已选择：</p>
          <p>{{product.name}}</p>
        </div>
        <div class="num">
          <select name="num">
            <option value="num1" selected>数量：1</option>
            <option value="num2">数量：2</option>
          </select>
        </div>
      </div>
      <h3>请填写您的信息</h3>
      <div class="row">
        <input type="text" name="userName" placeholder="收货人姓名" required v-model="userName" :class="{error:userNameIllegal}">
      </div>
      <div class="row">
        <input type="text" placeholder="手机号" name="userPhone" required v-model="userPhone" :class="{error: userPhoneIllegal}">
      </div>
      <div class="row">
        <input type="text" placeholder="电子邮箱（可选）" name="userEmail" v-model="userEmail">
      </div>
      <h5 class="address">收货地址</h5>
      <v-distpicker @selected="onSelected" :province="choices.province" :city="choices.city" :area="choices.area" v-model="districts"></v-distpicker>
      <input type="text" placeholder="街道编号/名称，楼宇名称" v-model="detailAddress" required :class="{error: userPhoneIllegal}">
      <div class="howDoYouKnowThis">你从哪里知道这个产品（必填）</div>
      <ul class="ways">
        <li v-for="way in ways">
          <label>
            <input type="radio" :name="'radio'" :value="way"><span>{{way}}</span>
          </label>
        </li>
      </ul>
      <div class="agreeChoice">
        <label><input type="radio" name="UserAgree">我已同意</label>
        <router-link :to="{path: '/provision'}">《工匠社机器人预购服务条款》</router-link>
      </div>
      <div class="confirm">
        <input type="submit" :value="buttonContent">
      </div>
    </form>
  </div>

</template>

<script>
  import VDistpicker from './picker/Distpicker'
  export default {
    name: 'info',
    components: { VDistpicker },
    data() {
      return {
        ways: ['A.朋友介绍', 'B.线下大型活动', 'C.线下商场', 'D.媒体报道', 'E.微信公众账号', 'F.微博','G.其他'],
        buttonContent: '确认购买',
        userName: '',
        userNameIllegal: false,
        userPhone: '',
        userPhoneIllegal: false,
        userEmail: '',
        userEmailIllegal: false,
        detailAddress: '',
        districts: '',
        choices:{
          'province': '省份',
          'city': '城市',
          'area': '区县'
        },
        isSelected: false,
        product: null
      }
    },
    methods: {
      onSelected: function (data) {
        this.isSelected = true
        this.choices.province = data.province.value
        this.choices.city = data.city.value
        this.choices.area = data.area.value
      },
      confirmPurchase: function () {
        if (this.isSelected) {
          console.log(111)
          if(!this.userName || (this.userName.length <= 1)){
            this.userNameIllegal = true
            console.log('userPhoneIllegal', this.userNameIllegal)
          }
          if (!this.userPhone || this.userPhone.length < 10){
            this.userPhoneIllegal = true
            console.log('userPhoneIllegal', this.userPhoneIllegal)
          }
        } else {

        }
      }

    },
    created(){
      this.product = JSON.parse(decodeURIComponent(JSON.stringify(this.$route.query)))
    },
    updated(){
    }
  }

</script>

<style scoped>
  select {
    padding: .5rem .75rem;
    height: 40px;
    font-size: 16px;
    line-height: 1.25;
    outline: none;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  }
  .ways {
    display: flex;
    flex-wrap: wrap;
  }
  .ways li {
    margin-top: 10px;
    flex-grow: 1;
  }
  h3{
    margin-top: 25px;
    margin-bottom: 2px;
  }
  h5{
    margin-bottom: 11px;
    color: #444;
  }

  .confirm{
    display: flex;
    align-items: center;
  }
  select:focus{
    border-color: #9d9d9d;
  }
  .user-info{
    background-color: white;
    padding: 25px 8px 25px 14px;
  }
  .address{
    margin-top: 15px;
  }
  input[type="text"] {
    margin-top: 15px;
    width: 100%;
    font-size: 16px;
    padding: 7px 5px;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    text-indent: 7px;
  }
  input[type="text"]:focus{
    border-color: #9d9d9d;
    transition: all .2s;
  }
  v-distpicker{
    margin-top: 15px;
  }
  .userSelect{
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding-right: 20px;
    align-items: center;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .userSelect p,
  .howDoYouKnowThis,
  .ways{
    color:#555;
    font-size: 15px;
    line-height: 15px;
    margin: 12px 0;
  }
  .picWrapper{
    height: 100%;
  }
  .picWrapper img{
    height: 100%;
  }
  input.error{
    border: 1px solid #E42C3E;
  }
  /*.err {*/
    /*border: 1px solid #E42C3E;*/
  /*}*/
  .confirm input{
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
  .agreeChoice{
    font-size: 13px;
  }
</style>
