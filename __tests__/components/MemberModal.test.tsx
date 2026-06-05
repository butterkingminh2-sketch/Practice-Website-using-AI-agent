// __tests__/components/MemberModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MemberModal from '@/components/MemberModal'
import { Member } from '@/lib/types'

const member: Member = {
  id: 1,
  name: 'Test User',
  initials: 'TU',
  role: 'UI Designer',
  bio: 'A bio about test user.',
  skills: ['Figma', 'React', 'CSS'],
  gradient: 'linear-gradient(135deg, #6C63FF, #a78bfa)',
  github: 'https://github.com/test',
}

describe('MemberModal', () => {
  it('renders nothing when member is null', () => {
    const { container } = render(<MemberModal member={null} onClose={jest.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders member name, role, bio, and skills when open', () => {
    render(<MemberModal member={member} onClose={jest.fn()} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('UI Designer')).toBeInTheDocument()
    expect(screen.getByText('A bio about test user.')).toBeInTheDocument()
    expect(screen.getByText('Figma')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders github link when provided', () => {
    render(<MemberModal member={member} onClose={jest.fn()} />)
    expect(screen.getByText('GitHub ↗')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()
    render(<MemberModal member={member} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn()
    render(<MemberModal member={member} onClose={onClose} />)
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
