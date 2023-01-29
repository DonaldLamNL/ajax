# AJAX

## 原生AJAX
1. AJAX簡介：
    - AJAX 全稱 Asynchronous Javascript And XML，就是異步的 JS 和 XML
    - 通過 AJAX 可以再瀏覽器中向服務器發送異步請求，最大優勢：<font color="#f54747">頁面無刷新獲取數據</font>
    - AJAX 不是新的編程語言，而是一種將現有的標準集合在一期使用的新方式


2. XML簡介：
    - XML 可擴展標記語言
    - XML 被設計用來傳輸和存儲數據
    - XML 和 HTML 類似，不同的是 HTML 仲都是預定義標籤，而 XML 仲沒有預定義標籤，都是自定義標籤，用來表示一些數據
        ```html
        <student>
            <name>Donald</name>
            <age>18</age>
            <gender>Male</gender>
        </student>
        ```
    - 現在已經被 JSON 取代了
        ```json
        {"name":"Donald", "age":18, "gender":"Male"}
        ```


3. AJAX特點：
    - 優點：
        1. 可以無需刷新頁面而與服務器進行通信
        2. 允許你根據用戶事件來更部分分頁內容
    - 缺點：
        1. 沒有瀏覽史，不能回退
        2. 存在跨域問題（可解決）
        3. SEO 不友好



### AJAX基本使用
1. 核心對象
    `XMLHttpRequest` - AJAX的所有操作都是用過該對象進行


2. 使用步驟：
    1. 創建`XMLHttpRequest`實例對象
        ```js
        const xhr = new XMLHttpRequest()
        ```
    
    2. 指定發送請求的：方法(`methods`)和地址(`url`)
        ```js
        xhr.open('GET', 'http://127.0.0.1:8080/test_get')
        ```

    3. 發送請求
        ```js
        xhr.send()
        ```
    
    4. 接收數據
        ```js
        // 綁定監聽狀態
        xhr.onreadystatechange = () => {
            // 當監聽狀態等於 4 表示數據接收完畢
            if(xhr.readyState === 4){
                // xhr.response 獲取數據
                content.innerHTML = `<h3>${xhr.response}</h3>`
            }
        }
        ```



### xhr內部的五種狀態
- 5種狀態的值分別為：`0`、`1`、`2`、`3`、`4`
    - `0`：實例出來的那一刻（初始狀態）
    - `1`：open已經調用了，但是send還沒有調用，此時可以修改請求頭內容
    - `2`：send已經調用了，已經無法修改請求頭
    - `3`：已經回來一部分數據，小的數據會在此階段一次性接收完畢，較大的數據有待進一步接收，<font color="#f54747">響應頭一定回來</font>
    - `4`：數據全部接收完畢



### GET請求
1. 攜帶`query`參數
    1. 指定請求：
        - 使用`query`參數 (`urlencoded`) 編碼形式：`key=value&key=value`
            ```js
            xhr.open('GET', 'http://127.0.0.1:8080/test_get?name=Donald&age=18')
            ```
    
    2. 接收參數：
        - 使用`request.query`屬性
            ```js
            app.get('/test_get/', (request, response) => {
                console.log(request.query)
            })
            ```


2. 攜帶`params`參數
    1. 指定請求：
        - 使用`params`參數形式：`xxx/xxx/Donald/18`
            ```js
            xhr.open('GET', 'http://127.0.0.1:8080/test_get/Donald/18')
            ```
        
    2. 接收參數：
        - 使用`request.params`屬性
        - 地址配置佔位符 (`/:name/:age`)
            ```js
            // 佔位符
            app.get('/test_get/:name/:age', (request, response) => {
                console.log(request.params)
            })
            ```



### POST請求
1. 攜帶`query`參數
    1. 指定請求：
        - 使用`query`參數 (`urlencoded`) 編碼形式
            ```js
            xhr.open('POST', 'http://127.0.0.1:8080/test_post?name=Donald&age=18')
            ```
    
    2. 接收參數：
        - 使用`request.query`屬性
            ```js
            app.post('/test_post/', (request, response) => {
                console.log(request.query)
            })
            ```



2. 攜帶`params`參數
    1. 指定請求：
        - 使用`params`參數形式
            ```js
            xhr.open('POST', 'http://127.0.0.1:8080/test_post/Donald/18')
            ```
        
    2. 接收參數：
        - 使用`request.params`屬性
        - 地址配置佔位符 (`/:name/:age`)
            ```js
            // 佔位符
            app.post('/test_post/:name/:age', (request, response) => {
                console.log(request.params)
            })
            ```



