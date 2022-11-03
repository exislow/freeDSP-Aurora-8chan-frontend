<script>
  import "../app.scss";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import "./styles.css";
</script>

<div class="container">
  <Header />

  <slot />

  <Footer />
</div>

<style>
</style>
