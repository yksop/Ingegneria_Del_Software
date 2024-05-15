<template>
  <div class="actions">
    <section class="certificator-actions">
      <router-link to="/upgradeDowngrade" class="button"
        >Go to Upgrade/Downgrade</router-link
      >
      <router-link to="/retireAlert" class="button"
        >Retire an Alert</router-link
      >
    </section>
  </div>
</template>

<style>
.certificator-actions {
  display: flex;
  align-items: center;
  padding: 20px;
}
.button {
  display: inline-block;
  padding: 10px;
  margin-right: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
