<template>
<!-- https://www.emailjs.com/docs/sdk/installation/ -->
<!-- https://www.npmjs.com/package/fms-form-design -->
<div  id="contact" class="container text-center">
  <form class="contact-form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" name="name">
    <label>Email</label>
    <input type="email" name="email">
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send">
  </form>
</div>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('sdu60622_gmail', 'kt', e.target, 'user_g4K6TLA69bSjmFaphmrbR')
        .then((result) => {
          console.log('SUCCESS!', result.status, result.text)
        }, (error) => {
          console.log('FAILED...', error)
        })
    }
  }
}
</script>
