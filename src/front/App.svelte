<script>
	import Router from 'svelte-spa-router';

	import Landing from './Landing.svelte';
	import ContactsHome from './ContactsGUI/ContactsTable.svelte';
	import ContactEdit from './ContactsGUI/ContactEdit.svelte';
	import NotFound from './NotFound.svelte';

	const routes = {
		"/": Landing,
		"/contacts": ContactsHome,
		"/contact/:contactName": ContactEdit,
		"*": NotFound
	};

</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>