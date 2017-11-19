<template>
    <div>
        <div class="container navbar navbar-expand-lg navbar-light">
            
            <router-link  to="/" ><img src="/asset/img/logo.png" class="logo"></router-link>
            <div class="pull-right">
                <ul class="navbar-nav mr-auto word_upper">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" >Home</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  @mouseover="toggleServiceMenu" href="javascript:;" id="navbarDropdown" >Our services</a>
                        <div class="dropdown-menu startup-service-pop pop-up-row   text-center" ref="startup_service_pop">
                            <div >
                                <div class="mask"></div>
                                <div class="items-wrapper"> 
                                        <router-link class="nav-link item item1" @click.native="hideServiceMenu" to="/biochina_online_pitch" >
                                            <span class="product-icon">
                                            </span>
                                            <span class="product-name word_upper">biotochina <br> online pitch</span>

                                        </router-link>

                                        <router-link class="nav-link item item2" @click.native="hideServiceMenu"  to="/promotion_in_china" >
                                            <span class="product-icon">
                                            </span>
                                            <span class="product-name word_upper">promotions <br> in china</span>

                                        </router-link>

                                        <router-link class="nav-link item item3 hide"  @click.native="hideServiceMenu" to="/biochina_online_pitch" >
                                            <span class="product-icon">
                                            </span>
                                            <span class="product-name word_upper">fundarising <br> roadshow</span>

                                        </router-link>
                                        <router-link class="nav-link item item4 "  @click.native="hideServiceMenu"  to="/invest_referral_program" >
                                            <span class="product-icon">
                                            </span>
                                            <span class="product-name word_upper">investor <br> referral program</span>

                                        </router-link>




                                 </div>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="/why_us" >why mybiogate</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/faq" >faq</router-link>
                    </li>

                    <li class="nav-item ml30">
                        <router-link class="nav-link nopadding" to="/pitch_reg" ><button class="btn btn-primary capitalize">apply to pitch</button></router-link>
                    </li>
                </ul>
            </div>
        </div>

    </div>



</template>



<style>
.dropdown:hover>.dropdown-menu {
  display: block;
}
.pop-up-row{
    position: absolute;
    display: none;
    top: 160px;
    z-index: 1111;
    background: transparent;
    width: 100%;
    padding: 0;
    top: 40px;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.23);
}
.pop-up-row.hover{
    display: block ;
}
.pop-up-row .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    background: #fff;
}

.pop-up-row .items-wrapper  {
    padding: 75px 0px 30px;
}
.pop-up-row .items-wrapper .item {
    display: inline-block;
    font-size: 14px;
    position: relative;
    width: 200px;
    text-align: center;
}

.pop-up-row .items-wrapper a{
    color: #333333;
    text-decoration: none;
}
.pop-up-row .items-wrapper .item .product-icon {

    display: block;
    margin: 0 auto 12px;
}

.pop-up-row .items-wrapper .item .product-name {
    font-size: 16px;
    display: block;
    color: #021515cc;
    margin-bottom: 2rem;
}

.pop-up-row .items-wrapper .item .product-name:hover{
    color: #021515
}


.pop-up-row .items-wrapper .item .product-desc {
    font-size: 12px;
    color: #68727D;
    display: block;
    margin-top: 6px;
}

.pop-up-row .items-wrapper .item .product-icon img {
    width: 100%;
}
.pop-up-row .items-wrapper .item:after {
    position: absolute;
    right: 0;
    width: 1px;
    height: 64px;
    top: 50%;
    margin-top: -32px;
    background: #E8E8E8;
    content: "";
    display: block;
}
.pop-up-row .items-wrapper .item:last-child:after {
    width: 0;
}



.pop-up-row  .product-icon{
  height: 64px;
  width: 64px;
  margin: 0 auto;
}

.pop-up-row .item1 .product-icon{
  background: url(/asset/svg/1.svg) no-repeat;
}

.pop-up-row .item2 .product-icon {
  background: url(/asset/svg/2.svg) no-repeat;

}

.pop-up-row .item3 .product-icon {
  background: url(/asset/svg/3.svg) no-repeat;

}

.pop-up-row .item4  .product-icon{
  background: url(/asset/svg/4.svg) no-repeat;

}


.pop-up-row .item1:hover .product-icon{
  background: url(/asset/svg/1_hover.svg) no-repeat;
}

.pop-up-row .item2:hover .product-icon{
  background: url(/asset/svg/2_hover.svg);
}

.pop-up-row .item3:hover .product-icon{
  background: url(/asset/svg/3_hover.svg);
}

.pop-up-row .item4:hover .product-icon{
  background: url(/asset/svg/4_hover.svg);
}

</style>

<script>



export default {
  data(){
    return {

    }
  },


  computed: {
  },
  methods: {
    toggleServiceMenu($event){
        let offset = $($event.target).offset()
        let $serviceMenu = $(this.$refs.startup_service_pop)
        $serviceMenu
            .css("width","100vw")
            .css("height","250px")
            .css("left","-"+offset.left+"px")
    },
    hideServiceMenu(){
        let $serviceMenu = $(this.$refs.startup_service_pop)
        $serviceMenu.removeClass("hover")
    }
  },
  watch:{

  },
  components: {},
  created () {
    let that = this;
    console.log("Index")

    
  }
}
</script>