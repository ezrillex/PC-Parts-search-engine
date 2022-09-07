<script>
    export let name;
    export let store;
    export let url;
    export let price;
    export let pricecash;
    export let pricediscount;
</script>

<div class="card mb-3">
    <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{store}</h6>
        <p class="card-text">
            Precio: {price}
            {#if pricecash !== ""}
            Efectivo: {pricecash}
            {/if}
            {#if pricediscount !=="" }
            Descuento: {pricediscount}
            {/if}
        </p>
        <a href="{url}" target="_blank" class="card-link">Ver producto en tienda.</a>
    </div>
</div>
