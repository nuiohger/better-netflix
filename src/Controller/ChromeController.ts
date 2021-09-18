class ChromeController {
  public getSync (
    obj: Record<string, unknown>,
    func: (items: { [key: string]: never }) => void
  ): void {
    chrome.storage.sync.get(obj, func)
  }
}

export default ChromeController
