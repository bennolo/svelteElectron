import { writable } from 'svelte/store'

/* Values aus Headers.svelte  */
export const tournament = writable('')
export const club = writable('')
export const date = writable('')


/* Player Array */
export const players = writable(['none'])
export const storeBtnId = writable('')
export const allValuesPlusIndex = writable([3000000000, 99])
