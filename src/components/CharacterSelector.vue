<script setup>
import { usePartyStore } from '../stores/party'
const party = usePartyStore()
</script>

<template>
  <section class="panel">
    <h2 class="panel-title">Select Your Hero</h2>
    <div class="hero-grid">
      <div
        v-for="char in party.characters"
        :key="char.id"
        class="hero-card"
        :class="{
          active: party.activeId === char.id,
          recruited: party.recruited.includes(char.id),
        }"
        @click="party.selectCharacter(char.id)"
      >
        <div class="hero-card-header" :style="{ backgroundColor: char.color }">
          {{ char.name }}
        </div>
        <div class="hero-avatar" :style="{ borderColor: char.color }">
          <span class="avatar-emoji">{{ char.icon }}</span>
          <span class="role-badge">{{ char.role }}</span>
        </div>
        <ul class="mini-stats">
          <li>Max Rings: {{ char.maxRings }}</li>
          <li>Power: {{ char.power }}</li>
          <li>Defense: {{ char.defense }}</li>
          <li>Speed: {{ char.speed }}</li>
          <li>Energy: {{ char.energy }}</li>
        </ul>
        <button
          class="recruit-btn"
          :class="{ 'in-party': party.recruited.includes(char.id) }"
          @click.stop="party.toggleRecruit(char.id)"
        >
          {{ party.recruited.includes(char.id) ? '★ IN PARTY' : '+ RECRUIT' }}
        </button>
      </div>
    </div>
  </section>
</template>
