<template class="bg-blue-grey-lighten-5">
  <v-hover v-slot="{ isHovering, props }">
    <v-card
        :class="{ 'on-hover': isHovering }" :elevation="isHovering ? 12 : 3" class="mx-auto "
        style="margin-right:15px;margin-bottom:15px;" v-bind="props"
    >
      <button style="text-decoration: none;" @click="chooseTemplate(t.key);emitClickEvent();">
        <canvas :id="t.key" height="390" width="280"></canvas>
      </button>
    </v-card>
  </v-hover>
</template>

<script>
import {fabric} from 'fabric'
import {useTemplate} from '@/stores/useTemplate'
import {ref} from "vue";

let store;
let canvas;
let id;

export default {
  name: "Template",
  props: ['t'],
  emits: ['emit-click-card', 'get-posters'],
  setup() {
    id = ref(false)
    store = useTemplate()
    return {
      store,
      id
    }
  },
  data: () => {
    return {
      IdUs: false
    }
  },

  computed: {
    posters() {
      return store
    },
  },
  created() {
    store.fetchPosters();
  },

  mounted() {
    let tab = []
    let backB;
    let imgB;
    let boolImg = false;

    canvas = window._canvas = new fabric.StaticCanvas(this.t.key)
    for (let i = 0; i < store.posters.length; i++) {
      if (store.posters[i].key === this.t.key) {
        store.posters[i].data.forEach(element => {
          if (element.key === 'canvasData') {
            for (let j = 0; j < element.data.length; j++) {
              if (element.data[j].key === 'objects') {
                for (let k = 0; k < element.data[j].data.length; k++) {
                  tab.push(element.data[j].data[k])
                }
              }
              if (element.data[j].key === 'background') {
                backB = element.data[j].data
              }
              if (element.data[j].key === 'backgroundImage') {
                boolImg = true;
                imgB = element.data[j].data
                element.data[j].data.scaleX = 0.91
                element.data[j].data.scaleY = 2.1
              }

            }


          }
          let jsonString;
          if (boolImg) {
            jsonString = '{"objects":' + JSON.stringify(tab) + "," + JSON.stringify("background") + ":" + JSON.stringify(backB) + "," +
                JSON.stringify("backgroundImage") + ":" + JSON.stringify(imgB) +
                '}'
            canvas.loadFromJSON(jsonString, canvas.renderAll.bind(canvas), function () {

            })
            canvas.setZoom(0.6)
          } else {
            jsonString = '{"objects":' + JSON.stringify(tab) + "," + JSON.stringify("background") + ":" + JSON.stringify(backB) + '}'
            canvas.loadFromJSON(jsonString, canvas.renderAll.bind(canvas), function () {

            })
            canvas.setZoom(0.6)
          }


        })
      }
    }

  },


  methods: {
    emitClickEvent() {
      this.$emit('emit-click-card')
    },
    chooseTemplate(key) {
      store.setSelectedPoster(store.state, key);
      console.log('store', store.selectedPoster)

    },

  }
}
</script>

<style scoped>

</style>