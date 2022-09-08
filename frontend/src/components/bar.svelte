<script>
    import {push } from "svelte-spa-router"
    
  export let busqueda = "";

    async function doSearch() {
        push("/" + busqueda);
        return;
    }

    function doSearchEnter(args) {
        if(args.key !== "Enter") return;
        doSearch();
    }

  </script>
  
  
    <div class="text-center ">
      <a href="#/" class="display-1">sivar.computer</a>
      <div class="input-group input-group-lg d-flex mt-4">
        <input type="text" class="fs-1 form-control border-black" on:keypress="{doSearchEnter}" bind:value={busqueda} />
        <button class="p-3 btn border-black " on:click="{doSearch}"
          >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 490.4 490.4"
            style="enable-background:new 0 0 490.4 490.4;"
            xml:space="preserve"
            class=""
          >
            <g>
              <path
                d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
           s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
            M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"
              />
            </g>
          </svg>
        </button>
      </div>

     
    </div>
 
  
  <style>
   a{
    text-decoration: none;
    color: black;
   }

.border-black { border-color: black;}

    svg {
      width: 2rem;
      height: 2rem;
    }
  </style>
  