3. 使用請求體的`urlencode`編碼形式
    1. 指定請求：
        - 不需要在地址中添加
            ```js
                xhr.open('POST', 'http://127.0.0.1:8080/test_post')
            ```
    
    2. 追加響應頭：
        - 用於表示攜帶請求體參數的`urlencode`編碼形式
            ```js
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            ```
    
    3. 發送請求：
        - 在發送請求時傳入參數
            ```js
            xhr.send('name=Donald&age=18')
            ```
    
    4. 使用中間件解析：
        - 引入中間件解析`urlencoded`編碼形式的請求體參數
            ```js
            app.use(express.urlencoded({extended:true}))
            ```
    
    5. 接收參數：
        - 使用`request.body`屬性
            ```js
            app.post('/test_post', (request, response) => {
                console.log(request.body)
            })
            ```



4. 使用請求體的`json`編碼形式
    1. 指定請求：
        - 不需要在地址中添加
            ```js
                xhr.open('POST', 'http://127.0.0.1:8080/test_post')
            ```
    
    2. 追加響應頭：
        - 用於表示攜帶請求體參數的`json`編碼形式
            ```js
            xhr.setRequestHeader('Content-type', 'application/json')
            ```
    
    3. 發送請求：
        - 在發送請求時傳入參數
        - `JSON.stringify`對象，讓其轉換為`JSON`字符串
            ```js
            const person = {name:'Donald', age:18}
            xhr.send(JSON.stringify(person))
            ```
    
    4. 使用中間件解析：
        - 引入中間件解析`json`編碼形式的請求體參數
            ```js
            app.use(express.json())
            ```
    
    5. 接收參數：
        - 使用`request.body`屬性
            ```js
            app.post('/test_post', (request, response) => {
                console.log(request.body)
            })
            ```



### 解析JSON數據
1. 解析JSON格式數據：
    - 在獲取數據之後使用`JSON.parse`函數解析
        ```js
        const result = JSON.parse(xhr.response)
        console.log(result)
        ```
    - 問題：如果服務器返回的數據非 JSON 格式則會報錯


2. `xhr`的API解析JSON格式：
    - 配置`xhr.responseType`屬性為`json`
        ```js
        xhr.responseType = 'json'
        ```
    - 服務器返回數據後就會進行 JSON 格式的解析，如果返回數據非 JSON 格式則`response`為`null`



### 請求異常與超時處理
1. 處理請求異常：
    - 使用`xhr.onerror`配置請求異常的回調函數
        ```js
        xhr.onerror = () => {
            alert('Request Error')
        }
        ```


2. 處理超時問題：
    - 使用`xhr.timeout`設置請求時限，如果超過時限則取消請求
    - 使用`xhr.ontimeout`配置超時的回調函數
        ```js
        // 超時時間
        xhr.timeout = 2000
        
        // 超時的回調
        xhr.ontimeout = () => {
            alert('Request Timeout');
        }
        ```



### 取消請求
1. 取消請求：
    - 使用`xhr.abort`函數可以取消該次請求
        ```js
        xhr.abort()
        ```


2. 工作原理：
    - 測試編碼：
        ```js
        xhr.send()
        xhr.abort()
        ```
    - 如果發送請求之後立即取消請求，該次請求是有可能已經發送到服務器，但也獲取不到數據，因為瀏覽器會將服務器的響應攔截
    - 簡而言之，然後速度夠快，在請求沒有發送到服務器之前被攔截並取消，如果請求發送到服務器，那麼瀏覽器也會攔截服務器的響應



### 避免多次重複請求
- 配置一個`isLoading`屬性判斷請求是否發送中，如果發送中，再次發生請求則關閉上次的請求
    ```js
    let xhr
    let isLoading
    btn.onclick = () => {
        if(isLoading) xhr.abort()   // 如果發送請求中則取消該次請求
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                isLoading = false   // 接收到數據後為 false
            }
        }
        xhr.send()
        isLoading = true    // 發生請求後為 true
    }
    
    ```



## jQuery封裝的AJAX

