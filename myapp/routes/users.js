import { Router } from 'express';
var router = Router();
import { createJsonClient } from 'restify-clients';
import { ifError } from 'assert';


// Creates a JSON client
var client = createJsonClient({
  url: 'http://localhost:4000'
});


/* GET users listing. */
router.get('/', function(req, res, next) {

  client.get('/users', function(err, request, response, obj) {
    ifError(err);
  
    res.end(JSON.stringify(obj, null, 2));
  });
});
router.get('/:id', function(req, res, next) {

  client.get(`/users/${req.params.id}`, function(err, request, response, obj) {
    ifError(err);
  
    res.json(obj)
  });
});
router.put('/:id', function(req, res, next) {

  client.put(`/users/${req.params.id}`,req.body, function(err, request, response, obj) {
    ifError(err);
  
    res.json(obj)
  });
});
router.delete('/:id', function(req, res, next) {

  client.del(`/users/${req.params.id}`, function(err, request, response, obj) {
    ifError(err);
  
    res.json(obj)
  });
});


router.post('/', function(req, res, next) {

  client.del(`/users`, req.body, function(err, request, response, obj) {
    ifError(err);
  
    res.json(obj)
  });
});
export default router;
