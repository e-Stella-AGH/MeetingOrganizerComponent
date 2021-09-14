import { joinSlots } from './components/callendar/findUnion'

const startSlots = [
  { startDatetime: new Date(2021, 9, 1, 12, 45), duration: 15 },
  { startDatetime: new Date(2021, 9, 1, 13, 0), duration: 15 },
  { startDatetime: new Date(2021, 9, 1, 13, 16), duration: 15 },
  { startDatetime: new Date(2021, 9, 1, 13, 50), duration: 15 },
  { startDatetime: new Date(2021, 9, 2, 12, 50), duration: 15 },
  { startDatetime: new Date(2021, 9, 2, 12, 50), duration: 15 },
  { startDatetime: new Date(2021, 9, 2, 13, 50), duration: 60 },
  { startDatetime: new Date(2021, 9, 2, 14, 0), duration: 30 },
  { startDatetime: new Date(2021, 9, 2, 12, 50), duration: 15 }
]
const endSlots = [
  { startDatetime: new Date(2021, 9, 1, 12, 45), duration: 30 },
  { startDatetime: new Date(2021, 9, 1, 13, 16), duration: 15 },
  { startDatetime: new Date(2021, 9, 1, 13, 50), duration: 15 },
  { startDatetime: new Date(2021, 9, 2, 12, 50), duration: 15 },
  { startDatetime: new Date(2021, 9, 2, 13, 50), duration: 60 }
]

describe('ExampleComponent', () => {
  it('is truthy', () => {
    const result = joinSlots(startSlots)
    expect(result.length).toBe(endSlots.length)
    expect(result).toStrictEqual(endSlots)
  })
})
