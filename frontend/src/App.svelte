<script>
  import Footer from './footer.svelte';


 
  import Router from "svelte-spa-router"
import Home from "./pages/home.svelte";
import Results from "./pages/results.svelte";

  const routes = {
    '/': Home,
    '/:query': Results,
  }

</script>
<main>
  <Router {routes} ></Router>
</main>
<Footer></Footer>


<style>
	/* levelup.gitconnected.com/how-to-keep-your-footer-at-the-bottom-of-the-page-the-easy-way-20aa3bcd621f */
	main {
		min-height: 100vh;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
</style>