<script lang="ts">
  export let data;
</script>

<div class="page-options">
  <a class="btn btn-light mb-3" href="/schemata">
    <div class="d-flex">
      <span class="material-icons me-2">chevron_left</span>
      Schemata
    </div>
  </a>
  <button class="btn btn-primary mb-3">+ Add {data.schema.name}</button>
</div>

<div>
  <h1>{data.schema.name}</h1>
</div>