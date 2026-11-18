<script setup>
import CharacterSelector from './components/CharacterSelector.vue'
import StatAllocator from './components/StatAllocator.vue'
import PartyOverview from './components/PartyOverview.vue'
</script>

<template>
  <div class="arcade-bg">
    <header class="top-banner">
      <span class="star-emblem">✴</span>
      <h1>SUPER RPG: Party Builder</h1>
      <div class="window-icons">
        <span>⚙</span>
        <span>💾</span>
        <span>✖</span>
      </div>
    </header>

    <main class="dashboard-grid">
      <CharacterSelector />
      <StatAllocator />
      <PartyOverview />
    </main>
  </div>
</template>
