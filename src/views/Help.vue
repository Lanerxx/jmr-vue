<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">{{ slide }} HELP</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "teal",
        "teal darken-1",
        "teal darken-2",
        "teal darken-3",
        "teal darken-4"
      ],
      slides: ["帮助信息1", "帮助信息2", "帮助信息3", "帮助信息4", "帮助信息5"]
    };
  }
};
</script>
