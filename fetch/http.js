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