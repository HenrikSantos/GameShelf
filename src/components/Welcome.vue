<template>
  <div class="welcome lg:px-32 xl:px-[25rem]">
    <div class="image-container">
      <p class="welcome-text text-white text-5xl font-semibold p-4">
        Track games you’ve played.<br />
        Save those you want to play.<br />
        Tell your friends what’s good.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-top: 50px;
}

.image-container {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 600px;
  background-image: url('@/assets/rdr2.jpg');
  background-size: cover;
  background-position: center;
}

.image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.welcome-text {
  position: relative;
  z-index: 2;
  font-family: sans;
}

p {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
