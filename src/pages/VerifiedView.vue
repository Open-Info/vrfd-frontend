<template>
  <div class="bg-offBlack">
    <Header :textColor=textColor />
    <div class="view flex flex-col items-center bg-offBlack h-full justify-center py-[54px]">
      <div class="mb-[70px] md:hidden">
        <input type="text" id="search" name="search" v-model="searchQuery"
          class="bg-transparent text-offWhite font-normal text-[32px] leading-[36px] font-['Handjet'] text-center placeholder-grey py-[9px] px-[22px] min-w-[620px] rounded-[14px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]"
          :placeholder="shortenAddr('0x0000000000000000000000000000000000000000')" />
      </div>
      <div class="ag-grid lg:w-[800px] w-[1062px] border-[3px] border-dashed border-green py-[42px]">
        <ag-grid-vue class="ag-theme-alpine green" style="width: 100%; height: 700px" :columnDefs="columnDefs.value"
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

import Header from "@/pages/layouts/Header.vue"
import Footer from "@/pages/layouts/Footer.vue"
import WalletConnectionButton from "@/components/WalletConnectionButton.vue";
import MobileFooter from "./layouts/MobileFooter.vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { getAddrsFromStatus } from "@/api";

export default {
  name: "App",
  components: {
    AgGridVue,
    WalletConnectionButton,
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
    const searchQuery = ref("");
    const windowWidth = ref(window.innerWidth);
    const rowData = reactive({
      value: [],
    }); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { field: "votes", flex: 1.5, valueFormatter: (parmas: any) =>  Math.sign(parmas.value) >= 0 ? '+' + Math.abs(parmas.value) : -Math.abs(parmas.valueber)},
        { field: "address", flex: 5.5 },
        // { field: "ens" },
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

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    onMounted(async () => {
      window.addEventListener('resize', handleResize);
      try {
        const data = await getAddrsFromStatus("verified");
        rowData.value = data.addresses.map((item: any) => ({
          votes: item.votes,
          address: shortenAddr(item.address),
          // ens: item.ens,
          date: item.createdAt,
          id: item.token_id,
        }));
      } catch (e) {
        console.log(e);
      }
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
      deviceWidth,
      columnDefs,
      rowData,
      defaultColDef,
      searchQuery,
      searchData,
      shortenAddr
    };
  },

  created() {
    this.rowSelection = 'single';
  },

  methods: {
    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();
      // router.push(`/${selectedRows[0].address}`);
      window.open(`/${selectedRows[0].address}`, '_blank');
    },

    onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  }
};
</script>

<style lang="scss">
.green {
  --ag-header-foreground-color: #00B689 !important;

  .ag-cell:nth-child(1) {
    color: #00B689 !important;
  }
}

.view {
  min-height: calc(100vh - 74px);
}

.ag-theme-alpine {

  --ag-font-size: 32px;
  --ag-line-height: 36px;
  --ag-font-family: "Handjet";

  .ag-root-wrapper {
    border: none;

    .ag-header {
      border: none;

      .ag-header-cell-resize {
        display: none;
      }

      .ag-header-cell {
        text-transform: uppercase;
        // border-right: 1px solid rgb(116, 124, 129);
      }
    }

    .ag-body {
      .ag-cell {
        display: flex;
        align-items: center;
        border: none;
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
</style>