// Contact form tabs
const contactTabs = document.querySelectorAll('.contact__tab')
const contactPanels = document.querySelectorAll('.contact__panel')

if (contactTabs.length && contactPanels.length) {
  const setPanelState = (panel, isActive) => {
    panel.classList.toggle('contact__panel--active', isActive)
    panel.hidden = !isActive

    panel.querySelectorAll('input, select, textarea').forEach((field) => {
      field.disabled = !isActive
    })
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
