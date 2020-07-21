const Mock = require('mockjs');

const url = require('url');
const querystring = require('querystring');

Mock.mock(/\/api\/data/, 'get', (req, res) => {
  var arg = url.parse(req.url).query;
  var params = querystring.parse(arg);
  var data = [];
  var pageNum = window.parseInt(params.pageNum);
  var pageSize = window.parseInt(params.pageSize);
  var initNum = pageNum * pageSize;
  var endNum = initNum + pageSize;
  for (var i = initNum; i < endNum; i++) {
    data.push({'stepInst': 'javascript' + i, 'stepInstLabel': '脚本' + i, 'stepType': 'dp' + i});
  }
  return {
    content: data,
    totalElements: 2000
  };
});

Mock.mock(/\/api\/option/, 'get', (req, res) => {
  var arg = url.parse(req.url).query;
  console.log(req.url);
  var params = querystring.parse(arg);
  console.log(params);
  return [
    {'stepInst': 'javascript', 'stepInstLabel': '脚本', 'stepType': 'dp'},
    {'stepInst': 'javascript1', 'stepInstLabel': '脚本1', 'stepType': 'dp1'}
  ];
});

Mock.mock(/\/calc\/runTime/, 'get', (req, res) => {
  var arg = url.parse(req.url).query;
  console.log(req.url);
  var params = querystring.parse(arg);
  console.log(params);
  return {
    state: 'success',
    date: [
      '2018-09-10 10:45:40',
      '2018-09-11 10:45:40',
      '2018-09-12 10:45:40',
      '2018-09-13 10:45:40',
      '2018-09-14 10:45:40'
    ]
  };
});
