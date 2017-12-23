const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
})

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'Secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }else {
      res.json({
        message: "Post created!!!",
        authData
      });
    }
  });
})

// Tao va thc hien dang nhap voi tai khoan ao
app.post('/api/signin', (req, res) => {
  //Mock user
  const user = {
    id: 1,
    username: "manhtmhp123",
    email: "huymanhtmhp@gmail.com"
  }

  //Sign with jwr
  jwt.sign({user}, 'Secretkey', {expiresIn: '30s'}, (err, token) => {
    res.json({
      token
    });
  });
});

//Cau truc cua token
//Authorization: Bearer <access_token>

//Ham kiem tra token
function verifyToken(req, res, next){
  //Get auth value
  var bearerHeader = req.headers['authorization'];
  //Kiem tra xem bearer da define chua
  if (typeof bearerHeader !== 'undefined') {
    //Cat token ra thanh mang
    const bearer = bearerHeader.split(' ');
    //Lay gia tri token
    const bearerToken = bearer[1];
    //Gan gia trij token vao req
    req.token = bearerToken;
    // Thuc thi cong viec tiep theo
    next();
  }else {
    //Forbidden
    res.sendStatus(403);
  }
}
app.listen(3000, () => console.log("App started!!!"));
