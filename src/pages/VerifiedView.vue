<template>
  <div class="bg-offBlack">
    <Header :textColor=textColor />
    <div class="view flex flex-col items-center bg-offBlack justify-center py-[5px]">
      <div class="mb-[20px] md:hidden">       
         <input type="text" id="search" name="search" v-model="searchQuery"
         class="bg-offBlack text-offWhite font-normal text-[24px] leading-[24px] drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)] font-['VT323'] text-center placeholder-grey py-[8px] px-[15px] min-w-[500px]"
          :placeholder="shortenAddr('0x0000000000000000000000000000000000000000')" />
      </div>
      <div class="ag-grid lg:w-[800px] w-[1062px] border-[3px] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.25)] border-dashed border-green py-[5px]">
        <div class="mb-[20px] hidden md:block p-5">
          <input type="text" id="search" name="search" v-model="searchQuery"
            class="w-full bg-offBlack text-offWhite font-normal text-[20px] leading-[14px] drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)] font-['VT323'] placeholder-grey py-[8px] px-[15px]"
            :placeholder="shortenAddr('0x0000000000000000000000000000000000000000')" />
        </div>
        <ag-grid-vue class="ag-theme-alpine green" style="width: 100%; height: 80vh" :columnDefs="columnDefs.value"
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
import { checkAddress, resolveENS } from '@/api'

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
    const addressList = reactive({
      value: []
    })
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
        console.log(e)
      }
    });

    function shortenAddr(addr: string) {
      if (deviceWidth.value <= 1100 && 865 <= deviceWidth.value) {
        if (addr.length < 10) return addr;
        return `${addr.slice(0, 10)}...${addr.slice(addr.length - 10)}`;
      } 
      if (deviceWidth.value <= 865) {
        return `${addr.slice(0, 6)}...${addr.slice(addr.length - 4)}`;
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
      shortenAddr,
      addressList
    };
  },

  created() {
    this.rowSelection = 'single';
  },

  methods: {
    async onSelectionChanged() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const index = selectedNodes.map(function(node: any) {
        return node.rowIndex;
      });
      const address: any = this.addressList.value[index]
      console.log("index", address.address)
      // window.open(`/${address.address}`, '_blank');

      // Step 2: Resolve ENS link if it is an ENS address
      let addr = address.address
      if (addr.endsWith('.eth')) {
        try {
          const resolvedAddress = await resolveENS(addr)
          if (resolvedAddress && resolvedAddress.success) {
            this.$router.push({ name: 'address', params: { addr: resolvedAddress.address } });
          } else {
            throw new Error('ENS not found!')
          }
        } catch (error: any) {
          console.log(error.message)
          return;
        }
      }else{
        this.$router.push({ name: 'address', params: { addr: address.address } });
      }
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
