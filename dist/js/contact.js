// Contact form tabs
const contactTabs = document.querySelectorAll('.contact__tab')
const contactPanels = document.querySelectorAll('.contact__panel')
const serviceSteps = document.querySelectorAll('[data-service-step]')

const setServiceStep = (step) => {
  if (!serviceSteps.length) return

  serviceSteps.forEach((serviceStep) => {
    const isActive = serviceStep.dataset.serviceStep === String(step)
    serviceStep.classList.toggle('contact__step--active', isActive)
    serviceStep.hidden = !isActive

    serviceStep.querySelectorAll('input, select, textarea, button').forEach((field) => {
      if (
        field.hasAttribute('data-service-back') ||
        field.hasAttribute('data-service-next') ||
        field.hasAttribute('data-service-submit') ||
        field.hasAttribute('data-service-edit')
      ) {
        return
      }
      field.disabled = !isActive
    })
  })
}

if (contactTabs.length && contactPanels.length) {
  const setPanelState = (panel, isActive) => {
    panel.classList.toggle('contact__panel--active', isActive)
    panel.hidden = !isActive

    panel.querySelectorAll('input, select, textarea').forEach((field) => {
      field.disabled = !isActive
    })

    if (panel.dataset.panel === 'services' && isActive) {
      setServiceStep(1)
    }
  }

  const currentTab = document.querySelector('.contact__tab--active')?.dataset.tab || 'services'

  contactPanels.forEach((panel) => {
    setPanelState(panel, panel.dataset.panel === currentTab)
  })

  contactTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab

      contactTabs.forEach((currentTab) => {
        const isActive = currentTab === tab
        currentTab.classList.toggle('contact__tab--active', isActive)
        currentTab.setAttribute('aria-selected', String(isActive))
      })

      contactPanels.forEach((panel) => {
        setPanelState(panel, panel.dataset.panel === target)
      })
    })
  })
}

const serviceNextButton = document.querySelector('[data-service-next]')
const serviceBackButton = document.querySelector('[data-service-back]')
const serviceSubmitButton = document.querySelector('[data-service-submit]')
const serviceEditButton = document.querySelector('[data-service-edit]')
const resultName = document.querySelector('[data-result-name]')
const resultContact = document.querySelector('[data-result-contact]')
const resultBasicServices = document.querySelector('[data-result-basic-services]')
const resultPremiumServices = document.querySelector('[data-result-premium-services]')
const resultAttendees = document.querySelector('[data-result-attendees]')

const bridalServiceLabelMap = {
  makeup: 'Makeup',
  hairstyle: 'Hairstyle'
}

const premiumLabelMap = {
  'deep-skin-cleansing': 'Deep skin cleansing',
  'bleach-body-hair': 'Bleach body hair',
  hydromassage: 'Hydromassage',
  'hair-moisture': 'Hair Moisture',
  waxing: 'Waxing',
  'foot-and-hand-spa': 'Foot and hand SPA',
  'relaxing-massage': 'Relaxing massage',
  gommage: 'Gommage (body exfoliation and hydration)'
}

const attendeeLabelMap = {
  guest_groom_makeup: 'Groom (Makeup)',
  guest_bridesmaid_hair: 'Bridesmaid (Hairstyle)',
  guest_bridesmaid_makeup: 'Bridesmaid (Makeup)',
  guest_flower_hair: 'Flower girl (Hairstyle)',
  guest_flower_makeup: 'Flower girl (Makeup)'
}

const renderResultList = (targetList, items) => {
  if (!targetList) return
  targetList.innerHTML = ''

  if (!items.length) {
    const empty = document.createElement('li')
    empty.textContent = '- None'
    targetList.appendChild(empty)
    return
  }

  items.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = `- ${item}`
    targetList.appendChild(li)
  })
}

const updateServiceResult = () => {
  const nameValue = document.getElementById('service-name')?.value?.trim()
  const contactValue = document.querySelector('input[name="service_phone"]')?.value?.trim()
  const bridalServiceValue = document.querySelector('input[name="bridal_service"]:checked')?.value

  const premiumValues = [...document.querySelectorAll('input[name="premium[]"]:checked')].map(
    (input) => premiumLabelMap[input.value] || input.value
  )

  const attendeeValues = [...document.querySelectorAll('input[name^="guest_"]:checked')].map(
    (input) => attendeeLabelMap[input.name] || input.name
  )

  if (resultName) {
    resultName.textContent = nameValue || 'Guest'
  }

  if (resultContact) {
    resultContact.textContent = contactValue || 'your contact number'
  }

  renderResultList(
    resultBasicServices,
    bridalServiceValue ? [bridalServiceLabelMap[bridalServiceValue] || bridalServiceValue] : []
  )
  renderResultList(resultPremiumServices, premiumValues)
  renderResultList(resultAttendees, attendeeValues)
}

if (serviceNextButton) {
  serviceNextButton.addEventListener('click', () => {
    setServiceStep(2)
  })
}

if (serviceBackButton) {
  serviceBackButton.addEventListener('click', () => {
    setServiceStep(1)
  })
}

if (serviceSubmitButton) {
  serviceSubmitButton.addEventListener('click', () => {
    updateServiceResult()
    setServiceStep(3)
  })
}

if (serviceEditButton) {
  serviceEditButton.addEventListener('click', () => {
    setServiceStep(2)
  })
}

// Contact form handling
const contactForm = document.getElementById('contact-form')

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    console.log('Form submitted:', data)
    alert('Thank you for your message!')

    contactForm.reset()
  })
}
