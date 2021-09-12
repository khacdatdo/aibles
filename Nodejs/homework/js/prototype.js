//  Prototype

//  Ex1:
function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype.print = function () {
    console.log(this.name);
}

const rabbit = new Rabbit("Rabbit's name");
rabbit.print();

//  Ex2:
function f() {
    console.log('Hello!');
}

Function.prototype.printAfterOneSecond = function () {
    setTimeout(f, 1000);
}

Function.prototype.printAfterOneSecond()