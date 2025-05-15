<template>
  <header class="menu p-2">
    <nav class="container text-center d-sm-flex justify-content-between align-items-center">
      <RouterLink
        :to="{
          name: 'Home'
        }"
        >
        <img
          src="/src/assets/svg/logoPrincipal.svg"
          alt="Logo Rick and Morty, Link para Home"
        >
      </RouterLink>

      <ul class="d-flex justify-content-center gap-3">
        <li>
          <RouterLink
            :to="{name: 'Sobre'}"
          >
            Sobre
          </RouterLink>
        </li>

        <li>
          <a target="_blank" href="https://wbshop.com/collections/rick-and-morty">
            Loja
          </a>
        </li>

        <li>
          <a target="_blank" href="https://gorickyourself.com/">
            Monte seu personagem
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.menu {
  background-color: var(--ciano);
}

.menu a{
  color: white;
}

.menu a:hover{
  color: var(--amarelo);
  text-decoration: underline;
}

.menu .router-link-active{
  color: var(--amarelo);
}
</style>
