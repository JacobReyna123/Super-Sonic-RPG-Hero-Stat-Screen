<script setup>
import { usePartyStore } from '../stores/party'
const party = usePartyStore()
</script>

<template>
  <section class="panel overview-panel">
    <h2 class="panel-title">Party Overview</h2>

    <div class="totals-list">
      <div class="total-row">
        <span>Members:</span>
        <span class="gold-text">{{ party.partyMembers.length }}</span>
      </div>
      <div class="total-row">
        <span>Total Level:</span>
        <span class="gold-text">{{ party.totalLevel }}</span>
      </div>
      <div class="total-row">
        <span>Total Power:</span>
        <span class="gold-text">{{ party.totalPower }}</span>
      </div>
      <div class="total-row">
        <span>Total Speed:</span>
        <span class="gold-text">{{ party.totalSpeed }}</span>
      </div>
      <div class="total-row">
        <span>Total Defense:</span>
        <span class="gold-text">{{ party.totalDefense }}</span>
      </div>
    </div>

    <div class="roster-pills">
      <span
        v-for="member in party.partyMembers"
        :key="member.id"
        class="member-pill"
        :style="{ borderColor: member.color }"
      >
        {{ member.icon }} {{ member.name }}
      </span>
    </div>

    <div class="verdict-box" :class="{ ready: party.partyVerdict.ready }">
      <div class="verdict-title">Verdict:</div>
      <p>{{ party.partyVerdict.text }}</p>
    </div>

    <button class="reset-btn" @click="party.resetParty">
      RESET BUILD
    </button>
  </section>
</template>
