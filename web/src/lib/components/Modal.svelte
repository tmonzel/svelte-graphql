<script>
  import { fade } from "svelte/transition";

  export let open = false;
  export let size = 'md';
</script>

{#if open}
<div class="modal" tabindex="-1" role="dialog" aria-hidden={false}>
    <div class="modal-dialog modal-{size}" role="document">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
  <div class="modal-backdrop show" transition:fade={{ duration: 100 }}></div>
{/if}

<style>
  .modal {
    display: block;
  }
</style>