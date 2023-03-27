let http = require("http")
let url = require("url")
let fs = require("fs")
let formidable = require("formidable")
let server = http.createServer((req, res) => {
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        //Khởi tạo form
        let form = new formidable.IncomingForm()
        //Thiết lập thư mục chứa file trên server
        form.uploadDir = "./uploads/"
        //xử lý upload
        form.parse(req)
        form.on('fileBegin', (name, file) => {
            file.filepath = __dirname + '/uploads/' + file.originalFilename
        })
        form.on('file', () => {
            res.write('up thanh cong')
            res.end()
            console.log('up load thanh cong');
        })
    }
    res.writeHead('200', {'Content-Type': 'text/html'})
    //Đọc file index và trả về dữ liệu
    fs.readFile('./views/master.html', 'utf8', function (err, data) {
        //nếu nỗi thì thông báo
        if (err) {throw err}
        //không lỗi thì render data
        res.end(data)
    })
    
})
server.listen(8017, "localhost", () => {
    console.log(`Hello, I'm running at localhost:8017/`)
})
