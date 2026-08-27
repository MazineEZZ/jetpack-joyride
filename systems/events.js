class EventBus {
  constructor() {
    this.listeners = {};
  }
  on(topic, callback) {
    (this.listeners[topic] ??= []).push(callback);
  }
  off(topic, callback) {
    const list = this.listeners[topic];
    if (!list) return;
    const i = list.indexOf(callback);
    if (i !== -1) list.splice(i, 1);
  }
  emit(event, data) {
    (this.listeners[event] ?? []).forEach((cb) => cb(data));
  }
}

export { EventBus };
