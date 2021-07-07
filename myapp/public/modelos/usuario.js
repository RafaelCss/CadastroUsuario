
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

   loadFormJSON(json){

   for (let name in json) {

       switch(name){

          case '_dataRegistro':
             this[name] =new Date( json[name])
               break
               default :
                 this[name] = json[name]
         
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

   save(){
         // inserir dados no local storage

        let users = Usuario.pegarUser();

        if(this.id > 0){

         users.map(u=>{

            if(u._id == this.id){

            Object.assign( u,this)
               
            }
            return u;
         })

        }else{

            this._id = this.criarNovoId()
            users.push(this)
        //    sessionStorage.setItem('users',JSON.stringify(users))
          
        }
        localStorage.setItem('users',JSON.stringify(users))
   }

   static pegarUser(){
      let users = [];
  
      if(localStorage.getItem('users')){
  
          users = JSON.parse(localStorage.getItem('users'))
      }
  
      return users;
  }

  remover(){
   let users = Usuario.pegarUser();

   users.forEach((dadosUser, indice) => {

      if(this._id == dadosUser._id){

         users.splice(indice, 1)
      
      }
      
   });
   localStorage.setItem('users',JSON.stringify(users))
  }
  



}