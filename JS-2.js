var obj = {
  x: 6,
  y: 0,
  foo: function (a,b){
    return this.x * this.y + a + b;
  }
}

function bind(func, ctx, args){
  var extArgs = [].slice.call(arguments,2);
  return function (arg){
    var intArgs = extArgs.concat([].slice.call(arguments,0));
    return func.apply(ctx, intArgs);
  };
}

function add(a){
  obj = {
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
  obj.sum = a;
  return obj;
}

