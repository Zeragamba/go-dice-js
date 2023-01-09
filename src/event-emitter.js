export default class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  _getHandlers(event) {
    return (this.handlers[event] ||= []);
  }

  _setHandlers(event, handlers) {
    this.handlers[event] = handlers;
  }

  on(event, handler) {
    this._getHandlers(event).push(handler);
  }

  off(event, handler) {
    const handlers = this._getHandlers(event).filter((h) => h !== handler);
    this._setHandlers(event, handlers);
  }

  emit(event, payload) {
    this._getHandlers(event).forEach((handler) => handler(payload));
  }
}
