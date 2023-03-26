// * ----------------------------------------------------------------------------
//  *   Original AST                     |   Transformed AST
//  * ----------------------------------------------------------------------------
//  *   {                                |   {
//  *     type: 'Program',               |     type: 'Program',
//  *     body: [{                       |     body: [{
//  *       type: 'CallExpression',      |       type: 'ExpressionStatement',
//  *       name: 'add',                 |       expression: {
//  *       params: [{                   |         type: 'CallExpression',
//  *         type: 'NumberLiteral',     |         callee: {
//  *         value: '2'                 |           type: 'Identifier',
//  *       }, {                         |           name: 'add'
//  *         type: 'CallExpression',    |         },
//  *         name: 'subtract',          |         arguments: [{
//  *         params: [{                 |           type: 'NumberLiteral',
//  *           type: 'NumberLiteral',   |           value: '2'
//  *           value: '4'               |         }, {
//  *         }, {                       |           type: 'CallExpression',
//  *           type: 'NumberLiteral',   |           callee: {
//  *           value: '2'               |             type: 'Identifier',
//  *         }]                         |             name: 'subtract'
//  *       }]                           |           },
//  *     }]                             |           arguments: [{
//  *   }                                |             type: 'NumberLiteral',
//  *                                    |             value: '4'
//  * ---------------------------------- |           }, {
//  *                                    |             type: 'NumberLiteral',
//  *                                    |             value: '2'
//  *                                    |           }]
//  *  (sorry the other one is longer.)  |         }
//  *                                    |       }
//  *                                    |     }]
//  *                                    |   }
//  * ----------------------------------------------------------------------------

// 辅助函数遍历器
// const visitor = {
//     NumberLiteral:{
//         enter(node,parent){},
//         exit(node,parent){}
//     }
// }
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


// 遍历ast,利用深度优先遍历，借助visitor访问器对象，对于访问到的节点传入节点和父节点
// 遍历器
function traverser(ast,visitor){
    // 访问数组节点
    function traverseArr(arr,parent){
        // 遍历执行
        arr.forEach(child=>{
            traverseNode(child,parent)
        })
    }
    // 访问节点
    function traverseNode(node,parent){
        //取出访问器，执行
        const visit = visitor[node.type]
        // 访问进入
        if(visit && visit.enter){
            visit.enter(node,parent) //这里才是执行 数字，字符，
        }
        //根据不同节点类型进行处理
        switch(node.type){
            // 根节点
            case 'Program':
                traverseArr(node.body,node)
                break
            //函数调用
            case 'CallExpression':
                traverseArr(node.params,node)
                break
            // 数字跳过
            case 'NumberLiteral':
                break;
            // 错误兼容
            default : throw `err--${node.type}`
        }
        //访问退出
        if(visit && visit.exit){
            visit.exit(node,parent)
        }
    }
    // 从根节点开始
    traverseNode(ast,null)
}

// 转换器
function transformer(ast){
    const newast = {
        type:'Program',
        body:[]
    }
    // 通过引用改变新ast
    ast._ctx = newast.body
    // 借助遍历器,传入访问器处理
    traverser(ast,{
        // 数字
         'NumberLiteral':{
            enter(node,parent){
                parent._ctx.push({
                    type:'NumberLiteral',
                    value:node.value
                })
            }
         },

         //函数调用
         'CallExpression':{
            enter(node,parent){
                //生成新ast 
                let expression = {
                    type:'CallExpression',
                    callee:{
                        type:'Identifier',
                        name:node.value
                    },
                    arguments:[]
                }
                // 给子节点引用
                node._ctx = expression.arguments
                // 顶层函数是一个特殊语句，写成表达式ExpressionStatement
                if(parent.type !== 'CallExpression'){
                    expression = {
                        type:'ExpressionStatement',
                        expression
                    }
                }
                // 改变老ast,同步到新ast
                parent._ctx.push(expression)
            }
         }

            
    })
    return newast
}
console.log(transformer(ast))

export default transformer