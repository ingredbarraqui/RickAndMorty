<template>
  <footer class="footer p-2">
    <div class="container d-flex gap-3 justify-content-end align-items-center">
      <p class="text-center">
        Siga Rick and Morty, nas redes sociais
      </p>

      <ul class="d-flex gap-3">
        <li>
          <a target="_blank" href="https://www.facebook.com/RickandMorty/">
            <i class="bi bi-facebook"></i>
          </a>
        </li>

        <li>
          <a target="_blank" href="https://x.com/RickandMorty">
            <i class="bi bi-twitter-x"></i>
          </a>
        </li>

        <li>
          <a target="_blank" href="https://www.instagram.com/rickandmorty/">
            <i class="bi bi-instagram"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer{
  background-color: var(--cinza);
  width: 100%;
}

.footer i{
  font-size: 1.2rem;
  color: var(--ciano);
}
</style>
