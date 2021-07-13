class ControleUsuario {

    constructor(formularioId,formularioUp, tabelaId){

        this.formularioEle = document.getElementById(formularioId)
        this.formularioAtt= document.getElementById(formularioUp)
        this.tabelaEle = document.getElementById(tabelaId)

        this.addEvento();
        this.cancelarEdicao();
        this.select();
        this.botaoDeletar()
        this.botaoEditar()
       
    }


addEvento(){// adicionar evento de enviar formulário(submit).

    this.formularioEle.addEventListener('submit', evento=>{  
      
        evento.preventDefault()

        let btn = this.formularioEle.querySelector('[type = submit]')    


        btn.disabled = true

        let valor = this.pegarValores(this.formularioEle);

        if(!valor) return false;

        this.pegarArquivos(this.formularioEle).then((conteudo)=>{

            valor.photo = conteudo;
            valor.save().then(user=>{

                this.addLinhas(user);
                this.formularioEle.reset();
                btn.disabled = false
        

            })
                
        }, (e)=>{

            console.error(e);
            }
        );  

    })
   
} // adicionar evento de enviar formulario(submit).
////////////////////////////////////////////////////

pegarArquivos(formularioEle){ //pegar foto para upload


return new Promise((resolve, reject)=>{

    let fileReader = new FileReader();

    var arquivos = [...formularioEle].filter(foto =>{

        if(foto.name ==='photo') {
            
         return foto;
        }

    } );

    let arquivo = arquivos[0].files[0]

    fileReader.onload = () =>{

        resolve(fileReader.result);
    }
    if(arquivo){

        fileReader.readAsDataURL(arquivo);
    }else{

        resolve('dist/img/boxed-bg.jpg')
    }

    fileReader.onerror =(e)=>{

        reject(e)
    };

    })

}//pegar foto para upload


pegarValores(formularioEle){// pegar os valores do formulário

    var dados ={};
    var eValido = true;
 [...formularioEle].forEach( (campo, index) =>{

        if(['name','password','email'].indexOf(campo.name) > -1 && ! campo.value){

          campo.parentElement.classList.add('has-error')
            eValido = false;
        };
        
    if(campo.name =='gender'){
    
        if(campo.checked){
               dados[campo.name] = campo.value
                }        

            }else if(campo.name == 'admin'){

                dados[campo.name] = campo.checked
            }
            else{
                dados[campo.name] = campo.value 
            }  
            
        })
        if(!eValido){

            return false
        }
       return new Usuario(
            dados.name,
            dados.gender,
            dados.birth,
            dados.email,
            dados.password,   
            dados.admin,
            dados.photo,
            dados.country,
           )

}// pegar os valores do formulário

addLinhas(dadosUsuario){//adicionar linhas na tabela de usuário 
 
let tr = this.pegarTr(dadosUsuario)
this.tabelaEle.appendChild(tr)
this.contadorDeUsuer()

}//adicionar linhas na tabela de usuário 


 pegarTr(dadosUsuario, tr = null ){
 
   if(tr === null) tr = document.createElement('tr')
   tr.dataset.user =JSON.stringify(dadosUsuario);
   
   tr.innerHTML = ` 
   <tr id='tra'>
 <td><img src=${dadosUsuario.photo} alt="User Image" class="img-circle img-sm"></td>
 <td>${dadosUsuario.name}</td>
 <td>${dadosUsuario.email}</td>
 <td>${dadosUsuario.admin == true ? 'sim' : 'não' }</td>
 <td>${Utius.formatandoData(dadosUsuario.dataRegistro)}</td>
  <td>
  <button type="button" class="btn btn-primary btn-editar btn-xs btn-flat">Editar</button>
  <button type="button" class="btn btn-danger btn-xs btn-flat" id = 'excluir'>Excluir</button>
  </td>

  </tr>
`
this.botaoEditar(tr);
this.botaoDeletar(tr)

return tr

}


ativarEdicao(){ // botão ativar edição

    document.querySelector('#display-success').style.display = 'none'
    document.querySelector('#display-edit').style.display ='block'

   }

   
 cancelarEdicao(){ // botão de cancelar edição

    document.querySelector('#cancelar').addEventListener('click', e =>{
    
        document.querySelector('#display-success').style.display = 'block'
        document.querySelector('#display-edit').style.display =' none'
    
        
        })    
        
    }

    voltarCadastro(){ //voltar ao cadastro
        document.querySelector('#display-success').style.display = 'block'
        document.querySelector('#display-edit').style.display ='none'
       }

botaoEditar(tr){//// botão de editar os dados do cliente 

    tr.querySelector('.btn-editar').addEventListener('click', e =>{
        let json = JSON.parse(tr.dataset.user)

         this.formularioAtt.dataset.trIndex = tr.sectionRowIndex;

          for(let name in json){
          
            let campoEditado = this.formularioAtt.querySelector("[name =" + name.replace("_" , "") + "]");
    
            if(campoEditado){
    
                switch (campoEditado.type){ 
      
                    case 'file':
                    continue;
              
                    case 'radio' :
                    
                      campoEditado = this.formularioAtt.querySelector("[name =" + name.replace("_" ,"") + "][value =" + json[name] + "]");
                         campoEditado.checked = true;
                        break;
                    
                    case 'checkbox' :
                       
                      campoEditado.checked = json[name];
                        
                    break;
      
                    default :
                    campoEditado.value = json[name];
                }
      
              }
    
          }
          this.formularioAtt.querySelector('.photo').src = json._photo
          this.ativarEdicao();
          this.formularioEdicao(tr)
          
    });
   
}// botão de editar os dados do cliente 

contadorDeUsuer(){ // contador de usuário e de administradores 
    
var qntDeUser = 0;
let qntDeAdmin =0;
[...this.tabelaEle.children].forEach( campo =>{
    qntDeUser++;
     let user = JSON.parse(campo.dataset.user); 
     if(user._admin) qntDeAdmin++;    
    })
    document.getElementById('qtn-usuarios').innerHTML= qntDeUser
    document.getElementById('qtn-adms').innerHTML = qntDeAdmin
    }// contador de usuário e de administradores 


formularioEdicao(){ // botão salvar formulario de edição

this.formularioAtt.addEventListener('submit', evento =>{

    evento.preventDefault();
    
    let btn = this.formularioAtt.querySelector('[type = submit]')

    btn.disabled = true;

    var valor = this.pegarValores(this.formularioAtt);

    let index = this.formularioAtt.dataset.trIndex;

    let linhas = this.tabelaEle.rows[index];

    let userAntigo = JSON.parse(linhas.dataset.user);

    let resultado = Object.assign({},userAntigo , valor) // cria um novo objeto com outros

    this.pegarArquivos(this.formularioAtt).then((conteudo)=>{

        if(!valor.photo){
            resultado._photo= userAntigo._photo;
        }else{

            resultado._photo= conteudo;
        }

      var user = new Usuario();

        user.loadFormJSON(resultado)

        user.save().then(user=>{

            this.pegarTr(user, linhas)
            this.contadorDeUsuer();
            this.formularioAtt.reset()
            btn.disabled = false
            this.voltarCadastro();
            this.botaoEditar(linhas)
            this.botaoDeletar(linhas)


        })
        

    }, (e)=>{

        console.error(e);
        }
    );  
   
    })
    
 }   // botão salvar formulario de edição

botaoDeletar(tr){// botão delete
    
    tr.querySelector('.btn-danger').addEventListener('click', e =>{
    if(confirm('Deseja excluir usuário ?')){
    
       let user =new Usuario();

        user.loadFormJSON(JSON.parse(tr.dataset.user))
        user.remover().then(data=>{

            tr.remove()
            this.contadorDeUsuer();

        })

      }
  })

}    
// botão delete


select(){  // pegar banco de dados

  //  let users = Usuario.pegarUser();

     HttpRequest.get('/users').then(data=>{

        data.users.forEach(datauser =>{
 
        let user = new Usuario();

        user.loadFormJSON(datauser)

        this.addLinhas(user)
       
 
        })

  });
  
 }
 


}