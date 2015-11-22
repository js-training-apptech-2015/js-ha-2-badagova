function bind(func, ctx, args){
  var extArgs = [].slice.call(arguments,2);
  return function (arg){
    var intArgs = extArgs.concat([].slice.call(arguments,0));
    return func.apply(ctx, intArgs);
  };
};

function add(a){
  var resultObj = {
        sum: 0,
        valueOf: function(){
          return this.sum;
        },
        add: function(a){
          var newObj = new Object();
          newObj = Object.assign(newObj, this)
          newObj.sum += a;
          return newObj;
        }
  };
  resultObj.sum = a;
  return resultObj;
};

function rebind(func, ctx, args){
  var resFunc,
      extArgs = [].slice.call(arguments,2);
  if (func.initFunc === undefined){
    resFunc = function (arg){
      var intArgs = extArgs.concat([].slice.call(arguments,0));
      return func.apply(ctx, intArgs);
    };
    resFunc.initFunc = func;
  } else {
    resFunc = function (arg){
      var intArgs = extArgs.concat([].slice.call(arguments,0));
      return func.initFunc.apply(ctx, intArgs);
    };
    resFunc.initFunc = func.initFunc;
  }
return resFunc;
}; 

var obj = {
    x: 1,
    foo: function (a, b) {
        return this.x + a + b;
    }
};

var acc = add(1).add(2).add(3).add(4),
    acc1 = add(1).add(2),
    acc2 = acc1.add(1).add(2);
alert(acc + 5);
alert(acc1 + 1);
alert(acc2 + 1);

var f1 = obj.foo.bind({x:2},1),
    f2 = bind(obj.foo,{x:2},1),
    f3 = bind(bind(obj.foo,{x:2}),{},1);
alert(f1(5) === f2(5));
alert(f1(5) === f3(5));

var f5 = rebind(obj.foo, {x:2}),
    f4 = rebind(f5,{x:3});
alert(f4(3,1) === f5(3,1));
