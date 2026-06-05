import { members } from '@/data/members'

describe('members', () => {
  it('contains exactly 10 members', () => {
    expect(members).toHaveLength(10)
  })

  it('each member has all required fields', () => {
    members.forEach((m) => {
      expect(typeof m.id).toBe('number')
      expect(m.name.length).toBeGreaterThan(0)
      expect(m.initials).toHaveLength(2)
      expect(m.role.length).toBeGreaterThan(0)
      expect(m.bio.length).toBeGreaterThan(0)
      expect(m.skills.length).toBeGreaterThan(0)
      expect(m.gradient).toMatch(/linear-gradient/)
    })
  })

  it('all member ids are unique', () => {
    const ids = members.map((m) => m.id)
    expect(new Set(ids).size).toBe(members.length)
  })
})
