// Set structure: {parent, rank, slot}

const slotEndTime = (slot) => new Date(slot.startDatetime.getTime() + slot.duration * 60000)

const slotEndTimeInsideSlotTime = (slot1, slot2) => {
  const endtime1 = slotEndTime(slot1)
  const endtime2 = slotEndTime(slot2)
  const result =
    slot1.startDatetime.getTime() <= endtime2.getTime() &&
    endtime2.getTime() <= endtime1.getTime()
  return result
}

const slotsIntersection = (slot1, slot2) =>
  slotEndTimeInsideSlotTime(slot1, slot2) ||
  slotEndTimeInsideSlotTime(slot2, slot1)

const find = (set) => {
  if (set.parent === undefined) return null
  if (set == set.parent) return set
  const newParent = find(set.parent)
  set.parent = newParent !== null ? newParent : set
  return set.parent
}

const union = (set1, set2) => {
  if (set1 == set2) return

  const [parent1, parent2] = set1.rank < set2.rank ? [set2, set1] : [set1, set2]

  const max = Math.max(
    slotEndTime(parent1.slot).getTime(),
    slotEndTime(parent2.slot).getTime()
  )
  parent1.slot.startDatetime = new Date(
    Math.min(parent1.slot.startDatetime, parent2.slot.startDatetime)
  )
  parent1.slot.duration = (max - parent1.slot.startDatetime.getTime()) / 60000
  parent2.parent = parent1
  if (parent1.rank == parent2.rank) parent1.rank++
}

const newSet = (slot) => {
  const set = { rank: 1, slot: slot }
  set.parent = set
  return set
}

Array.prototype.unique = function () {
  const unique = []
  const result = []
  this.forEach((value, index) => {
    const parsed = JSON.stringify(value.slot)
    if (unique.indexOf(parsed) === -1) {
      unique.push(parsed)
      result.push(value)
    }
  })
  return result
}

const sortByDate = (a, b) => {
  return a.startDatetime.getTime() > b.startDatetime.getTime() ? 1 : -1
}

export const joinSlots = (slots) => {
  const sets = slots.map((slot) => newSet(slot))

  for (let set1 of sets) {
    for (let set2 of sets) {
      let parent1 = find(set1)
      let parent2 = find(set2)

      if (slotsIntersection(parent1.slot, parent2.slot)) union(parent1, parent2)
    }
  }
  return sets
    .map((slot) => find(slot))
    .unique()
    .map((elem) => elem.slot)
    .sort(sortByDate)
}
