export default class EventEmitter {
  on(event: string, handler: (payload?: any) => void)
  off(event: string, handler: (payload?: any) => void)
  emit(event: string, payload?: any)
}
