<template>
  <div class="flex flex-col items-center bg-[#363B3E] h-screen py-[54px]">
    <div class="mb-[44px]">
      <input type="text" id="search" name="search" class="bg-transparent text-[#FFF4F3] font-normal text-[32px] leading-[36px] font-['Handjet'] text-center placeholder-[#747C81] py-[9px] px-[22px] min-w-[620px] rounded-[14px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]"
        placeholder="0x0000000000000000000000000000000000000000" />
    </div>
    <div class="min-w-[1062px] border-[3px] border-dashed border-[#00B689] py-[42px]">
      <table class="w-[100%] py-[50px] font-['Handjet'] text-[32px] leading-[36px]">
        <tr>
          <th class="w-[11%] border-r-[1px] border-[#747C81] font-bold text-[#00B689] py-[16px] pl-[23px] text-left">VOTES</th>
          <th class="w-[62%] border-r-[1px] border-[#747C81] font-bold text-[#00B689] pl-[37px] text-left">ADDRESS</th>
          <th class="w-[16%] border-r-[1px] border-[#747C81] font-bold text-[#00B689] pl-[14px] text-left">DATE</th>
          <th class="w-[11%] font-bold text-[#00B689] pl-[23px] text-left">ID</th>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#00B689] pl-[23px] py-[16px]">+ 18</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[37px]">0x171dF39662f1dDC2844319c156594D659821C722 <span class="text-[#00B689]">✓</span></td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[14px]">2023-02-23</td>
          <td class="font-normal text-white pl-[23px]">1</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#00B689] pl-[23px] py-[16px]">+ 8</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[37px]">0x3446D2d403f5d7F7da10A8386FAB4Cd127994297 <span class="text-[#00B689]">✓</span></td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[14px]">2022-12-21</td>
          <td class="font-normal text-white pl-[23px]">2</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#00B689] pl-[23px] py-[16px]">+ 111k</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[37px]">0xF7F06BEE4A8D19cE9e1A50BA13A28C23A82fC345 <span class="text-[#00B689]">✓</span></td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[14px]">2022-11-11</td>
          <td class="font-normal text-white pl-[23px]">24</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#00B689] pl-[23px] py-[16px]">+ 240</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[37px]">placeholder.eth <span class="text-[#00B689]">✓</span></td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-white pl-[14px]">2021-01-02</td>
          <td class="font-normal text-white pl-[23px]">69</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] pl-[23px] py-[16px]">-</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[37px]">0x0000000000000000000000000000000000000000</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[14px]">-</td>
          <td class="font-normal text-[#747C81] pl-[23px]">-</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] pl-[23px] py-[16px]">-</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[37px]">0x0000000000000000000000000000000000000000</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[14px]">-</td>
          <td class="font-normal text-[#747C81] pl-[23px]">-</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] pl-[23px] py-[16px]">-</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[37px]">0x0000000000000000000000000000000000000000</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[14px]">-</td>
          <td class="font-normal text-[#747C81] pl-[23px]">-</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] pl-[23px] py-[16px]">-</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[37px]">0x0000000000000000000000000000000000000000</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[14px]">-</td>
          <td class="font-normal text-[#747C81] pl-[23px]">-</td>
        </tr>
        <tr>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] pl-[23px] py-[16px]">-</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[37px]">0x0000000000000000000000000000000000000000</td>
          <td class="border-r-[1px] border-[#747C81] font-normal text-[#747C81] text-[#747C81] pl-[14px]">-</td>
          <td class="font-normal text-[#747C81] pl-[23px]">-</td>
        </tr>
      </table>
    </div>
  </div>
</template>