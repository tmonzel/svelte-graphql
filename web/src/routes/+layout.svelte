<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.css';
	import './styles.css';
	import Notification from './Notification.svelte';
</script>

<Notification />

<div class="p-5">
	<main>
		<slot />
	</main>
</div>
