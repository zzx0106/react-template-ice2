// 可以搭配mockjs使用
// https://github.com/nuysoft/Mock
export default {
  // 启动调试服务后，假设启动的端口是 3333，直接在浏览器里访问 http://127.0.0.1:3333/api/users 即可看到接口返回数据。
  // // 同时支持 GET 和 POST
  // '/api/users/1': { data: {} },
  // '/api/foo/bar': { data: {} },
  // // 支持标准 HTTP
  // 'GET /api/users': { users: [1, 2] },
  // 'DELETE /api/users': { users: [1, 2] },
  // // 支持参数
  // 'POST /api/users/:id': (req, res) => {
  //   const { id } = req.params;
  //   res.send({ id: id });
  // },
};
