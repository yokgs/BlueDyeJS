let i = 1, k = 1, d;
module.exports = {
    check(tested, expected) {

        var s = JSON.stringify;
        if (s(tested) !== s(expected)) {
            console.log('\tsample ' + (i++) + ' : unvalid (' + s(tested) + ' != ' + s(expected) + ')');
            //throw new Error('Something is wrong!\n' + s(tested) + ' != ' + s(expected));
        } else {
            console.log('\tsample ' + (i++) + ' : done');
        }
    },
    suite: {
        start(label) {
            console.log("\nStarting : Test " + k + ' (' + label + ')\n');
            d = new Date();
            i = 1;
        },
        complete() {
            console.log("\nTest " + k + " : Done (in " + (new Date() - d) + ' ms)');
            k++;
        }
    }
}
