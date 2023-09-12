<template>
  <div class="modal-backdrop">
    <div
      class="modal max-w-sm p-6 mx-4 font-['VT323'] font-normal text-[23px] leading-[26px] text-black border-black border-[3px] shadow-[8px_8px_0px_rgba(0,0,0,0.5)]"
      :class="type">
      <div>
        <slot name="header"></slot>
        <button type="button" class="btn-close" @click="close">
          x
        </button>
      </div>
      <div class="text-center text-[25px]">
        <slot name="subtitle">{{ token }}</slot>
      </div>
      <div class="relative max-h-[100px] overflow-y-auto scrollbar-hide">
        <slot v-for="info in ensInfo" name="body">
          <div class="grid grid-cols-2 gap-3 mt-2">
            <div class="text-center px-3">{{info.name}}</div><div class="text-center">{{info.value }}</div>
          </div>
        </slot>
        <!-- <slot v-if="type == 'flagged'" name="body">
          {{ "Hello World" }}
        </slot> -->
      </div>
      <slot name="footer"></slot>
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
</style>

<script>
export default {
  name: 'ENSModal',
  data() {
    return {
      ensInfo: [],
      vrfdInfo: [
        {
          name: "twitter",
          value: "@unknown"
        },
        {
          name: "telegram",
          value: "@unknown"
        },
        {
          name: "tiktok",
          value: "@unknown"
        },
        {
          name: "linkedin",
          value: "@unknown"
        },
        {
          name: "facebook",
          value: "@unknown"
        },
        {
          name: "instagram",
          value: "@unknown"
        },
        {
          name: "google",
          value: "@unknown"
        },
      ],
      flaggedInfo: [
        {
          name: "Type",
          value: "@unknown"
        },
        {
          name: "reported by",
          value: "@unknown,"
        },
        {
          name: "seconded by",
          value: "@unknown,"
        },
        {
          name: "Proof",
          value: "@unknown,"
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
    token: {
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
      var returnVal = [];
      if (this.type === "verified") {
        this.vrfdInfo.map((val, idx) => {
          if (newVal.length === 0) {
            returnVal.push({
              name: val.name,
              value: "@unknown"
            })
          }
          else if ((newVal.findIndex((c, i) => {
            return c.trait_type.toLowerCase() === val.name;
          }))) {
            returnVal.push({
              name: c.trait_type.toLowerCase(),
              value: c.value,
            })
          } else {
            returnVal.push({
              name: val.name,
              value: "@unknown"
            })
          }
        })
        this.ensInfo = returnVal;
      } else if (this.type === "flagged") {
        this.flaggedInfo.map((val, idx) => {
          if (newVal.length === 0) {
            returnVal.push({
              name: val.name,
              value: "@unknown"
            })
          }
          else if ((newVal.findIndex((c, i) => {
            return c.trait_type.toLowerCase() === val.name;
          }))) {
            returnVal.push({
              name: c.trait_type.toLowerCase(),
              value: c.value,
            })
          } else {
            returnVal.push({
              name: val.name,
              value: "@unknown"
            })
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