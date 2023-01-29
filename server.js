// 引入express
const express = require('express')
const cors = require('cors')

// 創建app實例對象
const app = express()
// 使用中間件解析 urlencoded 編碼形式的請求體參數
app.use(express.urlencoded({extended:true}))
// 使用中間件解析 json 編碼形式的請求體參數
app.use(express.json())
app.use(cors())

// 暴露靜態資源
app.use(express.static(__dirname + '/src'))

// 響應GET請求 —— 可以接收query參數
app.get('/test_get', (request, response) => {
    console.log('Someone sends a request to test_get -- query parameters are: ', request.query)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Expose-Headers', '*')
    response.send('Hello test_get')
})

// 響應GET請求 —— 可以接收params參數
app.get('/test_get2/:name/:age', (request, response) => {
    console.log('Someone sends a request to test_get2 -- params parameters are: ', request.params)
    response.send('Hello test_get2')
})

// 響應GET請求
app.get('/get_person', (request, response) => {
    console.log('Someone sends a request to get_person')
    const person = {name:'Donald', age:18, gender:'M'}
    response.send(JSON.stringify(person))
})

// 響應GET請求
app.get('/get_person_delay', (request, response) => {
    console.log('Someone sends a request to get_person_delay')
    const person = {name:'Tom', age:18, gender:'M'}
    setTimeout(() => {
        response.send(JSON.stringify(person))
    }, 3000)
})

// 響應POST請求 —— 可以接收請求體參數
app.post('/test_post', (request, response) => {
    console.log('Someone sends a request to test_post -- body parameters are:', request.body)
    response.send('Hello test_post')
})

// 響應GET請求
app.get('/test_jquery_get', (request, response) => {
    console.log('Someone sends a request to test_jquery_get')
    console.log(request.query)
    const car = {name:'BMW', price: '1M'}
    response.send(JSON.stringify(car))
})

app.options('/test_put', (request, response) => {
    // response.setHeader('Access-Control-Allow-Origin', '*')
    // response.setHeader('Access-Control-Expose-Headers', '*')
    // response.setHeader('Access-Control-Allow-Methods', '*')
    response.send()
})

// 響應PUT請求
app.put('/test_put', (request, response) => {
    // response.setHeader('Access-Control-Allow-Origin', '*')
    // response.setHeader('Access-Control-Expose-Headers', '*')
    response.send('hello_test_put')
})

// 響應POST請求 —— jQuery
app.post('/test_jquery_post', (request, response) => {
    console.log('Someone sends a request to test_jquery_post')
    console.log(request.query)
    const car = {name:'BMW', price: '1M'}
    response.send(JSON.stringify(car))
})

// 響應GET請求 —— jQuery
app.get('/test_jsonp/', (request, response) => {
    const {callback} = request.query
    const person = [{name:'Donald', age:18}, {name:'John', age:19}]
    response.send(`${callback}(${JSON.stringify(person)})`)
})

// 響應GET請求 —— fetch
app.get('/test_fetch_get', (request, response) => {
    console.log('Someone sends a request to test_fetch_get')
    const {id} = request.query
    const students = [
        {id:1, name:'Donald', age:18, gender:'M'},
        {id:2, name:'John', age:19, gender:'M'},
        {id:3, name:'May', age:20, gender:'F'},
        {id:4, name:'Lily', age:21, gender:'F'},
    ]
    const [obj] = students.filter((item) => {
        return item.id === eval(id)
    })
    response.send(JSON.stringify(obj))
})

// 響應POST請求 —— fetch
app.post('/test_fetch_post', (request, response) => {
    console.log('Someone sends a request to test_fetch_post', request.body)
    // let result = {statu:200, msg:'Succeed'}
    response.send(JSON.stringify({statu:200, msg:'Succeed'}))
})

// 監聽
app.listen(8080, (err) => {
    if(!err){
        console.log('Server created successfully')
        console.log('Address: ', 'http://127.0.0.1:8080/01_ajax基本使用.html')
        console.log('Address: ', 'http://127.0.0.1:8080/02_xhr的5種狀態.html')
        console.log('Address: ', 'http://127.0.0.1:8080/03_GET請求.html')
        console.log('Address: ', 'http://127.0.0.1:8080/04_POST請求.html')
        console.log('Address: ', 'http://127.0.0.1:8080/05_解析JSON數據.html')
        console.log('Address: ', 'http://127.0.0.1:8080/06_請求異常與超時處理.html')
        console.log('Address: ', 'http://127.0.0.1:8080/07_取消請求.html')
        console.log('Address: ', 'http://127.0.0.1:8080/08_避免多次重複請求.html')
        console.log('Address: ', 'http://127.0.0.1:8080/09_jQuery封裝的ajax.html')
        console.log('Address: ', 'http://127.0.0.1:8080/10_回調地獄.html')
    }
})