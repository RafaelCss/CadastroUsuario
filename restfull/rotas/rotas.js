
module.exports = (app)=>{


    app.get('/', (req,res)=>{

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        res.end('<h1>Filhos</h1>')
        
        })
        
        app.get('/admin', (req,res)=>{
        
        res.end('Vida ')
        
        })

};