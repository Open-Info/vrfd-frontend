<template>
  <div class="modal-backdrop">
    <div
      class="modal max-w-sm p-6 mx-4 font-['VT323'] font-normal text-[23px] leading-[26px] text-black border-black border-[3px] shadow-[8px_8px_0px_rgba(0,0,0,0.5)]"
      :class="type">
      <div>
        <button type="button" class="btn-close" @click="close">
          x
        </button>
      </div>
      <div class="text-center text-[25px]">
        <div name="subtitle">{{ ens }}</div>
      </div>
      <div class="relative max-h-[150px] overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div v-for="info in ensInfo" name="body">
          <div class="grid grid-cols-2 gap-3 mt-2">
            <div class="text-center px-3  flex items-center justify-center">{{ info.name }}</div>
            <div class="text-center">{{ info.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  width: 0.5em;
  background-color: transparent;
}

.scrollbar-hide::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.overflow-x-hidden {
  overflow-x: hidden;
}
</style>

<script lang="ts">
export default {
  name: 'ENSModal',
  data() {
    return {
      ensInfo: [],
      vrfdInfo: [
        {
          name: "twitter",
          value: "unknown"
        },
        {
          name: "telegram",
          value: "unknown"
        },
        {
          name: "tiktok",
          value: "unknown"
        },
        {
          name: "linkedin",
          value: "unknown"
        },
        {
          name: "facebook",
          value: "unknown"
        },
        {
          name: "instagram",
          value: "unknown"
        },
        {
          name: "google",
          value: "unknown"
        },
      ],
      flaggedInfo: [
        {
          name: "Type",
          value: "unknown"
        },
        {
          name: "reported by",
          value: "unknown,"
        },
        {
          name: "seconded by",
          value: "unknown,"
        },
        {
          name: "Proof",
          value: "unknown,"
        }
      ],
      flaggedType: [],
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    ens: {
      type: String,
      required: true
    },
    content: {
      type: Array,
      default: [],
      required: true
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  watch: {
    content(newVal, oldVal) {
      console.log("->>>>>>>", newVal);
      var returnVal = [];
      if (this.type === "verified") {
        this.vrfdInfo.map((val, idx) => {
          if (newVal.length === 0) {
            returnVal.push({
              name: val.name,
              value: "unknown"
            })
          }
          else {
            let idx = newVal.findIndex((c, i) => {
              return c.trait_type.toLowerCase() === val.name
            })
            if (idx == -1) {
              returnVal.push({
                name: val.name,
                value: "unknown"
              })
            } else {
              if (val.name === "google") {
                returnVal.push({
                  name: newVal[idx].trait_type.toLowerCase(),
                  value: newVal[idx].value,
                })
              }
              else returnVal.push({
                name: newVal[idx].trait_type.toLowerCase(),
                value: '@' + newVal[idx].value,
              })
            }
          }
        })
        this.ensInfo = returnVal;
      } else if (this.type === "flagged") {
        this.flaggedInfo.map((val, idx) => {
          if (newVal.length === 0) {
            returnVal.push({
              name: val.name,
              value: "unknown"
            })
          }
          else {
            var type = [];
            newVal.map((flgVal, idx) => {
              if (flgVal.value === true) {
                type.push(flgVal.trait_type.toLowerCase())
              }
            })
            let idx = newVal.findIndex((c, i) => {
              return c.trait_type.toLowerCase() === val.name
            })
            if (idx == -1) {
              if (val.name === "Type") {
                if (type.length === 0) {
                  returnVal.push({
                    name: val.name,
                    value: "unknown"
                  })
                } else {
                  returnVal.push({
                    name: val.name,
                    value: type.join(", ")
                  })
                }
              } else {
                returnVal.push({
                  name: val.name,
                  value: "unknown"
                })
              }
            } else {
              if (val.name === "Type") {
                if (type.length === 0) {
                  returnVal.push({
                    name: val.name,
                    value: "unknown"
                  })
                } else {
                  returnVal.push({
                    name: val.name,
                    value: type.join(", ")
                  })
                }
              } else {
                returnVal.push({
                  name: val.name,
                  value: newVal[idx].value
                })
              }
            }
          }
        })
        this.ensInfo = returnVal;
      }
    }
  }
};
</script>

<style>
.flagged {
  background-color: #F7766A;
}

.verified {
  background-color: #00B689;
}
</style>
