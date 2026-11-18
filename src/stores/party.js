import { defineStore } from 'pinia'

const initialCharacters = () => [
  { id: 'teal-hedgehog', name: 'Teal Hedgehog', role: 'Speed', level: 5, maxRings: 80, power: 5, defense: 4, speed: 7, energy: 6, color: '#2bd9c5', icon: '🦔' },
  { id: 'orange-fox', name: 'Orange Fox', role: 'Tech', level: 5, maxRings: 60, power: 6, defense: 3, speed: 6, energy: 7, color: '#ff9800', icon: '🦊' },
  { id: 'red-echidna', name: 'Red Echidna', role: 'Power', level: 5, maxRings: 90, power: 8, defense: 7, speed: 4, energy: 5, color: '#e63b2e', icon: '🥊' },
  { id: 'pink-hedgehog', name: 'Pink Hedgehog', role: 'Balance', level: 5, maxRings: 70, power: 5, defense: 5, speed: 5, energy: 8, color: '#ff5fa2', icon: '🔨' },
]

export const usePartyStore = defineStore('party', {
  state: () => ({
    xpPool: 120,
    upgradeCost: 40,
    characters: initialCharacters(),
    activeId: 'teal-hedgehog',
    recruited: ['teal-hedgehog', 'orange-fox', 'red-echidna', 'pink-hedgehog'],
  }),
  getters: {
    activeCharacter: (state) => state.characters.find((c) => c.id === state.activeId),
    partyMembers: (state) => state.characters.filter((c) => state.recruited.includes(c.id)),
    totalLevel: (state) =>
      state.characters
        .filter((c) => state.recruited.includes(c.id))
        .reduce((sum, c) => sum + c.level, 0),
    totalPower: (state) =>
      state.characters
        .filter((c) => state.recruited.includes(c.id))
        .reduce((sum, c) => sum + c.power, 0),
    totalSpeed: (state) =>
      state.characters
        .filter((c) => state.recruited.includes(c.id))
        .reduce((sum, c) => sum + c.speed, 0),
    totalDefense: (state) =>
      state.characters
        .filter((c) => state.recruited.includes(c.id))
        .reduce((sum, c) => sum + c.defense, 0),
    partyVerdict(state) {
      if (this.partyMembers.length === 0) {
        return { ready: false, text: 'No heroes recruited! Click a hero card to add them to your party.' }
      }
      if (this.totalPower >= 24 && this.totalSpeed >= 22) {
        return { ready: true, text: 'Balanced party ready! High mobility & durability. Ready for the next stage.' }
      }
      if (this.totalPower < 24) {
        return { ready: false, text: 'Low Power! Recruit stronger heroes or upgrade Power to reach 24+.' }
      }
      return { ready: false, text: 'Need more Speed! Upgrade Speed to reach 22+ for stage clearance.' }
    },
  },
  actions: {
    selectCharacter(id) {
      this.activeId = id
    },
    toggleRecruit(id) {
      if (this.recruited.includes(id)) {
        if (this.recruited.length > 1) {
          this.recruited = this.recruited.filter((r) => r !== id)
        }
      } else {
        this.recruited.push(id)
      }
    },
    upgradeStat(stat) {
      if (this.xpPool < this.upgradeCost) return
      const char = this.characters.find((c) => c.id === this.activeId)
      if (!char || char[stat] >= 10) return

      char[stat]++
      this.xpPool -= this.upgradeCost
      char.level++
    },
    resetParty() {
      this.xpPool = 120
      this.characters = initialCharacters()
      this.activeId = 'teal-hedgehog'
      this.recruited = ['teal-hedgehog', 'orange-fox', 'red-echidna', 'pink-hedgehog']
    },
  },
})
