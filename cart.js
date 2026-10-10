function addItem (cart, item, quantity=1) {
    let theCart = cart ? cart : new Map();
    if (typeof item !== 'string' || typeof quantity !== 'number' || quantity <= 0) return;
    if (theCart.has(item)) { 
        theCart.set(item, cart.get(item) + quantity); 
    } else {
        theCart.set(item, quantity);
    }
}

function removeItem (cart, itemStr) {
    if (!(cart instanceof Map) || typeof itemStr !== 'string') return;
    let item = itemStr.toLowerCase();
    if (cart.has(item)) {
        cart.delete(item);
    } else {
        console.log(`${item} not found in cart.`);
    }
}

function getTotalItems (cart) {
    if (!(cart instanceof Map)) return 0;
    let count = 0;
    for (const [item, quantity] of cart) {
        count += quantity;
    }
    return count;
}

// Export the function
module.exports = {
    addItem,
    removeItem,
    getTotalItems
};