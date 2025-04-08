<template>
  <div>
    <UCard>
      <template #header>
        <span class="text-3xl font-bold">Not Found</span>
      </template>

      <UAlert
        color="warning"
        title="Heads up!"
        :description="`You are visiting ${$route.params.slug}, seems doesn't exist!`"
        icon="i-lucide-terminal"
      />

      <template #footer>
        <NuxtLink to="/">
          <UButton color="primary" icon="i-lucide-arrow-left" variant="subtle">
            Back To Home Page
          </UButton>
        </NuxtLink>
      </template>
    </UCard>
  </div>
</template>
