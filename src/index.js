
import $ from 'jquery'

const preventSubmit = function (form, options = {}) {
  const $form = $(form)
  const config = {
    loadingClass: 'loading',
    disabledClass: 'disabled',
    ...options
  }
  let $btnSubmit = $('button[type="submit"]', $form)

  $form.on('submit', function (e) {
    const formIsSubmit = $form.data('formIsSubmit') || false

    if ($btnSubmit.length > 1) {
      $btnSubmit = $btnSubmit.filter(':focus')
    }

    if (
      formIsSubmit ||
      $btnSubmit.hasClass(config.disabledClass)
    ) {
      e.preventDefault()
      e.stopImmediatePropagation()
      return
    }

    $btnSubmit.addClass(config.loadingClass)

    $form.resetPrevent = function () {
      $form.data('formIsSubmit', false)
      $btnSubmit.removeClass(config.loadingClass)
    }

    $form.data('formPreventSubmit', $form)

    $form.data('formIsSubmit', true)
    $btnSubmit.addClass(config.loadingClass)
  })
}

const resetPrevent = function (forms) {
  $(forms).each(function () {
    const $form = $(this).data('formPreventSubmit')
    if ($form.length) {
      $form.resetPrevent()
    }
  })
}

module.exports = function (forms, options) {
  const $form = $(forms)
  $form.each(function () {
    preventSubmit(this, options)
  })
  $form.resetPrevent = function () {
    return resetPrevent(forms)
  }
  return $form
}
