<template>
  <div class="bg-offBlack">
    <Header :textColor=textColor />
    <div class="view flex flex-col items-center bg-offBlack h-full justify-center py-[54px]">
      <div class="mb-[70px] md:hidden">
        <input type="text" id="search" name="search" v-model="searchQuery"
          class="bg-offBlack text-offWhite font-normal text-[32px] leading-[36px] drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)] font-['VT323'] text-center placeholder-grey py-[9px] px-[22px] min-w-[620px]"
          :placeholder="shortenAddr('0x0000000000000000000000000000000000000000')" />
      </div>
      <div class="ag-grid lg:w-[800px] w-[1062px] border-[3px] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.25)] border-dashed border-red py-[42px]">
        <ag-grid-vue class="ag-theme-alpine" style="width: 100%; height: 700px" :columnDefs="columnDefs.value"
          :rowData="searchData" :defaultColDef="defaultColDef" :rowHeight="68" :headerHeight="68" :pagination="true"
          :paginationPageSize="8" :rowSelection="rowSelection" @grid-ready="onGridReady"
          @selection-changed="onSelectionChanged">
        </ag-grid-vue>
      </div>
    </div>
    <div class="m_md:hidden flex justify-center pb-[50px]">
      <MobileFooter :textColor=textColor />
    </div>
  </div>
</template>

<script lang="ts">
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import router from "@/router";

import Header from "@/pages/layouts/Header.vue";
import Footer from "@/pages/layouts/Footer.vue";
import MobileFooter from "./layouts/MobileFooter.vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { getAddrsFromStatus } from "@/api";

export default {
  name: "App",
  components: {
    AgGridVue,
    Header,
    Footer,
    MobileFooter
  },
  data() {
    return {
      textColor: "blue",
      footerColor: "white",
      rowSelection: null as string | null,
      gridApi: null as any | null,
      gridColumnApi: null,
    }
  },
  setup() {
    const windowWidth = ref(window.innerWidth);
    const searchQuery = ref("");
    const addressList = reactive({
      value: []
    })
    const rowData = reactive({
      value: [],
    }); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { field: "votes", flex: 1.5 },
        { field: "address", flex: 5.5 },
        { field: "date", flex: 2 },
        { field: "id", flex: 1 },
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      resizable: true,
      flex: 1,
    };

    function handleResize() {
      windowWidth.value = window.innerWidth;
    }

    const deviceWidth = computed(() => windowWidth.value);

    onMounted(async () => {
      window.addEventListener('resize', handleResize);
      try {
        const data = await getAddrsFromStatus("flagged");
        if (data.success) {
          addressList.value = data.addresses.map((item: any) => ({
            address: item.address
          }));

          rowData.value = data.addresses.map((item: any) => ({
            votes: item.votes,
            address: shortenAddr(item.address),
            // ens: item.ens,
            date: item.createdAt,
            id: item.token_id,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    function shortenAddr(addr: string) {
      if (deviceWidth.value <= 1100 && 865 <= deviceWidth.value) {
        if (addr.length < 10) return addr;
        return `${addr.slice(0, 15)}...${addr.slice(addr.length - 15)}`;
      }
      if (deviceWidth.value <= 865) {
        return `${addr.slice(0, 7)}...${addr.slice(addr.length - 7)}`;
      }
      return addr;
    };

    const searchData = computed(() => {
      return rowData.value.filter(
        (data: any) => data.address.indexOf(searchQuery.value) != -1
      );
    });

    return {
      windowWidth,
      columnDefs,
      rowData,
      defaultColDef,
      searchQuery,
      searchData,
      addressList,
      shortenAddr
    };
  },

  created() {
    this.rowSelection = 'single';
  },

  methods: {
    onSelectionChanged() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const index = selectedNodes.map(function(node: any) {
        return node.rowIndex;
      });
      const address: any = this.addressList.value[index]
      console.log("index", address.address)
      // window.open(`/${address.address}`, '_blank');
      this.$router.push({ name: 'address', params: { addr: address.address } });
    },

    onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  }
};
</script>

<style lang="scss">
.ag-theme-alpine {
  --ag-background-color: "black-color";
  --ag-header-foreground-color: #F7766A;
  --ag-header-background-color: "black-color";

  --ag-font-size: 32px;
  --ag-line-height: 36px;
  --ag-font-family: "VT323";

  .ag-root-wrapper {
    border: none;

    .ag-header {
      border: none;

      .ag-header-cell-resize {
        display: none;
      }

      .ag-header-cell {
        text-transform: uppercase;
      }

      .ag-header-cell:not(:first-child) {
        padding: 0;
      }
    }

    .ag-body {
      .ag-cell {
        display: flex;
        align-items: center;
        border: none;
      }

      .ag-cell:first-child {
        color: #F7766A;
      }

      .ag-cell:not(:first-child) {
        color: white;
        padding: 0;
      }

      .ag-row-odd {
        background-color: transparent;
      }

      .ag-row {
        border: none;
      }
    }

    .ag-paging-panel {
      border-top-color: transparent;
      color: white;
      margin-right: 35px;
    }
  }
}

@media screen and (max-width: 865px) {
  .ag-paging-panel {
    display: none;
  }

  .ag-grid {
    width: 366px;
  }

  .ag-theme-alpine {
    height: 623px !important;
  }

  .ag-header-cell:nth-child(1) {
    width: 35% !important;
  }

  .ag-header-cell:nth-child(2) {
    width: 60% !important;
    left: 35% !important;
  }

  .ag-header-cell:nth-child(3) {
    display: none;
  }

  .ag-header-cell:nth-child(4) {
    display: none;
  }

  .ag-cell:nth-child(1) {
    width: 35% !important;
  }

  .ag-cell:nth-child(2) {
    width: 60% !important;
    left: 35% !important;
  }

  .ag-cell:nth-child(3) {
    display: none !important;
  }

  .ag-cell:nth-child(4) {
    display: none !important;
  }
}
</style>
