function test(n) {
    var params = [];
    for (let i = 0; i < n; ++i) {
        params.push(`a${i}`);
    }
    (0,eval)("function f(" + params.join(",") + "){}");
}
var n = 1;
var a = []; // a[i] == 2**i
for (var i = 0; i < 100; ++i) {
    console.log(n);
    a.push(n);
    try {
        test(n + n);
        n += n;
    } catch (e) {
        console.log(e);
        break;
    }
}
function search(n, i) {
    if (i < 0){
        return n;
    }
    let m;
    try {
        test(n + a[i]);
        m = n + a[i];
    } catch (e) {
        return search(n, i - 1);
    }
    return search(m, i - 1);
}
var result = search(n, a.length - 1);
console.log(`${result} (0x${result.toString(16)})`);
