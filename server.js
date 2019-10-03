const http = require('http');
const express = require('express');
const Mock = require('mockjs');
const path = require('path');
//获取接口地址
const host = require('./api');

// http.createServer()

// 构建服务
const server = express();



// 服务拦截请求。拦截的请求链接就是第一个参数
server.get('/api/cateogory/list', (request, response)=>{
  // 当客户端发送了url请求，被拦截了，request, response会传人这个函数处理
  
  // mock假数据
  let result = Mock.mock({
    'list|20-40': [
      {
        'id|+1': 1,
        name: '@cword@cword',
        picUrl: '@image(100x100, @color, @color, @name)' 
      }
    ]
  });
  // 对客户端进行响应
  response.json(result);
  
});

server.use(express.static(path.join(__dirname, '/'))); //指定静态文件目录

server.get('/view/', (req, res)=>{
  res.sendFile(__dirname+'/view/index.html');
});

// 启动服务
server.listen(8081, 'localhost', (error)=>{
  if(error){
    console.log('启动失败');
  }else{
    console.log('启动成功');
    console.log('由'+host+'提供接口');
  }
});




