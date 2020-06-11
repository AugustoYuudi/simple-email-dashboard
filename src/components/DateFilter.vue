<template>
    <article class="date-filter">
      <div class="date-filter__calendar">
        <svg
          class="date-filter__calendar__icon"
        >
          <use xlink:href="@/assets/svg/svg-symbols.svg#icon_calender"></use>
        </svg>
        <input
          class="date-filter__calendar__datepicker"
          type="date" name="from" v-model="date.from">
        -
        <input
          class="date-filter__calendar__datepicker"
          type="date" name="to" v-model="date.to">
      </div>
      <button class="date-filter__submit-button" @click="filterByDate">
        <svg
          class="date-filter__submit-button__search-icon"
        >
          <use xlink:href="@/assets/svg/svg-symbols.svg#icon_search"></use>
        </svg>
      </button>
    </article>
</template>

<script>
export default {
  name: 'DateFilter',

  data() {
    return {
      date: {
        from: '2020-01-01',
        to: '2020-01-01',
      },
    };
  },

  methods: {
    filterByDate() {
      this.$emit('filterByDate', this.date);
    },
  },
};
</script>

<style lang="stylus">
@import "~@/styles/components/DateFilter.styl"
</style>
