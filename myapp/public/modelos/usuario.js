class Usuario{

    constructor(name, gender, birth, email, password,admin, photo, country){
        this._id; 
        this._name = name
        this._gender = gender
        this._birth = birth
        this._email = email
        this._password = password
        this._admin = admin
        this._photo = photo
        this._country = country
        this._dataRegistro = new Date()
    }

 get id(){

   return this._id;
 }   

 get name(){
    return this._name
}
 get gender(){
    return this._gender
 }
 get birth(){
    return this._birth
 }
 get email(){
    return this._email
 }
 get password(){
    return this._password
 }
 get admin(){
    return this._admin
 }
 get photo(){
    return this._photo
 }
 get country(){
    return this._country
 }
 get dataRegistro(){
    return this._dataRegistro
 }
    

   set photo (value){
    this._photo = value
   }


   set id (value){
      this._id = value
     }

   loadFormJSON(json){

   for (let name in json) {

       switch(name){

          case '_dataRegistro':
             this[name] =new Date( json[name])
               break
               default :
               if(name.substring(0, 1) ==='_')  this[name] = json[name]
         
            }
       }
   }

   criarNovoId(){ // criando id

    let  userId = parseInt(localStorage.getItem('userId'))

    if(!userId > 0)  userId =0;
      let id = Math.random(32).toString(36).substr(2, 9)
    userId = id

    localStorage.setItem('userId', userId)
    
    return userId;

   }

   oJson(){ //método 

      let json = {}

      Object.keys(this).forEach(key=>{

         if(this[key] !== undefined ) json[key] = this[key]

      })

      return json;

   }



   save(){
         // inserir dados no banco de dados

     return  new Promise ((resolve, reject) =>{

            let promise=0;
   
          if(this.id){
            
            promise = fetch.put(`/users/${this.id}`, this.oJson())
             
         }else{
            
            promise = fetch.post('/users', this.oJson())
            
          }
   
               promise.then(data => {
   
                     this.loadFormJSON(data)

                     resolve(data)
               }).catch(e=>{

                  reject(e)

               })

         })   


   }

   static pegarUser(){
    return Fetch.get('/users')
  }

  remover(){
     return Fetch.delete(`/users/${this.id}`)
  }
  



}