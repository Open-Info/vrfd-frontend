<template>
  <div class="flex flex-col items-center bg-[#363B3E] h-full min-h-screen py-[54px]">
    <div class="mb-[44px]">
      <input
        type="text"
        id="search"
        name="search"
        v-model="searchQuery"
        class="bg-transparent text-[#FFF4F3] font-normal text-[32px] leading-[36px] font-['Handjet'] text-center placeholder-[#747C81] py-[9px] px-[22px] min-w-[620px] rounded-[14px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]"
        placeholder="0x0000000000000000000000000000000000000000"
      />
    </div>
    <div
      class="min-w-[1100px] border-[3px] border-dashed border-[#F7766A] py-[42px]"
    >
      <ag-grid-vue
        class="ag-theme-alpine"
        style="width: 100%; height: 700px"
        :columnDefs="columnDefs.value"
        :rowData="searchData"
        :defaultColDef="defaultColDef"
        :rowHeight="68"
        :headerHeight="68"
        :pagination="true"
        :paginationPageSize="8"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>

<script lang="ts">
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { getAddrsFromStatus } from "@/api";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    const searchQuery = ref("");
    const rowData = reactive({
      value: [],
    }); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
        { field: "votes" },
        { field: "address" },
        { field: "ens" },
        { field: "date" },
        { field: "id" },
      ],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      resizable: true,
      flex: 1,
    };

    onMounted(async () => {
      try {
        const data = await getAddrsFromStatus("flagged");
        rowData.value = data.addresses.map((item: any) => ({
          votes: -item.upvotes,
          address: item.address,
          ens: item.ens,
          date: item.createdAt,
          id: item.token_id,
        }));
      } catch (e) {
        console.log(e);
      }
    });

    const searchData = computed(() => {
      return rowData.value.filter(
        (data: any) => data.address.indexOf(searchQuery.value) != -1
      );
    });

    return {
      columnDefs,
      rowData,
      defaultColDef,
      searchQuery,
      searchData,
    };
  },
};
</script>

<style lang="scss">
.ag-theme-alpine {
  --ag-background-color: #363b3e;
  --ag-header-foreground-color: #F7766A;
  --ag-header-background-color: #363b3e;

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

      .ag-header-cell:nth-child(1) {
        width: 10% !important;
        left: 0 !important;
        padding-left: 14px;
        padding-right: 10px !important;
      }

      .ag-header-cell:nth-child(2) {
        width: 55% !important;
        left: 10% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .ag-header-cell:nth-child(3) {
        width: 15% !important;
        left: 65% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .ag-header-cell:nth-child(4) {
        width: 14% !important;
        left: 80% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .ag-header-cell:nth-child(5) {
        width: 6% !important;
        left: 94% !important;
        padding-left: 0px !important;
      }
    }

    .ag-body {
      .ag-cell {
        display: flex;
        align-items: center;
        border: none;
        // border-right: 1px solid rgb(116, 124, 129);
      }

      .ag-cell:nth-child(1) {
        width: 10% !important;
        left: 0 !important;
        color: #F7766A;
        padding-left: 14px;
        padding-right: 10px !important;
      }

      .ag-cell:nth-child(2) {
        width: 55% !important;
        left: 10% !important;
        color: white;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .ag-cell:nth-child(3) {
        width: 15% !important;
        left: 65% !important;
        color: white;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .ag-cell:nth-child(4) {
        width: 14% !important;
        left: 80% !important;
        color: white;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .ag-cell:nth-child(5) {
        width: 6% !important;
        left: 94% !important;
        color: white;
        padding-left: 0px !important;
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