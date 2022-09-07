<script>
  import Bar from "./components/bar.svelte";
import Result from "./components/result.svelte";
  import homeStore from "./homeStore";
  import resultStore from "./resultStore";
 

</script>

{#if $homeStore}
  <div class="d-flex custom-expand justify-content-center align-items-center">
    <Bar />
  </div>
{:else}
  <div class="d-flex flex-column justify-content-center align-items-center">
    <Bar />
    <div class="mt-4">
      {#each $resultStore as result}
        <Result {...result} />
      {/each}
      
    
      

    </div>
  </div>
{/if}


<style>
  .custom-expand {
    width: 100%;
    height: 100vh;
  }

  
</style>
