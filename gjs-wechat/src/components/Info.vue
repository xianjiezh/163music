
<template>

  <div class="user-info">
    <form action="" @submit.prevent="confirmPurchase">

      <h3>请填写您的信息</h3>
      <div class="row">
        <input type="text" placeholder="收货人姓名" required v-model="userName" :class="{err:userNameIllegal}">
      </div>
      <div class="row">
        <input type="text" placeholder="手机号" required v-model="userPhone" :class="{err: userPhoneIllegal}">
      </div>
      <div class="row">
        <input type="text" placeholder="电子邮箱（可选）" v-model="userEmail" :class="{err: userEmailIllegal}">
      </div>
      <h5 class="address">收货地址</h5>
      <v-distpicker @selected="onSelected" :province="choices.province" :city="choices.city" :area="choices.area" v-model="districts"></v-distpicker>
      <input type="text" placeholder="街道编号/名称，楼宇名称" v-model="detailAddress">
      <div class="howDoYouKonwThis">你从哪里知道这个产品（必填）</div>
      <ul>
        <li v-for="(way) in ways">
          <label>
            <input type="radio" :name="'radio'" :value="way"><span>{{way}}</span>
          </label>
        </li>
      </ul>
      <div class="agreeChoice">
        <label><input type="checkbox" name="iAgree">我已同意</label>
        <a href="#">《工匠社机器人预购服务条款》</a>
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
        isSelected: false
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
        if(!this.userName || (this.userName === 1)){
          this.userNameIllegal = true
        }else if (!this.userPhone || this.userPhone.length < 10){
          this.userPhoneIllegal = true
        }else if (!this.userEmail || (this.userEmail.indexOf('@') === -1 || this.userEmail.length < 6)){
          this.userEmailIllegal = true
        }


      }

    },
    updated(){

    }
  }

</script>

<style scoped>
  .user-info{
    background-color: white;
    padding: 25px 15px;
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
  .err {
    border: 1px solid #E42C3E;
  }
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
