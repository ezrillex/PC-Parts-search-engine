<script>
  export let name;
  export let store;
  export let url;
  export let price;
  export let pricecash;
  export let pricediscount;

  export let category; // to be changed for keyword
</script>

<div class="card mb-3 w-100 ">
  <div class="card-body">
    <div class="d-flex align-items-center flex-row">
      <div class="ph me-3"></div>
      <div class="flex-fill">
        <h5 class="card-title text-break">{name}</h5>
        <h6 class="card-subtitle text-muted">{store}</h6>

        <div class="card-text d-flex align-items-center ">
          <div class="alert  border-dark m-0 alert-light black-text ">
            {price}
          </div>
          {#if pricecash !== ""}
            <div class="alert ms-3 alert-success m-0">
              Efectivo: {pricecash}
            </div>
          {/if}
          {#if pricediscount !== ""}
            <div class="alert m-0 ms-3 me-3 alert-warning">
              Oferta: {pricediscount}
            </div>
          {/if}
          <a href={url} target="_blank" class="card-link me-3 ms-auto "
            >Ver producto en tienda.</a
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .black-text {
    color: black !important;
  }

  .ph {
    width: 7rem;
    height: 7rem;
    min-width: 7rem;
    min-height: 7rem;
    background-color: silver;
  }
</style>
