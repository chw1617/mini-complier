// 数组转ast树
const tokens = [                                        
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
// 生成的ast
const ast = {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params:
        [{
          type: 'NumberLiteral',
          value: '2',
        },
        {
          type: 'CallExpression',
          name: 'subtract',
          params: [{
            type: 'NumberLiteral',
            value: '4',
          }, {
            type: 'NumberLiteral',
            value: '2',
          }]
        }]
    }]
  }
  
  
  // 语法分析生成ast
  function parser(tokens){
    let current = 0
    function walk(){ // 辅助函数
        // 取出每一个token,返回新的节点
        let token = tokens[current]
        // 数字类
        if(token.type === 'number'){
            current++ // 进入下一个
            return {
                type:'NumberLiteral',
                value:token.value
            }
        }
        // 函数调用
        if(token.type === 'paren' && token.value === '('){
            // 前进取出函数名
            token = tokens[++current] //函数名
            let node = {
                type:'CallExpression',
                value:token.value,
                params:[]
            }
            // 前进
            token = tokens[++current]
            // 判断是否右括号结束,这里开始递归
            while(
                (token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')
            ){
                node.params.push(walk()) //重新开始递归
                token = tokens[current]
            }
            current++ //跳过右括号
            return node
        }
        throw `err-- ${token.type}`
        // 错误处理
    }
    let ast = { //返回的ast
        type:"Program",
        body:[]
    }
    // 开始遍历
    while(current < tokens.length){
        console.log('current',current)
        ast.body.push(walk()) // 不断的修改current
    }
    return ast
  }
  
  console.log(parser(tokens))

  export default parser