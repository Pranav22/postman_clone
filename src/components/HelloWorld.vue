<template>
    <div>
      

      <div class="container border border-dark shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:10px; background-color:rgb(85, 91, 97)!important">
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
            <button type="submit" class="form-control btn btn-primary" style="background-color:var(--accent-color)" @click="validateJson">SEND</button>
          </div>
          <div class="col-sm-2" style="margin-top:10px;">
            <label class="form-control">Header</label>
          </div>
          <div class="col-sm-5" style="margin-top:10px;">
            <label class="form-control">Content-type</label>
          </div>
          <div class="col-sm-5" style="margin-top:10px;">
            <!-- <label class="form-control">Application/JSON</label> -->
            <select name="c_type" v-model="c_type" v-bind:class="{'form-control': true}">
              <option value="application/json">application/json</option>
              <option value="multipart/form-data">multipart/form-data</option>
            </select>
          </div>
          <div class="col-sm-12" style="margin-top:10px;" v-show="c_type=='multipart/form-data'">
            <input type="file" id="fileinput">
          </div>
          <div class="col-sm-6" style="margin-top:10px; border-radius:0rem !important">
            <label class="form-control">Payload</label>
          </div>
          <div class="col-sm-6" style="margin-top:10px;">
            <label class="form-control">Response</label>
          </div>
          <div class="col-sm-6" style="margin-top:-8px;">
            <textarea name="jsonpayload" v-model="jsonpayload" cols="3" rows="21" class="form-control" ></textarea>
          </div>
          <div class="col-sm-6" style="margin-top:-8px;">
            <textarea name="response" v-model="response" cols="3" rows="21" class="form-control" disabled></textarea>
          </div>
        </div>
        
          

      </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      url : '',
      method : 'post',
      jsonpayload : '',
      response : '',
      c_type : 'application/json'
    }
  },
  methods : {
    validateJson(){
      try{
        if (this.jsonpayload) {
        JSON.parse(this.jsonpayload)  
        }
        
      }
      catch(exception){
        alert('enter valid JSON')
        return false;
      }
      axios({
        method : this.method,
        url : this.url,
        data : (this.jsonpayload) ? JSON.parse(this.jsonpayload) : {}
      }).then((result)=>{
        console.log(result.data);
        
        this.response = JSON.stringify(result.data, null, "\t")
      })
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
</style>
