// __tests__/components/MemberCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MemberCard from '@/components/MemberCard'
import { Member } from '@/lib/types'

const member: Member = {
  id: 1,
  name: 'Test User',
  initials: 'TU',
  role: 'UI Designer',
  bio: 'A test bio.',
  skills: ['Figma', 'React'],
  gradient: 'linear-gradient(135deg, #6C63FF, #a78bfa)',
}

describe('MemberCard', () => {
  it('renders the member name and role', () => {
    render(<MemberCard member={member} onClick={jest.fn()} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('UI Designer')).toBeInTheDocument()
  })

  it('renders initials in the avatar', () => {
    render(<MemberCard member={member} onClick={jest.fn()} />)
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('calls onClick when the card is clicked', () => {
    const onClick = jest.fn()
    render(<MemberCard member={member} onClick={onClick} />)
    fireEvent.click(screen.getByText('TU').closest('div')!.parentElement!)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
