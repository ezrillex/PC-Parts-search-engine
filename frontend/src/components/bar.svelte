<script>
    import searchStore from "../searchStore"
    import homeStore from "../homeStore";
    import resultStore from "../resultStore";
    
    async function doSearch() {

        let result = await fetch("http://localhost:8000/search?q=" + $searchStore);
        result = await result.json();

        $homeStore = false

        $resultStore = []
        $resultStore = $resultStore.concat(result)
        
        //console.log(JSON.stringify( $resultStore))
    }

    function doSearchEnter(args) {
        if(args.key !== "Enter") return;
        doSearch();
    }

  </script>
  
  
    <div class="text-center ">
      <h1 class="display-1">META PC</h1>
      <div class=" d-flex">
        <input type="text" class="fs-1 me-3 " on:keypress="{doSearchEnter}" bind:value={$searchStore} />
        <button class="p-3 " on:click="{doSearch}"
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
   
    svg {
      width: 2rem;
      height: 2rem;
    }
  </style>
  