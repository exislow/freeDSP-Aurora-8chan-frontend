<script>
  import "../app.scss";
  import Header from "./module/Header.svelte";
  import Footer from "./module/Footer.svelte";
  import "./styles.css";
</script>

<div class="container">
  <Header />

  <slot />

  <Footer />
</div>

<style>
</style>
