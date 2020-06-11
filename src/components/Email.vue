<template>
  <div
    class="email-wrapper"
  >
    <div
      class="email"
      @click="toggleEmailBody"
    >
      <svg class="email__icon">
        <use xlink:href="@/assets/svg/svg-symbols.svg#icon_mail_sp"></use>
      </svg>
      <p class="email__from">{{ email.from }}</p>
      <p class="email__to">{{ email.to.join(', ') }}</p>
      <p
        v-if="email.to.length > 2"
        class="email__counter">+{{ email.to.length - 2 }}
      </p>
      <p class="email__subject">{{ email.subject }}</p>
      <article class="email__date">
        <svg
          v-if="email.attachments.length > 0"
          class="email__date__clip"
        >
          <use xlink:href="@/assets/svg/svg-symbols.svg#icon_clip"></use>
        </svg>
        <p class="email__date__text">{{ handleDate }}</p>
      </article>
    </div>
    <p class="email-body" ref="emailBody">{{ email.content }}</p>
    <!-- <div class="email-body">
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: Object,
      required: true,
    },
  },

  computed: {
    handleDate() {
      const emailYear = this.email.receivedTime.getFullYear();
      const emailDate = this.email.receivedTime.getDate();
      const emailMonthNumber = this.email.receivedTime.getMonth();
      const emailMonthString = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.email.receivedTime);
      const emailHours = this.email.receivedTime.getHours();
      const emailMinutes = this.email.receivedTime.getMinutes() < 10 ? `0${this.email.receivedTime.getMinutes()}` : this.email.receivedTime.getMinutes();
      const currentDate = new Date();

      if (currentDate.getFullYear() === emailYear) {
        if (currentDate.getMonth() === emailMonthNumber) {
          if (currentDate.getDate() === emailDate) {
            return `${emailHours}:${emailMinutes}`;
          }
        }
        return `${emailMonthString.substring(0, 3)} ${emailDate < 10 ? `0${emailDate}` : emailDate}`;
      }

      return `${emailYear} ${emailMonthString.substring(0, 3)} ${emailDate < 10 ? `0${emailDate}` : emailDate}`;
    },
  },
  methods: {
    toggleEmailBody() {
      this.$refs.emailBody.classList.toggle('active');
      if (this.$refs.emailBody.style.maxHeight) {
        this.$refs.emailBody.style.maxHeight = null;
        return;
      }
      this.$refs.emailBody.style.maxHeight = `${this.$refs.emailBody.scrollHeight}px`;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "~@/styles/components/Email.styl"
</style>
