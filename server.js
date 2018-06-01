

//引入mysql模块
var mysql = require('mysql');
//链接数据库
var connection = mysql.createConnection({
  host:'longtsing.com',
  user:'root',
  port:'3308',
  password:'za-lijie',
  database:'longtsing',
})
const express = require('express');
const app = express();
// const content=require('./configuration.js');
const bodyParser = require('body-parser');
const urlencoded=app.use(bodyParser.urlencoded({
    extended:true
}));
// 解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public')).listen(8888);
connection.connect();


let repspone = {
   code:'00000',
   msg:'成功',
   list:{}
}
//查询数据
app.get('/getUserList',function(req,res){
 var sql = 'SELECT * FROM user';
 // connect(res,sql);
 connection.query(sql,function (err,result) {
   if(err){
     console.log('err',err);
     return;
   }
   repspone.list = result
   console.log(repspone);
    res.send(repspone);

 })
});

// 增加数据
app.post('/addUser',function(req,res){
   var _data=req.body;
   console.log(req.body,'isbody')
   var sql='INSERT INTO user (name,age,sex) values ("'+_data.name+'",'+_data.age+',"'+_data.sex+'")';

});

//修改数据
app.post('/changeUser',function(req,res){
   var _data=req.body;
   console.log(req.body,'isbody')
   var sql='UPDATE user SET name = ?,age = ? WHERE id = ?';
   console.log(_data.id,'id',typeof(_data.id))
    if(_data.id == ''){
       repspone.code='9999'
       repspone.msg = 'id不能为空'
      return   res.send(repspone);
    }
   var modsqlparams = [_data.name, _data.age ,_data.id];

   connection.query(sql,modsqlparams,function (err,result) {
     if(err){
       console.log('err');
       return;
     }
     repspone.code='0000'
     repspone.msg = '成功'
      res.send(repspone);
   })

});

// 修改数据
app.delete('/delete/:id',function(req,res){
  var _id=req.params.id;
  var sql='DELETE FROM user where id='+_id;
  connect(res,sql);
});
function connect(res,sql){
    connection.query(sql,function(err,results,fields){
      res.send(results);
    });
}
