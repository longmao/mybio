<template>
  <div>
    <div class="banner ">
        <img src="/asset/img/banner_faq.png">
        <div class="mask"></div>
        <div class="container">
            <div class="row text vertical_center">
                <h1 class="word_upper f3">frequently <br> <span class=" color1">asked questions</span></h1>
            </div>
        </div>
    </div>
    <div id="accordion" class="container faq" role="tablist">
      <h3>FAQ</h3>
      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h6 class="mb-0">
            <a data-toggle="collapse" href="#collapseOne07" @click="clickCard" aria-expanded="true" aria-controls="collapseOne07">
              <span class="label">Q: </span><span class="text">Is it free to participate in online pitch? </span>
            </a>
          </h6>
        </div>

        <div id="collapseOne07" class="collapse " role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
           <span class="label">A: </span>
           <span class="text">
              Yes. A list of investors, their affiliations and contacts will be sent to he presenters  on the Monday prior to their online pitch. However, we found   that most investors register within 24 hrs prior to the pitch, you will see a partial list of participants prior to pitch date. A complete list of  participating investors will be share with the presenters after online pitch is concluded.
           </span>

          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h6 class="mb-0">
            <a data-toggle="collapse" href="#collapseOne08" @click="clickCard" aria-expanded="true" aria-controls="collapseOne08">
              <span class="label">Q: </span><span class="text">What time does online pitch take place? </span>
            </a>
          </h6>
        </div>

        <div id="collapseOne08" class="collapse " role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
           <span class="label">A: </span>
           <span class="text">
              Every Wednesday 9:00-11:00am Beijing Time (Tuesday 21:00-23:00 EDT/20:00-22:00 EST)
           </span>

          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h6 class="mb-0">
            <a data-toggle="collapse" href="#collapseOne09" @click="clickCard" aria-expanded="true" aria-controls="collapseOne09">
              <span class="label">Q: </span><span class="text">How long is the presentation?</span>
            </a>
          </h6>
        </div>

        <div id="collapseOne09" class="collapse " role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
           <span class="label">A: </span>
           <span class="text">
              Please prepare 7-8 min content. With interpretation, the entire presentation should take about 15min. 
           </span>

          </div>
        </div>
      </div>


      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h6 class="mb-0">
            <a data-toggle="collapse" href="#collapseOne10" @click="clickCard" aria-expanded="true" aria-controls="collapseOne10">
              <span class="label">Q: </span><span class="text">Will I know who are the investors before the pitch? </span>
            </a>
          </h6>
        </div>

        <div id="collapseOne10" class="collapse " role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
           <span class="label">A: </span>
           <span class="text">
              Yes. A list of investors, their affiliations and contacts will be sent to he presenters  on the Monday prior to their online pitch. However, we found that most investors register within 24 hrs prior to the pitch, you will see a partial list of participants prior to pitch date. A complete list of participating investors will be share with the presenters after online pitch is concluded.
           </span>

          </div>
        </div>
      </div>




      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h6 class="mb-0">
            <a data-toggle="collapse" href="#collapseOne11" @click="clickCard" aria-expanded="true" aria-controls="collapseOne11">
              <span class="label">Q: </span><span class="text">Who are the investors attending online pitch? </span>
            </a>
          </h6>
        </div>

        <div id="collapseOne11" class="collapse " role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
           <span class="label">A: </span>
           <span class="text">
              Most of the audience are from VC, investment groups, healthcare groups (including pharma companies, medical device companies and medical technology companies). We’ve also seen incubators/accelerators, government agencies and service companies. Here is a partial list (Link to logos of investors) of investors who attended our previous sessions.

           </span>

          </div>
        </div>
      </div>
      


      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h6 class="mb-0">
            <a data-toggle="collapse" href="#collapseOne12" @click="clickCard" aria-expanded="true" aria-controls="collapseOne12">
              <span class="label">Q: </span><span class="text">Should I stay after I finish my presentation and Q&A? </span>
            </a>
          </h6>
        </div>

        <div id="collapseOne12" class="collapse " role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
           <span class="label">A: </span>
           <span class="text">
              You are free to stay if you want to watch other presentation or chat with investors within the online pitch software. However, you don’t have to stay.
           </span>

          </div>
        </div>
      </div>
      
    </div>
  </div>

</template>

<style>

.card {
      position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border:none;
    border-bottom: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}
.card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background: none;
    border-bottom: none;
    /* background-color: rgba(0,0,0,.03); */
    /* border-bottom: 1px solid rgba(0,0,0,.125); */
}
.card a {
  text-decoration: none;
  display: block;
  font-weight: normal;
}

.card:last-child {
  border-bottom: none;
}


.card a,
.card {
  color: #444
}

.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.25rem 1.25rem 1.25rem;
}


.faq {
  padding: 0 0 100px 0;
}


.faq h3 {
  margin: 30px 0
}


.card.hover {
  background: #f5f8f9
}


.faq .label {
  display: inline-block;
  float: left;
}

.faq .text {
    margin-left: 30px;
    display: block;
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
    clickCard($event) {
      let $this = $($event.target)
      let $card = $this.closest(".card")
      if(!$this.hasClass(".collapsed")) {
        $(".card").removeClass("hover");
        $card.addClass("hover");

      }
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
 