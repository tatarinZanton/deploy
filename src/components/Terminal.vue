<template>
  <div>
    <!-- v-b-toggle.terminal variant="outline-secondary" -->
    <b-btn variant="outline-secondary" size="sm" class="terminal-button"
              @click="showTerminal = !showTerminal"
               :class="showTerminal ? 'collapsed' : null"
               aria-controls="terminal"
               :aria-expanded="showTerminal ? 'true' : 'false'">
               terminal
    </b-btn>




    <b-collapse id="terminal" v-model="showTerminal">
      <b-card>
        <div class="shell-wrap">
          <p class="shell-top-bar" v-once>{{ serverTerminal }}</p>
          <ul class="shell-body" v-bind:class="{ hiddenTerminal: !showTerminal }">
            <li v-for="item in msg">
              {{ item }}
            </li>
          </ul>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'terminal',
  props: ['msg'],
  data () {
    return {
      serverTerminal: server,
      showTerminal:false
    }
  },
  methods: {
    ...mapActions([
    ]),
    scrollToEnd: function() {
      let container = this.$el.querySelector(".shell-body");
      container.scrollTop = container.scrollHeight;
    },
  },
  computed: {
    ...mapGetters([
      ])
  },
}
</script>

<style scoped>

  .terminal-button {
    background-color: rgba(0,0,0,0.5);
    cursor: pointer;
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 1;
  }

  .shell-wrap {
    margin: auto 0 auto;
    box-shadow: 0 0 30px rgba(0,0,0,0.4);
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .shell-top-bar {
    text-align: center;
    color: #525252;
    padding: 5px 0;
    margin: 0;
    text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
    font-size: 0.85em;
    border: 1px solid #CCCCCC;
    border-bottom: none;

    -webkit-border-top-left-radius: 3px;
    -webkit-border-top-right-radius: 3px;
    -moz-border-radius-topleft: 3px;
    -moz-border-radius-topright: 3px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    background: #f7f7f7; /* Old browsers */
    background: -moz-linear-gradient(top,  #f7f7f7 0%, #B8B8B8 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f7f7f7), color-stop(100%,#B8B8B8)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top,  #f7f7f7 0%,#B8B8B8 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top,  #f7f7f7 0%,#B8B8B8 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top,  #f7f7f7 0%,#B8B8B8 100%); /* IE10+ */
    background: linear-gradient(to bottom,  #f7f7f7 0%,#B8B8B8 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f7f7', endColorstr='#B8B8B8',GradientType=0 ); /* IE6-9 */
  }

  .shell-body {
    height: 30vh;
    overflow: scroll;
    margin: 0;
    padding: 5px;
    list-style: none;
    background: #141414;
    color: #45D40C;
    font: 0.8em 'Andale Mono', Consolas, 'Courier New';
    line-height: 1.6em;

    -webkit-border-bottom-right-radius: 3px;
    -webkit-border-bottom-left-radius: 3px;
    -moz-border-radius-bottomright: 3px;
    -moz-border-radius-bottomleft: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .shell-body li:before {
    content: '$';
    position: absolute;
    left: 0;
    top: 0;
  }

  .shell-body li {
    word-wrap: break-word;
    position: relative;
    padding: 0 0 0 15px;
  }
</style>
