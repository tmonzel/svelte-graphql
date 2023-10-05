<script>
	import { page } from '$app/stores';
</script>

<header class="bg-light">
	<nav class="container">
		<ul class="nav">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="nav-item">
				<a href="/" class="nav-link">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined} class="nav-item">
				<a href="/about" class="nav-link">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined} class="nav-item">
				<a href="/sverdle" class="nav-link">Sverdle</a>
			</li>
		</ul>
	</nav>
</header>