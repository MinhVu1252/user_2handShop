var express = require('express');
var sql = require("mssql");
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const multer = require('multer');
const storage = require('storage');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var sql = require("./libs/sql");
app.use('/ban', express.static(__dirname + 'ban.css'))
app.use('/dangky', express.static(__dirname + 'dangky.css'))
app.use('/lienhe', express.static(__dirname + 'lienhe.css'))
app.use('/tintuc', express.static(__dirname + 'tintuc.css'))
app.use('/animate', express.static(__dirname + 'animate.css'))
app.use('/indexx', express.static(__dirname + 'index.css'))
app.use('/loginn', express.static(__dirname + 'login.css'))
app.use('/main', express.static(__dirname + 'main.css'))
app.use('/bootstrap.min', express.static(__dirname + 'bootstrap.min.css'))
app.use('/font-awesome.min', express.static(__dirname + 'font-awesome.min.css'))
app.use('/footer', express.static(__dirname + 'footer.css'))
app.use('/prettyPhoto', express.static(__dirname + 'prettyPhoto.css'))
app.use('/price-range', express.static(__dirname + 'price-range.css'))
app.use('/product', express.static(__dirname + 'product.css'))
app.use('/responsive', express.static(__dirname + 'responsive.css'))
app.use('/shopping-card', express.static(__dirname + 'shopping-card.css'))
app.use('/test_slide_product', express.static(__dirname + 'test_slide_product.css'))

app.get('/index', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + "/admin.html");
});


app.get('/ban', function(req, res) {
    res.sendFile(__dirname + "/ban.html");
});

app.get('/dangky', function(req, res) {
    res.sendFile(__dirname + "/dangky.html");
});

app.get('/dangnhap', function(req, res) {
    res.sendFile(__dirname + "/dangnhap.html");
});

app.get('/shopp', function(req, res) {
    res.sendFile(__dirname + "/shopp.html");
});

app.get('/shopping', function(req, res) {
    res.sendFile(__dirname + "/shopping.html");
});

app.get('/tintuc', function(req, res) {
    res.sendFile(__dirname + "/tintuc.html");
});

app.get('/thongtin', function(req, res) {
    res.sendFile(__dirname + "/thongtin.html");
});

app.get('/lienhe', function(req, res) {
    res.sendFile(__dirname + "/lienhe.html");
});

app.get('/getAllProduct', function (req, res) {
    // config for your database
   sql.executeSQL("select * from sanpham order by sanpham.[index]", (recordset)=>{
    res.send(recordset.recordsets[0]);
   })
});

app.post('/searchProduct', function (req, res) {
    // config for your database
   sql.executeSQL("select * from sanpham where sanpham.name like '%"+req.body.search+ "%' order by sanpham."+req.body.sort,(recordset)=>{
    res.send(recordset.recordsets[0]);
   })
});

