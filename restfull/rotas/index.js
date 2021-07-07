const nedb = require('nedb')

const bancoDados = new nedb({
    filename : 'usuarios.db',
    autoload: true,

})

module.exports = (app)=>{

    let route = app.route('/users')

    route.get((req,res)=>{

    bancoDados.find({}).sort({nome:1}).exec((err, users)=>{

        if(err){

            app.utius.error.send(err, req, res)

        } else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json({
                   users
            })     
         }
    })
})    

route.post((req,res)=>{

    if(!app.utius.validacao.user(app, req, res)) return false

    bancoDados.insert(req.body, (err, user)=>{

        if(err){

            app.utius.error.send(err, req, res)

        }else{

            res.status(200).json(user)
        }
    })
    
    
});
  let routeId = app.route('/users/:id')

  routeId.get((req,res)=>{

    bancoDados.findOne({_id:req.params.id}).exec((err, user)=>{

        if(err){

            app.utius.error.send(err, req, res)

        }else{

            res.status(200).json(user)
        }    

    })
  })

  routeId.put((req,res)=>{

    if(!app.utius.validacao.user(app, req, res)) return false

    bancoDados.update({_id:req.params.id}, req.body, err =>{

        if(err){

            app.utius.error.send(err, req, res)

        }else{

            res.status(200).json(Object.assign(req.body,req.params))
        }    

    })
  })


  routeId.delete((req,res)=>{

    bancoDados.remove({_id:req.params.id}, {} , err =>{

        if(err){

            app.utius.error.send(err, req, res)

        }else{

            res.status(200).json(req.params)
        }    

    })
  })
}