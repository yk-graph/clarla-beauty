import { contactFormHandler } from './modules/contact-form.js'
import { toggleHeaderMenu } from './modules/toggle-header-menu.js'
import { initHeader } from './modules/header.js'

function init() {
  toggleHeaderMenu()
  contactFormHandler()
  initHeader()
}

init()
