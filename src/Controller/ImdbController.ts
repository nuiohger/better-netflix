const titleSelector = 'img.previewModal--player-titleTreatment-logo'
const buttonParentSelector =
  'div.previewModal--detailsMetadata-left > div > div'
const btnClass = 'bn_imdb_btn'

export default class ImdbController {
  private interval: NodeJS.Timer

  constructor () {
    this.interval = undefined
  }

  init (): void {
    this.interval = setInterval(() => {
      if (ImdbController.addImdbButton()) {
        clearInterval(this.interval)
        this.interval = undefined
      }
    }, 500)
  }

  static addImdbButton (): boolean {
    if (
      !(location.href.includes('?jbv=') || location.href.includes('/title/')) ||
      document.querySelector(`.${btnClass}`)
    ) {
      return false
    }

    const buttonParentElement = document.querySelector(buttonParentSelector)
    if (!buttonParentElement) return false

    const titleElement = document.querySelector(titleSelector)
    if (!titleElement) return false
    const title = encodeURIComponent(titleElement.getAttribute('alt'))

    const button = document.createElement('button')
    button.textContent = 'IMDb'
    button.classList.add(btnClass)
    button.addEventListener('click', () =>
      window.open(`https://www.imdb.com/find?q=${title}`, '_blank')
    )

    buttonParentElement.insertBefore(button, buttonParentElement.firstChild)
    return true
  }
}
