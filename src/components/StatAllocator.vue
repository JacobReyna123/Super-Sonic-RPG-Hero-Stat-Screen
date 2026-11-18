<script setup>
import { usePartyStore } from '../stores/party'
const party = usePartyStore()
</script>

<template>
  <section class="panel" v-if="party.activeCharacter">
    <h2 class="panel-title">Upgrade Hero</h2>

    <div class="xp-box">
      <div>XP Left: <span class="gold-text">{{ party.xpPool }}</span></div>
      <div>Level: <span class="gold-text">{{ party.activeCharacter.level }}</span></div>
    </div>

    <div class="stat-list">
      <div v-for="stat in ['power', 'speed', 'defense']" :key="stat" class="stat-block">
        <div class="stat-label-row">
          <span class="stat-name">{{ stat.toUpperCase() }}</span>
          <span class="stat-num">{{ party.activeCharacter[stat] }}/10</span>
        </div>

        <div class="bar-and-btn">
          <div class="segmented-bar">
            <span
              v-for="n in 10"
              :key="n"
              class="segment"
              :class="{ filled: n <= party.activeCharacter[stat] }"
            ></span>
          </div>
          <button
            class="plus-btn"
            @click="party.upgradeStat(stat)"
            :disabled="party.xpPool < party.upgradeCost || party.activeCharacter[stat] >= 10"
          >
            +1
          </button>
        </div>
      </div>
    </div>

    <p class="helper-text">
      Spend XP to upgrade stats. +1 costs {{ party.upgradeCost }} XP.
    </p>

    <div class="active-preview">
      <div class="preview-card">
        <div class="hero-card-header" :style="{ backgroundColor: party.activeCharacter.color }">
          {{ party.activeCharacter.name }}
        </div>
        <div class="preview-body">
          <span class="preview-emoji">{{ party.activeCharacter.icon }}</span>
          <ul class="mini-stats">
            <li>Max Rings: {{ party.activeCharacter.maxRings }}</li>
            <li>Power: {{ party.activeCharacter.power }}</li>
            <li>Defense: {{ party.activeCharacter.defense }}</li>
            <li>Speed: {{ party.activeCharacter.speed }}</li>
            <li>Energy: {{ party.activeCharacter.energy }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
