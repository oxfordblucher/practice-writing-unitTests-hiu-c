const cartActions = require("../cart.js");

const sampleCart = [
    ['spaghetti', 3],
    ['cereal', 1],
    ['milk', 1],
    ['jell-o', 2]
];

describe("adding items to cart", () => {
    let cart;

    beforeEach(() => {
        cart = new Map(sampleCart);
    })

    test("Positive Case: adding new item(s) to cart", () => {
        cartActions.addItem(cart, 'jasmine rice', 1);
        expect(cart.get('jasmine rice')).toBe(1);
    })

    test("Edge Case: adding more of existing item to cart", () => {
        cartActions.addItem(cart, 'cereal', 1);
        expect(cart.get('cereal')).toBe(2);
    })

    test("Negative Case: adding item with negative quantity", () => {
        cartActions.addItem(cart, 'spaghetti', -2);
        expect(cart.get('spaghetti')).toBe(3);
    })

    test("Edge Case: adding item without quantity", () => {
        cartActions.addItem(cart, 'eggs');
        expect(cart.get('eggs')).toBe(1);
    })
})

describe("removing items from cart", () => {
    let cart;

    beforeEach(() => {
        cart = new Map(sampleCart);
    })

    test("Positive Case: removing existing item from cart", () => {
        cartActions.removeItem(cart, 'jell-o');
        expect(cart.get('jell-o')).toBeUndefined();
    })

    test("Negative Case: removing nonexistent item from cart", () => {
        cartActions.removeItem(cart, 'ice cream');
        expect(cart.get('ice cream')).toBeUndefined();
    })

    test("Edge Case: string case sensitivity", () => {
        cartActions.removeItem(cart, 'JELL-O');
        expect(cart.get('jell-o')).toBeUndefined();
    })

    test("Edge Case: removing last item from cart", () => {
        cartActions.removeItem(cart, 'jell-o');
        cartActions.removeItem(cart, 'spaghetti');
        cartActions.removeItem(cart, 'milk');
        cartActions.removeItem(cart, 'cereal');
        expect(cart.size).toBe(0);
    })
})

describe("get count of items in cart", () => {
    let cart;

    beforeEach(() => {
        cart = new Map(sampleCart);
    })

    test("Positive Case: count existing cart", () => {
        expect(cartActions.getTotalItems(cart)).toBe(7);
    })

    test("Negative Case: no cart parameter", () => {
        expect(cartActions.getTotalItems()).toBe(0);
    })

    test("Edge Case: huge numbers", () => {
        let bigCart = new Map([
            ['milk', 990],
            ['eggs', 1440],
            ['water', 10000],
            ['sprinkles', 999999999]
        ]);
        expect(cartActions.getTotalItems(bigCart)).toBe(1000012429);
    })
})