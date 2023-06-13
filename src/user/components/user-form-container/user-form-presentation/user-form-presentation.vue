<template>
  <form id="userform">
    <h3>User form</h3>
    <div class="mb-3">
      <label for="fname">Enter your firstname: </label>
      <input type="text" name="fname" id="fname" />
    </div>
    <div class="mb-3">
      <label for="lname">Enter your lastname: </label>
      <input type="text" name="lname" id="lname" />
    </div>
    <div>
      <label for="submit"></label>
      <button type="submit" id="submit" name="submit" class="btn btn-primary">
        Submit
      </button>
    </div>
  </form>
</template>

<style scoped>
#userform {
  width: 400px;
  margin: auto;
}
</style>
