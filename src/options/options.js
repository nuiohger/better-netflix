(function () {
  'use strict'

  const volumeMouseWheel = document.getElementById('volumeMouseWheel')
  const hideButtons = {
    zoomIn: document.querySelector('#hide-zoom-in'),
    zoomOut: document.querySelector('#hide-zoom-out'),
    resetZoom: document.querySelector('#hide-reset-zoom'),
    fullZoom: document.querySelector('#hide-full-zoom')
  }
  const defaults = {
    volumeMouseWheel: true,
    hideZoomInButton: false,
    hideZoomOutButton: false,
    hideResetZoomButton: false,
    hideFullZoomButton: false
  }

  function restoreSavedOptions () {
    chrome.storage.sync.get(defaults, setValuesOfAllPreferences)
  }

  function setValuesOfAllPreferences (items) {
    volumeMouseWheel.checked = items.volumeMouseWheel

    hideButtons.zoomIn.checked = items.hideZoomInButton
    hideButtons.zoomOut.checked = items.hideZoomOutButton
    hideButtons.resetZoom.checked = items.hideResetZoomButton
    hideButtons.fullZoom.checked = items.hideFullZoomButton
  }

  function init () {
    initAutoSave()

    document
      .getElementById('reset')
      .addEventListener('click', resetOptions, false)
    document
      .getElementById('modify-ui')
      .addEventListener('click', showUiModificationPopup, false)
  }

  function initAutoSave () {
    volumeMouseWheel.addEventListener(
      'change',
      (event) => save({ volumeMouseWheel: event.target.checked }),
      false
    )

    hideButtons.zoomIn.addEventListener(
      'change',
      (event) => save({ hideZoomInButton: event.target.checked }),
      false
    )
    hideButtons.zoomOut.addEventListener(
      'change',
      (event) => save({ hideZoomOutButton: event.target.checked }),
      false
    )
    hideButtons.resetZoom.addEventListener(
      'change',
      (event) => save({ hideResetZoomButton: event.target.checked }),
      false
    )
    hideButtons.fullZoom.addEventListener(
      'change',
      (event) => save({ hideFullZoomButton: event.target.checked }),
      false
    )
  }

  function resetOptions () {
    setValuesOfAllPreferences(defaults)
    save(defaults)
  }

  function save (obj) {
    chrome.storage.sync.set(obj)
  }

  let uiModificationPopupAdded = false
  function showUiModificationPopup () {
    const popup = document.querySelector('#ui-modification')
    showPopup(popup, uiModificationPopupAdded)
    uiModificationPopupAdded = true
  }

  function showPopup (popup, eventListenerAdded = false) {
    document.querySelector('#options').classList.add('blurred')
    popup.parentElement.classList.remove('hidden')

    if (!eventListenerAdded) {
      popup.querySelector('.close').addEventListener(
        'click',
        () => {
          closePopup(popup.parentElement)
        },
        false
      )

      addEventListener(
        'click',
        (event) => {
          if (event.target.classList.contains('popup-container')) {
            closePopup(event.target)
          }
        },
        false
      )
    }
  }

  function closePopup (popup) {
    document.querySelector('#options').classList.remove('blurred')
    popup.classList.add('hidden')
  }

  window.addEventListener(
    'DOMContentLoaded',
    () => {
      restoreSavedOptions()
      init()
    },
    false
  )
})()
