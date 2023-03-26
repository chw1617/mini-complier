const code = '(add 2 (subtract 4 2))'
const result = [                                        
    { type: 'paren', value: '(' },       
    { type: 'name', value: 'add' },      
    { type: 'number', value: '2' },      
    { type: 'paren', value: '(' },       
    { type: 'name', value: 'subtract' }, 
    { type: 'number', value: '4' },      
    { type: 'number', value: '2' },      
    { type: 'paren', value: ')' },       
    { type: 'paren', value: ')' },       
]


// 词法分析思路：开启一个指针，从第一个字符开始，不断遍历到最后的一个字符，遇到不同的字符做不同的处理后push到token容器中

function tokenizer(code){
    const tokens = [] // 结果存放
    let current = 0 // 遍历指针（另外一种思路是直接正则）
    while(current<code.length){
        let char = code[current] // 当前的字符
        if(char === '('){
            tokens.push({type:"paren",value:char})
            current++  // 指针前进
            continue
        }
        if(char === ')'){
            tokens.push({type:"paren",value:char})
            current++  // 指针前进
            continue
        }  
        // 空格
        let space = /\s/
        if(space.test(char)){
            current ++
            continue
        }
        // 数字
        let number = /[0-9]/
        if(number.test(char)){
            let value = ''
            while(number.test(char)){ // 这里短暂前进
                value += char
                char = code[++current]
            }
            tokens.push({type:'number',value})
            continue
        }
        // 字符串
        let str = /[a-z]/i
        if(str.test(char)){
            let value = ''
            while(str.test(char)){ // 这里短暂前进
                value += char
                char = code[++current]
            }
            tokens.push({type:'name',value})
            continue
        }
        // 都没有错误处理
        throw `没有匹配到 ${char}`
    }
    return tokens
}

console.log(tokenizer(code))

export default tokenizer