<template>

  <div>
    <div class="banner ">
        <img src="/asset/img/04-banner.jpg">
        <div class="mask"></div>
        <div class="container">
            <div class="row text vertical_center">
                <h1 class="word_upper f3">promotions <br> <span class="font-normal">in china</span></h1>
            </div>
        </div>
    </div>
    <div class="article ">

        <div class="container ">
            <h2 class="word_upper text-center">why should i seek for interview/review report?</h2>
            <p>
                MyBioGate brings overseas innovators to China.  One of the many tools that we leverage to achieve this goal is by conducting interviews and investment reports of innovators, industry leaders, influencers, and CEOs, and present to our China audiences.  Our subscribers will have an in-depth understanding of your idea and concept, research, or project, by reading our interview or review reports.  If you are thinking about getting attention from China resources and capital, or start a conversation with leaders in the industry in China, then you should seek for our Interview/Review Report. <br>
                Mybiogate.com will feature one CEO and his story on the first page each week, and promote through multiple channels.  It is a great exposure opportunity for fundraising and brand recognition. If you want to be interviewed, please contact  <a href="#" class="color2">taratian@mybiogate.com</a>
            </p>
            <form class="project_form" @submit.prevent="applyForm" ref="apply_form">
                <div class="form-group row">
                    <div class="col-md-6">
                        <label for="exampleFormControlSelect1">Name</label>
                        <input type="text" name="name" class="form-control" placeholder="name" required="">
                    </div>
                    <div class="col-md-6">
                        <label for="exampleFormControlSelect1">Project Name</label>
                        <input type="text" name="project_name" placeholder="project name" required="" class="form-control">
                    </div>

                </div>

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Your Schedule Preference</label>
                    <textarea class="form-control"  name="schedule_preference"  required="" placeholder="your schedule preference" rows="2"></textarea>
                    <input type="hidden"  name="action" value="PitchApply">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary w120" type="submit">Apply Now</button>
                </div>

            </form>
        </div>





        <div class=" promotions">
            <div class="container">
                <div class="row">
                    <div class="col-md-7 pr40">
                        <h2 class="word_upper">how will we promote you?</h2>
                        <p>
                            offers a comprehensive background in quickly and effectively navigating the license certification process by leveraging the experience and knowledge wide partner network: including companies Yeahmobi has invested in such as publisher/distributor TFjoy, ugMARS, and PocketRivercomprehensive background in quickly and effectively navigating the license certification process by leveraging the experience and knowledge it’s wide partner network: including companies Yeahmobi has invested in such as publisher/distributor TFjoy, ugMARS, and PocketRiver.
                        </p>
                    </div>

                    <div class="col-md-5">
                        <img src="/asset/img/5.png">
                    </div>
                </div>
                <div class="row mt40">

                    <div class="col-md-5">
                        <img src="/asset/img/4.png">
                    </div>

                    <div class="col-md-7 pl40">
                        <h2 class="word_upper">how will we promote you?</h2>
                        <p>
                            offers a comprehensive background in quickly and effectively navigating the license certification process by leveraging the experience and knowledge wide partner network: including companies Yeahmobi has invested in such as publisher/distributor TFjoy, ugMARS, and PocketRivercomprehensive background in quickly and effectively navigating the license certification process by leveraging the experience and knowledge it’s wide partner network: including companies Yeahmobi has invested in such as publisher/distributor TFjoy, ugMARS, and PocketRiver.
                        </p>
                    </div>


                </div>
            </div>

        </div>
        <div class="ceo_say">
            <div class="container">
                <h2 class="word_upper">read about other ceo's story</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="main">
                            <img src="/asset/img/6.png">
                            <div class="cont">
                                <h5>Zuckerberg:How I Buid Facebook Empire</h5>
                                <p>
                                    Read about other CEO’s story Read about other CEO’s story Read about other CEO’s story Read about other CEO’s story ...
                                </p>
                                <button class="btn btn-primary word_upper">read more</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="main">
                            <img src="/asset/img/6.png">
                            <div class="cont">
                                <h5>Zuckerberg:How I Buid Facebook Empire</h5>
                                <p>
                                    Read about other CEO’s story Read about other CEO’s story Read about other CEO’s story Read about other CEO’s story ...
                                </p>
                                <button class="btn btn-primary word_upper">read more</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="main">
                            <img src="/asset/img/6.png">
                            <div class="cont">
                                <h5>Zuckerberg:How I Buid Facebook Empire</h5>
                                <p>
                                    Read about other CEO’s story Read about other CEO’s story Read about other CEO’s story Read about other CEO’s story ...
                                </p>
                                <button class="btn btn-primary word_upper">read more</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

     
     
  </div>
</template>

<style>

form.project_form {
    margin: 30px auto;
    padding: 30px 20%;
    border-top: 1px solid #cecece;
}

.promotions {
    background: #f4f9f8;

}

.promotions .container {
    padding: 50px 0
}

.promotions h2{
    padding: 0 0 20px;
}


.ceo_say h2 {
    margin-bottom: 50px;
}

.ceo_say h5 {
    margin: 1rem 0;
    font-size: 1rem;
}

.ceo_say img {
    max-width: 100%;
}

.ceo_say .col-md-4{
    padding: 0 30px
}

.ceo_say .row {
    margin-right: -30px;
    margin-left: -30px;
}


.ceo_say .main {
    background: #f4f9f8;
    padding-bottom: 15px;
}

.ceo_say .cont {
    padding: 0 25px;
}

.ceo_say p {
    color: #333
}
</style>
<script>


import Vue from "vue"

export default {
  data(){
    return {

    }
  },


  computed: {
  },
  methods: {
    applyForm(){
      let $apply_form = $(this.$refs.apply_form)
      let param = $apply_form.getFormData()
      let that = this
      Vue.http.post('pitch/PitchDispatcher.php', param).then(response => {

          // get body data
          if(!response.body.data){
              this.$swal( 'Oops...',response.body.msg,"error");
              return;
          }

          let somedata = response.body;

          this.$swal( 'Congratulations!',"Apply Success!","success");

      }, response => {
          // error callback
          this.$swal( 'Oops...',response.body.msg,"error");

      })
    }


  },
  watch:{

  },
  components: {},
  created () {
    console.log("Index")

    
  }
}
</script>
 