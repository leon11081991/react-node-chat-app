export default class CommonUtil {
  static getLocalStorage<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    try {
      return value ? (JSON.parse(value) as T) : null
    } catch {
      return null
    }
  }

  static setLocalStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}