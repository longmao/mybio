<template>

  <div>
    <div class="banner ">
        <img src="/asset/img/01-banner.jpg">
        <div class="container ">
          <div class="text ">
            <div class="word_upper t1 mt40">
              who we are
            </div>
            <div class="t2">
              Grow your healthcare innovation <br>
              with China power
              <div class="word_upper t3">
                
                <router-link class="" to="/pitch_reg" >online pitch -></router-link>
              </div>
            </div>

          </div>

        </div>
    </div>
     
     <div class="container why_biotochina">
      <div class="row">
        <div class="col-md-6">
         <h2 class="word_upper">why <i>MyBioGate</i></h2>
         <p>
           Opportunity is huge for international companies now. BiotoChina is an integrated platform for healthcare companies worldwide seek opportunity in China. Opportunity is huge for international companies now. BiotoChina is an integrated platform for healthcare companies worldwide seek . <br>
           <router-link to="/why_us" class="word_upper" >read more></router-link>
         </p>
        </div>
        <div class="col-md-6">
          <img src="/asset/img/3.png">
        </div>
        
      </div>
      <div class="our_service">
        <h3 class="word_upper">
          <span class="blue pr10"><strong>|</strong></span>our service 
        </h3>

        <div class="row text-center word_upper mt40">
             <div class="col-md-3 item1">
                <router-link to="/biochina_online_pitch" class="word_upper" >
                  <div class="img"></div>
                  <div class="mt20"><strong>biotochina <br> online pitch</strong></div>
               </router-link>

             </div>

             <div class="col-md-3 item2">


                <router-link to="/promotion_in_china" class="word_upper" >
                  <div class="img"></div>
                  <div class="mt20"><strong>promotions <br> in china</strong></div>
               </router-link>

             </div>

             <div class="col-md-3 item3 hide">
               <div class="img"></div>
               <div class="mt20"><strong>fundarising <br> roadshow</strong></div>
             </div>

             <div class="col-md-3 item4">
                <router-link to="/invest_referral_program" class="word_upper" >
                  <div class="img"></div>
                  <div class="mt20"><strong>investor <br> referral program</strong></div>
               </router-link>
             </div>


          </div>

      </div>
     </div>
     <div class="why_china">
      <div class="  container ">
        <div class="row">
          <h2 class="word_upper col-md-3"> why <br><i>china</i> </h2>
          <p class="col-md-9">
            Opportunity is huge for international companies now. BiotoChina is an integrated platform for healthcare companies worldwide seek opportunity in China. Opportunity is huge for international companies now. BiotoChina is an integrated platform for healthcare companies worldwide seek . <br>
            <a href="#" class="word_upper">read more ></a>
          </p>
        </div>

      </div>
     </div>


  </div>
</template>

<style scoped>
.t1 {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    background: #a7c909;
    font-size: 18px;
    color: #eee;
    font-weight: bold;
    font-style: italic;
}
.t2 {
    background: #29c3e0;
    width: 50%;
    padding: 50px;
    font-size: 30px;
    font-style: italic;
    position: relative;
}

.t3 {
    font-size: 18px;
    font-weight: bold;
    background: #000;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    position: absolute;
    bottom: 0;
    right: -20px;
    font-style: normal;
}
.t3 a {
  color: #eee
}
.why_biotochina {
  padding: 100px 0
}

.why_biotochina h2 {
  padding: 0 0 2rem 0;
}
.why_biotochina p,
.why_china p{
    line-height: 1.8;
    color: #666;
    word-break: break-all;
}

.why_biotochina p a {
  color: #2ac2e1;
  text-decoration: none;
}

.why_biotochina p a:hover,
.why_china p a:hover {
  color: #1dacca;
}
.why_biotochina h3 {
  line-height: 1.5rem;
  font-weight: normal;
}


.why_china {
    padding: 70px 0 100px 0;
    background: #f4f9f8;
}

.why_china  i {
  font-size: 3rem;
}
.why_china p a {
    margin-top: 1rem;
    color: #2ac2e1;
    text-decoration: none;
}

.our_service  a{
  color: #212529
}
.our_service .col-md-3:hover{
  color: #2ac2e1;
  cursor: pointer;
}

.our_service .col-md-3:hover a{
  color: #1dacca;
}

.our_service  .img{
  height: 64px;
  width: 64px;
  margin: 0 auto;
}

.our_service .item1 .img{
  background: url(/asset/svg/1.svg) no-repeat;
}

.our_service .item2 .img {
  background: url(/asset/svg/2.svg) no-repeat;

}

.our_service .item3 .img {
  background: url(/asset/svg/3.svg) no-repeat;

}

.our_service .item4  .img{
  background: url(/asset/svg/4.svg) no-repeat;

}


.our_service .item1:hover .img{
  background: url(/asset/svg/1_hover.svg) no-repeat;
}

.our_service .item2:hover .img{
  background: url(/asset/svg/2_hover.svg);
}

.our_service .item3:hover .img{
  background: url(/asset/svg/3_hover.svg);
}

.our_service .item4:hover .img{
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
  },
  watch:{

  },
  components: {},
  created () {
    console.log("Index")

    
  }
}
</script>
 