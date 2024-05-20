const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        console.log(files)
        res.render('index', {files : files})
    })
})

app.post('/create', (req, res) => {
    console.log(req.body)
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description, err => {
        if(err)
            throw err
        res.redirect('/')
    })
})

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
        res.render('fileDetails', {filename : req.params.filename, fileDetail: data})
    })
})

app.get('/edit/:filename', (req,res) => {
    res.render('edit', {filename: req.params.filename})
})

app.post('/edit/updateFilename', (req, res) => {
    console.log(req.body)
    fs.rename(`./files/${req.body.previousName}`, `./files/${req.body.newName}`, (err) => {
            // if(err)
            //     throw err
        res.redirect('/')
    })
})

app.listen(3000, ()=> console.log("Server is listening"))