### GET請求
1. 完整版：
    ```js
    $.ajax({
        url: 'http://127.0.0.1:8080/test_jquery_get',   // 請求地址
        method: 'GET',                                  // 請求方式（默認值GET）
        dataType: 'json',                               // 配置響應數據格式
        data: {},                                       // 攜帶的數據
        timeout: 2000,                                  // 指定超時時間
        success: (result, responseText, xhr) => {       // 成功的回調
            result          // 服務器的響應數據
            responseText    // 響應結果 (success)
            xhr             // xhr 構造函數
        },
        error: () => {},                                // 失敗的回調
    })
    ```


2. 精簡版：
    ```js
    $.get('http://127.0.0.1:8080/test_jquery_get', {}, (data) => {
        console.log(data)
    },'json')
    ```


3. 備註：攜帶的數據默認是`query`格式，可以使用`params`格式，不過要在`url`和服務器追加上追加



### POST請求
1. 完整版：
    ```js
    $.ajax({
        url: 'http://127.0.0.1:8080/test_jquery_post',  // 請求地址
        method: 'POST',                                 // 請求方式（默認值GET）
        dataType: 'json',                               // 配置響應數據格式
        data: {},                                       // 攜帶的數據
        timeout: 2000,                                  // 指定超時時間
        success: (result, responseText, xhr) => {       // 成功的回調
            result          // 服務器的響應數據
            responseText    // 響應結果 (success)
            xhr             // xhr 構造函數
        },
        error: () => {},                                // 失敗的回調
    })
    ```


2. 精簡版：
    ```js
    $.post('http://127.0.0.1:8080/test_jquery_post', {}, (data) => {
        console.log(data)
    },'json')
    ```


3. 備註：攜帶的數據默認是`query`格式，可以使用`params`格式，不過要在`url`和服務器追加上追加



## 回調地獄
- 演示：
    ```js
    // 需求：在成功獲取數據之後再獲取（其他）數據
    btn1.click(() => {
        $.get('http://127.0.0.1:8080/test_jquery_get', {school:'CUHK'}, (data) => {
            console.log(data)
            $.get('http://127.0.0.1:8080/test_jquery_get', {school:'CUHK'}, (data) => {
                console.log(data)
                $.get('http://127.0.0.1:8080/test_jquery_get', {school:'CUHK'}, (data) => {
                    console.log(data)
                    $.get('http://127.0.0.1:8080/test_jquery_get', {school:'CUHK'}, (data) => {
                        console.log(data)
                    }, 'json')
                }, 'json')
            }, 'json')
        }, 'json')
    })
    ```

- 問題：陷入回調地獄，代碼向右拓展，極其難以維護

- 解決方法：使用`ES6`中的`Promise`構造函數



## 跨域問題

### 同源策略
1. 簡介：
    - 同源策略 (Same-Origin-Policy) 由 Netscape 提出的一個安全策略，如今所有支持 JavaScript 的瀏覽器都會使用這個策略
    - Web 是建構在同源策略基礎之上，瀏覽器只是針對同源策略的一種實現
    - 同源：協議、域名(IP)、端口<font color="#f54747">必須完全相同</font>
        即：協議、域名、端口都相同，才能算是在同一個域裡


2. 例子：
    - 假設已有網站地址：http://study.com
        | 請求地址 | 形式 | 結果 |
        | ----- | :---: | :---: | 
        | http://study.com/test/a.html | 協議、域名、端口相同 | 成功 |
        | http://study.com/user/a.html | 協議、域名、端口相同 | 成功 |
        | http://a.study.com/test/a.html  | 域名不同 | 失敗 |
        | http://study.com:8080/test/a.html | 端口不同 | 失敗 |
        | https://study.com/test/a.html | 協議不同 | 失敗 |


3. 沒有同源策略的危險性：
    - 釣魚網站模擬登錄頁面，如果沒有同源策略，就可以即時使用 AJAX 竊取用戶輸入的帳號與密碼
    - 例子：
        ```html
        <iframe id="google" src="https://www.google.com"></iframe>
        <script>
            const iframe = window.iframe['google']
            const inputNode = iframe.document.getElementById('xxx')
        </script>
        ```


4. 非同源收到的限制：
    1. Cookie 不可讀取
    2. DOM 無法獲取
    3. Ajax 請求不能獲取數據



### JSONP解決跨域
1. 簡介：
    - JSONP (JSON with Padding) 是一個非官方的跨域解決方案，純粹憑藉程序員的聰明才發出來
    - <font color="#f54747">只支持GET請求</font>


