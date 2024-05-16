<template>
  <div class="actions">
    <section class="volunteer-actions">
      <router-link to="/agreeToAlert" class="button"
        >Agree to an alert</router-link
      >
    </section>
  </div>
</template>

<style>
.button {
  display: inline-block;
  background-color: #5c67f2;
  margin: 10px;
  border: none;
  padding: 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  line-height: 1.5;
}

.button:hover {
  background-color: #5058e5;
}

.button:active {
  background-color: #4045b2; /* Darker shade when the button is clicked */
}
</style>
