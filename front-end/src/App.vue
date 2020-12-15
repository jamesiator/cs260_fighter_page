<template>
  <div id="app">
    <header>
      <router-link to="/">
        <img src="https://cdn.pixabay.com/photo/2014/08/14/11/14/explosion-417894_960_720.png">
        <h1>Battle of the Heroes</h1>
      </router-link>
      <router-link to="/duel">&gt; Duel &lt;</router-link>
    </header>
    <div class="info">
      <router-view/>
    </div>
    <footer>
      <router-link to="/edit"><h3>Edit Fighters</h3></router-link>
      <a href="https://github.com/jamesiator/creative4"><h2>&lt;~ GitHub Repository ~&gt;</h2></a>
      <p>explosion clipart from OpenClipart-Vectors on Pixabay</p>
    </footer>
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  font-family: 'Montserrat';
  padding: 0;
  margin: 0;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Cinzel';
}
header {
  margin-bottom: 20px;
}
header a, footer a {
  font-weight: bold;
  color: #2c3e50;
}
img {
  width: 500px;
}
.info {
  display: block;
}
footer {
  margin-top: 20px;
  padding: 20px;
  background: #b3b3b3;
}
footer * {
  margin: 5px;
}
</style>
