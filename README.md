
# form-prevent-submit

Prevent multiple submit on form

## Installation

```sh
npm i -S form-prevent-submit
```

## Options

- `disableButton` - (Default `true`) Disable the submit button
- `disabledClass` - (Default `disabled`) Prevent if button has this class
- `loadingClass` - (Default `loading`) Class added on submit on the button

## Usage

```js
import formPreventSubmit from 'form-prevent-submit'

const $form = formPreventSubmit($('form.prevent-submit'), {
  // options ...
})
```

Reset
```js
$form.resetPrevent()
```
