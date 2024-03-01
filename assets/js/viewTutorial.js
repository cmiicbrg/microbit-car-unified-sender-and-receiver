document.addEventListener('DOMContentLoaded', (ev) => {
  const tutorial = document.getElementsByClassName('view-tutorial')
  Array.from(tutorial).forEach((t) => {
    const tutorialLang = t.href.includes('de') ? 'de' : 'en'
    t.addEventListener('click', (ev) => {
      ev.preventDefault()
      t.href = t.href.replace('html', 'md')
      fetch(t.href)
        .then((response) => response.text()
          .then((text) => {
            const href = `https://makecode.microbit.org/---docs#md:${encodeURIComponent(text)}:blocks:live-${tutorialLang}`
            window.location.href = href
          }))
    })
  })
})

// https://makecode.microbit.org/---docs#md:yyy:blocks:live-de
