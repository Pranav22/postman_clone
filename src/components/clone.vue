<template>
    <div>
      <div class="form-group row" style="overflow-x: hidden; max-width: 100%;">
        <div class="container border border-dark shadow-lg p-3 mb-5 bg-white rounded col-md-2" style="margin-top:10px; background-color:rgb(85, 91, 97)!important">
          <label style="color:#e9ecef">History</label>
          <div v-for="data in historyArray" v-bind:key="data" style="" class="a">
            <label class="bg-white" style="border-color : black; border: 1px solid #000000;">{{data}}</label>
          </div>
        </div>

      <div class="container border border-dark shadow-lg p-3 mb-5 bg-white rounded col-md-9" style="margin-top:10px; background-color:rgb(85, 91, 97)!important">
        <div class="form-group row" style="margin-top:10px;">
          <div class="col-sm-2">
            <select name="method" v-model="method" v-bind:class="{'form-control': true}">
              <option value="get">GET</option>
              <option value="post">POST</option>
            </select>
          </div>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="url" placeholder="Enter URL here">
          </div>
          <div class="col-sm-2">
            <!-- <vue-element-loading spinner="line-scale" color="#FF6700" :active.sync="isLoading" /> -->
            <button type="submit" v-show="!isLoading" class="form-control btn btn-primary" style="background-color:#343a40 !important; border-color : #e9ecef" @click="validateJson">SEND</button>
            <button class="form-control btn btn-primary" v-show="isLoading" style="background-color:#343a40 !important; border-color : #e9ecef"><vue-element-loading spinner="line-scale" color="#FF6700" :active.sync="isLoading" /></button>
          </div>
          <div class="col-sm-2" style="margin-top:10px;">
            <label class="form-control">Header</label>
          </div>
          <div class="col-sm-4" style="margin-top:10px;">
            <label class="form-control">Content-type</label>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <select name="c_type" v-model="c_type" v-bind:class="{'form-control': true}">
              <option value="application/json">application/json</option>
              <option value="multipart/form-data">multipart/form-data</option>
            </select>
            <!-- <label class="form-control">application/json</label> -->
          </div>
          <div class="col-sm-6" style="margin-top:10px; border-radius:0rem !important">
            <label class="form-control" v-show="c_type=='application/json'">Payload</label>
            <input type="file" id="fileinput" v-show="c_type=='multipart/form-data'" style="background-color : #545b61; color : white" ref="file"  v-on:change="handleFileUpload()">
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <label class="form-control">
              <div>
                  Response
              </div>
            </label>
          </div>
          <div class="col-sm-6" style="margin-top:-8px;" v-show="c_type=='multipart/form-data'"></div>
          <div class="col-sm-6" style="margin-top:-8px;" v-show="c_type=='application/json'">
            <textarea name="jsonpayload" v-model="jsonpayload" cols="3" rows="21" class="form-control" v-show="c_type=='application/json'"></textarea>
          </div>
          <div class="col-sm-6" style="margin-top:-8px;">
            <textarea name="response" v-model="response" cols="3" rows="21" class="form-control" disabled></textarea>
          </div>
        </div>
      </div>
      </div>
      
    </div>
</template>

<script>
import axios from 'axios'
import VueElementLoading from 'vue-element-loading';
export default {
  name: 'postman_clone',
  components : {
    VueElementLoading
  },
  props: {
    msg: String
  },
  data() {
    return {
      url : '',
      method : 'post',
      jsonpayload : '',
      response : '',
      c_type : 'application/json',
      resultStatus : '',
      isLoading : false,
      historyArray : (window.localStorage.getItem('history')) ? window.localStorage.getItem('history').split('},{') : [],
      file : ''
    }
  },
  methods : {
    validateJson(){
      if(!this.url) {
        this.$alertify.error('Please enter URL')
        return false
      }  
      this.isLoading = true
      try{
        if (this.jsonpayload) {
        JSON.parse(this.jsonpayload)  
        }
        
      }
      catch(exception){
        this.isLoading = false
        this.$alertify.error('enter valid JSON')
        return false;
      }
      this.sendAPICall()
    },
    sendAPICall(){
      let inputpayload;
      if (this.c_type == 'application/json') {
        inputpayload = (this.jsonpayload) ? JSON.parse(this.jsonpayload) : {}
      } else if(this.c_type == 'multipart/form-data'){
        let formData = new FormData();
        formData.append('file', this.file);
        inputpayload = formData
      }
      this.historyLogger(this.url,this.method)
      axios({
        method : this.method,
        headers : {
          'Content-Type' : this.c_type 
        },
        url : this.url,
        data : inputpayload
      }).then((result)=>{
        this.isLoading = false
        
        this.resultStatus = result.status + " " + result.statusText
        if (this.resultStatus == '200 OK') {
          this.$alertify.success('API returned with status code 200 OK')
        }
        this.response = JSON.stringify(result.data, null, "\t")
      }).catch((exception)=>{
        this.$alertify.alert("Exception Caught ",""+exception)
        this.isLoading = false
      })
    },
    historyLogger(url,method){
      let historyObj = {
        method : method,
        url : url,
        
      }
      if(window.localStorage.getItem('history')){
        window.localStorage.setItem('history',window.localStorage.getItem('history')+','+JSON.stringify(historyObj))
        this.historyArray = window.localStorage.getItem('history').split('},{')
              
      }
      else{
        window.localStorage.setItem('history',JSON.stringify(historyObj))
        this.historyArray = window.localStorage.getItem('history').split('},{')
      }
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.form-control{
  background-color:#e9ecef 
}
.border-dark {
    border-color: #FFFFFF !important;
}
div.a{
  overflow: hidden; 
  text-overflow: ellipsis;
    cursor: pointer;

}
div.a:hover{
  overflow: visible;
  /* word-wrap: break-word; */
  white-space: initial;
  word-break: break-all;
  cursor: pointer;
}
</style>
