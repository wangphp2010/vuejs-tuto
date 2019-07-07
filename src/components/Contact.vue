<template>
  <div class="container">
    <div class="jumbotron">
      <h1>this is contact page</h1>
    </div>
    <div class="text-left mb-4">
      <div class="row">
        <div class="col-md-8 offset-md-2">
           
          <p  class="alert alert-danger " v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors">{{ error }}</li>
                    </ul>
          </p>
             <p  class="alert alert-success " v-if="success">
                    <b>Your messages are sended. Thank you </b>
                     
                     
              </p> 
          <form @submit="handle" novalidate="true" >
              

              <div class="form-group">
              <label for="tel">Phone number </label>

              <input
                type="tel"
                class="form-control"
                id="tel"
                name="tel"
                placeholder="Phone number"
                v-model="tel"
              />
            </div>



            <div class="form-group">
              <label for="email">Email address</label>

              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                v-model="email"
              />
            </div>

            <div class="form-group">
              <label for="message">Votre message</label>
              <textarea
                v-model="message"
                class="form-control"
                id="message"
                name="message"
                rows="8"
                placeholder="Type your message"
                value
              ></textarea>
            </div>
            <button class="btn btn-primary" type="submit">send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
document.title = "Design by PHP STUDIO - contact page  ";
export default {
  name: "Contact",

  data() {
    return {
      email: "",
      message: "",
      tel:"",
      errors:[] ,
      success:false ,
    };
  },
  watch: {
   email(){
         
        if(this.errors.length )this.validate();
           },
    message(){
         
        if(this.errors.length ) this.validate(); 
           },   
    tel(){
        this.handleTel(this.tel)
        if(this.errors.length ) this.validate(); 
    },      
  },
  methods: {
      initVar()
      {
         this.email=  "",
         this.message= "",
         this.errors = [] 
      },
    validate() {
      
        let errors = []  
         
        if (this.tel === '') errors.push ('Empty phone number') ;
        else
        {
            if(  !/^0/.test(  this.tel)    ) errors.push ( 'The first number of the phone number must be 0' );
            if(  !/^\d{10}$/.test( this.trimTel(this.tel)) ) errors.push ( 'Phone number must contain 10 numbers' );
            if(!this.validTel(this.tel))errors.push ( 'Invalide phone number ' );
        }




        if (this.email === '') errors.push ('Empty email') ;
        else
        {
            if(!this.validEmail(this.email))errors.push ( 'Invalide email' );
        }
         
        if (this.message === '') errors.push ( 'Empty message ') ;
        this.errors = errors ;
        if ( errors.length   ){
             return false;
        }
        
        return true;


    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validTel: function (tel) {
      var re = /^0\d{9}$/;
      return re.test( this.trimTel(tel) );
    },
    trimTel: function (tel){ return tel.replace(' ','' ).replace(/\s/g,'' ) },
    handleTel: function (tel)
    {
        let v = tel ;
         v=v.replace(/\s*/g,'');
        v=v.replace(/\D/g,'');

        v=v.replace(/(\d{2})(?=\d)/g,"$1 ");
        
        this.tel = v;
    },
                          


    handle(e) {
      e.preventDefault();
      
      if(this.validate())
       {
           console.log('Succes');
           this.success= true ;
       }
    }




  },
  mounted() {}
};
</script>
