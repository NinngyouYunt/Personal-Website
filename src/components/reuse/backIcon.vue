<template>
  <div>
    <router-link to="/" class="back">< Back</router-link>
  </div>
</template>

<script>
export default {
  props: [
    'hoverColor'
  ],
  data () {
    return {
      hoverStyleObject: {
        color: this.hoverColor
      },
      hovered: false
    };
  },
  methods: {
    changeHover: function () {
      console.log(this.hoverColor);
      this.hovered = !this.hovered;
      console.log(this.hovered);
    }
  }
};
</script>

<style scoped>

  .back {
    font-size: 30px;
    text-decoration: none;
    color: #1f2626;
  }
  .back:hover {
    text-decoration: underline;
    color: #D67150;
  }
</style>