2. JSONP原理：
    - 繞過`xhr`，借助`script`發請求不受同源策略的限制把數據傳遞


3. 基本使用：
    - 在後端服務器上響應一個函數，數據作為函數的參數（以`JSON.stringify`轉成字符串）
    - 在前端定義一個重名的函數，然後以`script`標籤發送請求
    - 服務器編碼：
        ```js
        app.get('/test_jsonp/', (request, response) => {
            const person = [{name:'Donald', age:18}]
            response.send(`demo(${JSON.stringify(person)})`)
        })
        ```
    - 具體編碼：
        ```js
        btn.onclick = () => {
            // 1. 創建 script 節點
            const scriptNode = document.createElement('script')
            // 2. 給節點指定 src 屬性
            scriptNode.src = 'http://127.0.0.1:8080/test_jsonp'
            // 3. 將節點放入頁面
            document.body.appendChild(scriptNode)
            window.demo = (person) => {
                console.log(person)
            }
        }
        ```



4. 優化：
    - 基於使用 JSONP 必須要前後端定義同一個函數名，前端可以使用`query`形式傳遞函數名給後端，後端基於此函數名響應函數
    - 服務器編碼：
        ```js
        // 優化一、動態創建函數名
        app.get('/test_jsonp/', (request, response) => {
            const {callback} = request.query
            const person = [{name:'Donald', age:18}]
            response.send(`${callback}(${JSON.stringify(person)})`)
        })
        ```
    - 具體編碼：
        ```js
        scriptNode.src = 'http://127.0.0.1:8080/test_jsonp?callback=test'
        window.test = (person) => {
            console.log(person)
        }
        // 優化二、移除已經使用過的 script 節點
        document.body.removeChild(scriptNode)
        ```



5. jQuery封裝的JSONP
    - 具體編碼：
        ```js
        $.getJSON('http://127.0.0.1:8080/test_jsonp?callback=?', {name: 'Tom'}, (data) => {
            console.log(data)
        })
        ```



### CORS
1. 簡介：
    - CORS (Cross-Origin Resource Sharing) 跨域資源共享，CORS 是官方的跨域解決方案
    - 它的特點在於<font color="#f54747">不需要在客戶端做任何特殊的操作，完全在服務器中進行處理</font>，支持所有常見請求


2. 配置響應頭：
    1. 允許獲取數據：
        ```js
        response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
        response.setHeader('Access-Control-Allow-Origin', '*')
        ```
    
    2. 允許獲取響應頭：
        ```js
        response.setHeader('Access-Control-Expose-Headers', '*')
        ```
    
    3. 允許複雜請求：
        - 由於`PUT`和`DELETE`這些複雜請求在真正請求之前會發送一個預請求，因此要對預請求也配置響應頭
        ```js
        // 響應PUT請求
        app.put('/test_put', (request, response) => {
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Expose-Headers', '*')
            response.send('hello_test_put')
        })
        
        // 響應預請求
        app.options('/test_put', (request, response) => {
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Access-Control-Expose-Headers', '*')
            response.setHeader('Access-Control-Allow-Methods', '*')
            response.send()
        })
        ```



3. 使用`cors`中間件
    1. 安裝：
        ```bash
        yarn add cors
        ```
    
    2. 導入、註冊並使用：
        ```js
        const cors = require('cors')
        app.use(cors())
        ```


4. 重點：
    1. 前端人員無需進行任何特殊操作
    2. 用`cors`解決跨域不是設置一兩個響應頭就能解決
    3. `PUT`和`DELETE`請求都是複雜請求，這些請求在真正請求之前必須進行一次預請求



## fetch

### fetch基本認知
1. 發送請求方法：
    1. 通過`Ajax`向服務器請求數據，使用`XMLHttpRequest`對象實現
        ```js
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'url')
        xhr.send()
        xhr.addEventListener('LOAD', () => {
            console.log(JSON.parse(xhr.response))
        })
        ```

    2. 通過`axios`實現，代碼精簡但底層仍然基於`XMLHttpRequest`對象實現，本質只是進行`Promise`封裝


2. `fetch`簡介：
    - 被稱為下一代的`Ajax`技術，內部採用`Promise`方法處理數據 （可以直接使用`.then`）
    - API語法簡潔
    - 採用模塊化設計，API分散於多個對象中 （`Responnse`對象、`Request`對象、`Header`對象）
    - 通過數據流 （`Stream`對象）處理數據，可以分塊讀取，有利於提高網站性能



