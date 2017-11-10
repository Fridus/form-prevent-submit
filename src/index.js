
import $ from 'jquery'

const preventSubmit = function (form, options = {}) {
  const $form = $(form)
  const config = {
    disableButton: true,
    disabledClass: 'disabled',
    loadingClass: 'loading',
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
    if (config.disableButton) {
      $btnSubmit.prop({ disabled: true })
    }

    $form.resetPrevent = function () {
      $form.data('formIsSubmit', false)
      $btnSubmit.removeClass(config.loadingClass)
      $btnSubmit.prop({ disabled: false })
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
