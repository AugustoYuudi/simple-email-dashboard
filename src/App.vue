<template>
  <div id="app" class="inbox">
    <article class="inbox__datefilter-container">
      <DateFilter
        @filterByDate="filterByDate"
      ></DateFilter>
    </article>
    <article class="inbox__emails">
      <p
        class="inbox__emails__counter"
        :class="{'counter-separator': emails.length === 0}"
      >
        Results: {{ emails.length }} mail(s)
      </p>
      <img
        v-if="emails.length === 0"
        class="inbox__emails__logo"
        src="@/assets/logo.png"
        alt="Mail Archiver logo">

      <table v-if="emails.length > 0" class="mailTable">
        <thead class="mailTable__header">
          <tr class="mailTable__header__row">
            <th
              class="mailTable__header__row__item"
              v-for="sort in sortOptions" :key="sort"
              @click="sortEmails(sort)"
            >
              <p class="mailTable__header__row__item__title">{{ sort }}</p>
              <img
                v-show="activeSort.name === sort"
                class="mailTable__header__row__item__arrow-icon"
                :class="{'mailTable__header__row__item__arrow-icon--reverse' : activeSort.order}"
                src="@/assets/icon_arrow01.svg" alt="Sort arrow icon"
              >
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="email in emails" :key="email.id">
            <Email :email=email></Email>
          </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import DateFilter from './components/DateFilter.vue';
import Email from './components/Email.vue';

export default {
  name: 'App',

  components: {
    DateFilter,
    Email,
  },

  mounted() {
    this.fetchEmails();
  },

  data() {
    return {
      date: {
        from: '',
        to: '',
      },
      sortOptions: ['from', 'to', 'subject', 'date'],
      activeSort: {
        name: '',
        order: false, // false = ascending, true = descending
      },
      sortFunctions: {
        from: this.sortByAlphabet,
        to: this.sortByAlphabet,
        subject: this.sortByAlphabet,
        date: this.sortByDate,
      },
    };
  },

  computed: {
    ...mapGetters('emails', ['emails']),
  },

  methods: {
    ...mapMutations('emails', ['setEmails']),
    ...mapActions('emails', ['fetchEmails']),

    sortEmails(sort) {
      if (!this.activeSort.name) {
        this.activeSort.name = sort;
        this.sortFunctions[sort]();
        return;
      }

      if (this.activeSort.name === sort) {
        this.activeSort.order = !this.activeSort.order;
        this.sortFunctions[sort]();
        return;
      }

      this.activeSort.name = sort;
      this.activeSort.order = false;
      this.sortFunctions[sort]();
    },

    sortByAlphabet() {
      const sortedEmails = this.emails.sort((a, b) => {
        if (a[this.activeSort.name] < b[this.activeSort.name]) {
          return -1;
        }

        if (a[this.activeSort.name] > b[this.activeSort.name]) {
          return 1;
        }

        return 0;
      });

      if (!this.activeSort.order) {
        this.setEmails(sortedEmails.reverse());
        return;
      }

      this.setEmails(sortedEmails);
    },

    sortByDate() {
      const sortedEmails = this.emails.sort((a, b) => a.receivedTime - b.receivedTime);

      if (!this.activeSort.order) {
        this.setEmails(sortedEmails.reverse());
        return;
      }

      this.setEmails(sortedEmails);
    },

    filterByDate(date) {
      const from = new Date(date.from);
      from.setDate(from.getDate() + 1);
      const to = new Date(date.to);
      to.setDate(to.getDate() + 1);

      const filteredEmails = this.emails.filter((email) => {
        if (email.receivedTime >= from) {
          if (email.receivedTime <= to) {
            return email;
          }
          if (email.receivedTime.getDate() === to.getDate()) {
            return email;
          }
        }
        return '';
      });

      this.setEmails(filteredEmails);
    },
  },
};
</script>

<style lang="stylus">
@import "~@/styles/components/MailArchiver.styl"
</style>
