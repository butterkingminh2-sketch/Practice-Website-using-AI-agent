import { render, screen, fireEvent } from '@testing-library/react'
import Members from '@/components/Members'

describe('Members', () => {
  it('renders 10 member cards', () => {
    render(<Members />)
    expect(screen.getAllByTestId('member-card')).toHaveLength(10)
  })

  it('renders the section heading', () => {
    render(<Members />)
    expect(screen.getByText('Meet all 10 of us')).toBeInTheDocument()
  })

  it('opens modal when a card is clicked', () => {
    render(<Members />)
    fireEvent.click(screen.getByText('M1').closest('[data-testid="member-card"]')!)
    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument()
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
  })

  it('closes modal when backdrop is clicked', () => {
    render(<Members />)
    fireEvent.click(screen.getByText('M1').closest('[data-testid="member-card"]')!)
    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('modal-backdrop'))
    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument()
  })
})