app.post('/userLogin', function (req, res) {
    // config for your database
    sql.executeSQL("select * from KhachHang2 where UserLogin = '"+req.body.userName+"' and [Password]='"+req.body.password+"'" , (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});

app.post('/createlogin', function (req, res) {
    // config for your database
    sql.executeSQL("insert into KhachHang2(TenKH, DiaChi, SDT, Password, UserLogin, picture) values ( '"+req.body.TenKH+"','"+req.body.Address+"', '"+req.body.Phonenumber+"', '"+req.body.Password+"', '"+req.body.UserLogin+"','"+fileName+".jpg' )" , (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});

app.get('/getShoppingCard/:lstSP', function (req, res) {
    // config for your database
    sql.executeSQL("select * from sanpham where id in ("+req.params.lstSP+") order by sanpham.[index]", (recordset) => {
        res.send(recordset.recordsets[0]);

    })
});

app.post('/buyProducts', async function (req, res) {
    var maKH = req.body.maKH;
    var lstSP = req.body.lstSP;
    // console.log("insert into HoaDon4(MaKH,NgayBan) values('"+maKH+"',getdate())");
    var data1 = await sql.executeSQLP("insert into HoaDon4(MaKH,NgayBan) values('"+maKH+"',getdate())");
    var data2 = await sql.executeSQLP("select @@IDENTITY as MaHD");
    console.log(data1);
    console.log(data2);
 
    var maHD = data2.recordsets[0][0].MaHD;
    for(var i = 0; i < lstSP.length; i++){
        var item = lstSP[i];
        // console.log("insert into ChiTietHD2(MaHD,id,SoLuong,GiaBan) values('"+maHD+"','"+item.maSP+"','"+item.soluong+"','"+item.gia+"')");
       await sql.executeSQLP("insert into ChiTietHD1(MaHD,id,SoLuong,GiaBan) values('"+maHD+"','"+item.maSP+"','"+item.soluong+"','"+item.gia+"')");
    }
    res.send("ok");
});

app.get('/getUser/:maKH', function (req, res) {
    // config for your database
    sql.executeSQL("select * from KhachHang2 where [MaKH] = '"+req.params.maKH+"'" , (recordset) => {
        res.send(recordset.recordsets[0][0]);
    })
});

app.get('/getcustomers', function (req, res) {
    // config for your database
   sql.executeSQL("select * from KhachHang2 ", (recordset)=>{
    res.send(recordset.recordsets[0]);
   })
});

app.get('/getbills', function (req, res) {
    // config for your database
   sql.executeSQL("select * from HoaDon4 ", (recordset)=>{
    res.send(recordset.recordsets[0]);
   })
});


function storagefileIMG( extend){
    fileName = Math.random() * 1000;
    var storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'public/img')
        },
        filename: function(req, file, cb){
            cb(null, fileName+ extend);
        }
    });
    return storage;
}
app.post('/uploadphoto', multer({storage: storagefileIMG( '.jpg')}).single('img1'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.redirect('/admin');
  });

  app.post('/uploadphoto1', multer({storage: storagefileIMG( '.jpg')}).single('img2'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.redirect('/dangky');
  });

app.post('/insertProduct', async function(req, res){
    sql.executeSQL("insert into sanpham(name, img, price, num) values ('"+req.body.name+"', '"+fileName+".jpg',"+req.body.price+", "+req.body.num+") " , (recordset) => {
        res.send('ok');
    })
})

app.post('/insertcustomer', async function(req, res){
    sql.executeSQL("insert into KhachHang2(TenKH, DiaChi, SDT, Password, IdAdmin, UserLogin) values ('"+req.body.TenKH+"', '"+req.body.DiaChi+"','"+req.body.SDT+"', '"+req.body.Password+"', '"+req.body.IdAdmin+"', '"+req.body.UserLogin+"') " , (recordset) => {
        res.send('ok');
    })
})

app.post('/deleteProduct', async function(req, res){
    sql.executeSQL("delete sanpham where id =" +req.body.id , (recordset) => {
        res.send('ok');
    })
})

app.post('/updateProduct', async function(req, res){
    sql.executeSQL("UPDATE sanpham SET name='"+req.body.name+"',img='"+fileName+".jpg',price='"+req.body.price+"', num='"+req.body.num+"' WHERE id =" +req.body.id, (recordset) => {
        res.send('ok');
    })
})

app.post('/updateCustomer', async function(req, res){
    sql.executeSQL("UPDATE KhachHang2 SET TenKH='"+req.body.TenKH+"',DiaChi='"+req.body.DiaChi+"', SDT='"+req.body.SDT+"' , Password='"+req.body.Password+"' , IdAdmin='"+req.body.IdAdmin+"' , UserLogin='"+req.body.UserLogin+"' WHERE MaKH =" +req.body.MaKH, (recordset) => {
        res.send('ok');
    })
})


app.post('/deleteCustomer', async function(req, res){
    sql.executeSQL("delete KhachHang2 where MaKH =" +req.body.MaKH , (recordset) => {
        res.send('ok');
    })
})



var server = app.listen(3005, function() {
    console.log('Server is running..');
});