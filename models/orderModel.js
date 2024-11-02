export default class OrderModel {
    constructor(orderId, orderItemName, orderQTY, orderUnitPrice, orderTotal, date, cusName, cusContact) {
        this._orderId = orderId;
        this._orderItemName = orderItemName;
        this._orderQTY = orderQTY;
        this._orderUnitPrice = orderUnitPrice;
        this._orderTotal = orderTotal;
        this._date = date;
        this._cusName = cusName;
        this._cusContact = cusContact;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get orderItemName() {
        return this._orderItemName;
    }

    set orderItemName(value) {
        this._orderItemName = value;
    }

    get orderQTY() {
        return this._orderQTY;
    }

    set orderQTY(value) {
        this._orderQTY = value;
    }

    get orderUnitPrice() {
        return this._orderUnitPrice;
    }

    set orderUnitPrice(value) {
        this._orderUnitPrice = value;
    }

    get orderTotal() {
        return this._orderTotal;
    }

    set orderTotal(value) {
        this._orderTotal = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get cusName() {
        return this._cusName;
    }

    set cusName(value) {
        this._cusName = value;
    }

    get cusContact() {
        return this._cusContact;
    }

    set cusContact(value) {
        this._cusContact = value;
    }
}