### GET請求
1. 簡介：
    - 如果`fetch()`只接收<font color="#f54747">一個</font>`url`字符串參數，表示默認向網址發送`GET`請求，會返回一個`Promise`對象


2. 基本使用
    - 具體編碼
        ```js
        fetch('http://127.0.0.1:8080/test_fetch_get').then(res => {
            // 直接得到的 res 是一個 Response 對象
            console.log(res)

            // res.json() 是一個異步操作，表示取出所有內容，並轉換成 JSON 對象
            return res.json()

        }).then(json => {
            // 獲取處理過的數據
            console.log(json)

        }).catch(err => {
            // 捕獲錯誤信息
            console.error(err)
        })
        ```



3. 把代碼封裝成`async`異步函數
    - 具體編碼：
        ```js
        async function getData(){
            // 通過 try...catch 處理 async 和 await 成功和失敗情
            try {
                // 先獲取 Response 對象
                let res = await fetch('http://127.0.0.1:8080/test_fetch_get')
                console.log(res)

                // 通過 res.json() 取出 Response 對象中的結果
                let json = await res.json()
                console.log(json)

            } catch (err) {
                console.error(err)
            }
        }
        getData()
        ```



### Respons對象
1. 常見屬性：
    | 屬性 | 含義 |
    | :---: | :---: |
    | `res.ok` | 返回`boolean`，表示請求是否成功 |
    | `res.status` | 返回數字，表示`HTTP`響應的狀態碼（例如：200表示請求成功） |
    | `res.statusText` | 返回狀態的文本信息 |
    | `res.url` | 返回請求的`url`地址值 |


2. 常見方法：
    | 方法 | 含義 |
    | :---: | :---: |
    | `res.json()` | 得到 JSON 對象 |
    | `res.text()` | 得到文本字符串 |
    | `res.blob()` | 得到二進制 Blob 對象 |
    | `res.formData()` | 得到 FormData 表單對象 |
    | `res.arrayBuffer()` | 得到二進制 ArrayBuffer 對象 |



### POST請求
1. 簡介：
    - `fetch()`可以傳遞第二個參數指定請求的方式
    - 配置參數：
        ```js
        fetch('url', {
            // 請求方法
            method: '',
            // 設置請求頭
            headers: {
                // 數據格式
                'Content-Type': ''
            },
            // 配置請求體數據
            body: ''
        })
        ```


2. JSON格式：
    - 設置請求頭：`'Content-Type': 'application/json'`
    - 具體編碼：
        ```js
        async function add(){
            let obj = {name:'Donald', age:18, gender: 'M'}

            let res = await fetch('http://127.0.0.1:8080/test_fetch_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })

            console.log(res.json())
        }
        add()
        ```


3. `urlencoded`格式：
    - 設置請求頭：`'Content-Type': 'application/x-www-form-urlencoded'`
    - 具體編碼：
        ```js
        async function add(){
            let res = await fetch('http://127.0.0.1:8080/test_fetch_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'name=Donald&age=18&gender=M'
            })
            console.log(res.json())
        }
        add()
        ```



### fetch函數封裝
1. 簡介：
    - `fetch`相比`XMLHttpRequest`已經方便很多，但參數仍須自己處理
        - `GET`, `DELETE`的請求參數需要寫在地址欄裡
        - `PUT`, `PATCH`, `POST`的請求參數需要轉JSON設置請求頭


2. 二次封裝效果：
    ```js
    // 發送GET、DELETE請求
    http({
        method:'XXX',
        url:'xxx',
        params: {...}
    })

    // 發送POST、PUT、PATCH請求
    http({
        method:'XXX',
        url:'xxx',
        data: {...}
    })
    ```


3. 具體編碼：
    ```js
    async function http({method, url, params, data}){
        // params 需要轉換成 key=value&key=value 的形式
        if(params){
            // 固定寫法： new URLSearchParams(params).toString()
            let str = new URLSearchParams(params).toString()
            // 拼接到 url
            url += '?' + str
        }

        // 最終結果
        let res
        // data 需要寫完整的代碼
        if(data){
            res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }else{
            res = await fetch(url)
        }
        return res.json()
    }
    ```
