<script>
  import Result from "./../components/result.svelte";
  import Bar from "./../components/bar.svelte";
  import { Circle } from "svelte-loading-spinners";
  export let params;

  let time;

  async function search() {
    let start_time = performance.now();
    let result = await fetch("https://beta.abarca.dev/api/beta/search?q=" + params.query);
    let finish_time = performance.now();
    time = finish_time - start_time;
    return await result.json();
  }
</script>

{#key params.query}
  {#await search()}
    <div class="d-flex custom-expand justify-content-center align-items-center">
        <Circle color="black"/>
    </div>
  {:then data}
    <div class="d-flex flex-column justify-content-center align-items-center">
      <Bar busqueda={params.query} />
      <p class="text-muted">{data.length} resultados en {time} ms.</p>
      <div class="mt-4 w-50">
        {#each data as result}
          <Result {...result} />
        {/each}
      </div>
    </div>
  {/await}
{/key}



<style>
  .custom-expand {
    width: 100%;
    height: 100vh;
  }
</style>
