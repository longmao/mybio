<template>

  <div class="page_pitch_reg">
    <div class="title text-center">
        <h2>Online Pitch Registration Form</h2>
    </div>
    <div class="container mt40">
        <form class="reg_form" @submit.prevent="submitPitchReg" ref="reg_form">

            <div class="form-group row">
                <div class="col-md-6">
                    <label for="exampleFormControlSelect1">First Name</label>
                    <input type="text" placeholder="first name" name="first_name" class="form-control" required="">
                </div>
                <div class="col-md-6">
                    <label for="exampleFormControlSelect1">Last Name</label>
                    <input type="text" placeholder="last name" name="last_name" class="form-control" required="">
                </div>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Phone number</label>
                <input type="text" name="phone" placeholder="phone number" class="form-control" required="">
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Email</label>
                <input type="email" class="form-control" id="" name="email" placeholder="name@example.com" required="">
            </div>

            <div class="form-group">
                <label for="exampleFormControlTextarea1">Project Highlight (300 words limit)</label>
                <textarea class="form-control"  required="" placeholder="Project Highlight (300 words limit)" name="project_highlight" rows="2"></textarea>
            </div>

            <div class="form-group">
                <label for="exampleFormControlTextarea1">Primary Indication(s)</label>
                <select class="form-control mb10" v-model="primary_indications" name="primary_indications">
                     <option value="Blood Diseases/Immune Disorders">Blood Diseases/Immune Disorders</option>
                     <option>Cardiovascular</option>
                     <option>Cond. Orig. in the Prenatal Period</option>
                     <option>Congen. Deform. & Chrom. Defects</option>
                     <option>Digestive System</option>
                     <option>Diseases of the Ear</option>
                     <option>Diseases of the Eye</option>
                     <option>Diseases of the Nervous System</option>
                     <option>Endocrine/Nutri/Metabolic Dis.</option>
                     <option>Ext. Causes of Morbidity & Mortality</option>
                     <option>Genitourinary System</option>
                     <option>Immune Disorders</option>
                     <option>Infectious and Parasitic Diseases</option>
                     <option>Mental and Behavior Disorder</option>
                     <option>Musculoskeletal Sys. & Cnnct. Tiss.</option>
                     <option>Neoplasms/Cancer/Oncology</option>
                     <option>Pain & inflammation</option>
                     <option>Physical injury/Poisoning</option>
                     <option>Pregnancy/Childbirth & Puerperium</option>
                     <option>Respiratory</option>
                     <option>Skin and Subcutaneous Tissue</option>
                     <option value="other">Other</option>
                 </select>
                <input  type="text" v-if="primary_indications === 'other' " name="" class="form-control">
            </div>
            <div class="form-group ">
                <label for="exampleFormControlSelect1">Tags</label>
                <input-tag placeholder="Add Tag" name="" class="form-control" :tags="tags"></input-tag>
                <div class="word_upper tag_helper mt10">
                  <span @click="addTag('MEDICAL DEVICE')">medical device</span>
                  <span @click="addTag('CANCER TREATMENT')">cancer treatment</span>
                  <span @click="addTag('FDA APPROVED')">fda approved</span>
                </div>

                <input type="hidden" name="tags" :value='tags.join(",")'>
            </div>


            <div class="form-group">
                <label for="exampleFormControlTextarea1">Development Stage</label>
                 <select class="form-control" name="development_stage">
                     <option>In Development</option>
                     <option>Biotech – NDA</option>
                     <option>On the Market</option>
                     <option>Phase I</option>
                     <option>Phase II</option>
                     <option>Phase III</option>
                     <option>Pre-Clinical</option>
                     <option>Clinical</option>
                 </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Presentation Deck</label>
                <p class="tips">This Presentation Deck is for application purpose only. You can make updates on the one that you will use on your online pitch day(.ppt, .pptx or .pdf format only)</p>
                <button class="btn btn-primary w120" type="button" @click="clickFileInput('presentation_deck')">Upload</button>
                <input type="file"  required=""  @change="changeFile('presentation_deck', $event)" class="form-control-file hide"  name="presentation_deck" multiple accept=".ppt, .pptx, .pdf"></input>
                <ul>
                  <li v-for="item in presentation_deck_file" class="pl20">{{item}}</li>
                </ul>

            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Executive Summary</label>
                <p class="tips">Executive Summary should cover project introduction, technology and IP, development stage, market and competition, core team and financing information(.doc, .docx or .pdf format only)</p>
                <button class="btn btn-primary w120" type="button"  @click="clickFileInput('executive_summary')">Upload</button>
                <input type="file"  required=""  @change="changeFile('executive_summary', $event)"  class="form-control-file hide" name="executive_summary" multiple accept=".doc, .docx, .pdf"></input>
                <ul>
                  <li v-for="item in executive_summary_file" class="pl20">{{item}}</li>
                </ul>
                
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Additional information</label>
                <input type="text" name="additional" class="form-control" placeholder="(Optional)">
                <input type="hidden" name="action" value="PitchSubmit">
            </div>
            <div class="form-group">
                <button class="btn btn-primary w120">Submit</button>
            </div>
        </form>
    </div>
     
  </div>
</template>

<style>

form.reg_form {
    width: 800px;
    margin: 0 auto 100px
}

.tips {
  color: #555d5e
}


</style>
<script>
import Vue from "vue"
import InputTag from 'vue-input-tag'
export default {
  data(){
    return {
      tags:[],
      presentation_deck_file:[],
      executive_summary_file:[],
      primary_indications:"Blood Diseases/Immune Disorders"
    }
  },


  computed: {
  },
  methods: {
    addTag(tag) {
      if(this.tags.indexOf(tag) === -1 ) {
        this.tags.push(tag)
      }
    },
    clickFileInput(name) {
      $("[name='"+name+"']").click()
    },
    changeFile(name, $event){

      var files = $('input[name="'+name+'"]')[0].files;
      let names = []
      for (var i = 0; i < files.length; i++) {
        console.log(files[i].name);
        names.push(files[i].name)
      }
      this[name + "_file"] = names
      console.log($event)
    },
    submitPitchReg(){
      let $reg_form = $(this.$refs.reg_form)
      let param = $reg_form.getFormData()
      let that = this
      Vue.http.post('pitch/PitchDispatcher.php', param).then(response => {

          // get body data
          if(!response.body.data){
              this.$swal( 'Oops...',response.body.msg,"error");
              return;
          }

          let somedata = response.body;

          that.$router.push("/pitch_reg_success")

      }, response => {
          // error callback
          this.$swal( 'Oops...',response.body.msg,"error");

      })

    }
  },
  watch:{

  },
  components: {InputTag},
  created () {
    console.log("Index")

    
  }
}
</script>
 