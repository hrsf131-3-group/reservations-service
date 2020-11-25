import React from 'react'
import styled from 'styled-components'

const ShowGuestPicker = styled.div`
  display: ${(props) => props.isGuestDropdownDisplay ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  z-index: 1;
  border-radius: 4px;
  box-shadow: lightgrey 0px 6px 16px;
  border: 1px solid lightgrey;
  background-color: white;
  width: 250px;
  top: 170px;
  right: 25px;
  font-size: 12px;
  cursor: default;
  padding: 10px;
`;
const GuestRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
`;
const GuestQuantityContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 15px;
  align-items: center;
`;
const ChildrenRow = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;
const GuestNote = styled.div`
  display: flex;
  justify-content: center;
  font-size: 10px;
`;
const Button = styled.button`
  border: 1px solid grey;
  cursor: pointer;
  border-radius: 50%;
  background: none;
  outline: none;
`;
const MinusButtonAdult = styled(Button)`
  border: ${props => {if (props.guestCount.adults === 1) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
`;
const MinusButtonChildren = styled(Button)`
  border: ${props => {if (props.guestCount.children === 0) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
`;
const MinusButtonInfants = styled(Button)`
  border: ${props => {if (props.guestCount.infants === 0) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
`;
const PlusButtonAdult = styled(Button)`
  border: ${props => {if (props.guestCount.adults + props.guestCount.children === props.maxGuestCount) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
`;
const PlusButtonChildren = styled(Button)`
  border: ${props => {if (props.guestCount.adults + props.guestCount.children === props.maxGuestCount) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
`;
const PlusButtonInfants= styled(Button)`
  border: ${props => {if (props.guestCount.infants === 5) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
`;
const GuestCloseButton = styled.button`
  display: flex;
  flex-direction: row-reverse;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: none;
  background: none;
  border: none;
  text-decoration: underline;
  padding-right: 15px;
  outline: none;
  cursor: pointer;
`;
const GuestPicker = (props) => {
  return (
    <ShowGuestPicker isGuestDropdownDisplay={props.isGuestDropdownDisplay}>
      <GuestRow>
        <div>Adults</div>
        <GuestQuantityContainer>
          <MinusButtonAdult name="adults" guestCount={props.guestCount} onClick={props.minusGuest}>-</MinusButtonAdult>{props.guestCount.adults}<PlusButtonAdult name="adults" guestCount={props.guestCount} maxGuestCount={props.maxGuestCount} onClick={props.plusGuest}>+</PlusButtonAdult>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestRow>
        <ChildrenRow>
          <div>Children</div>
          <GuestNote>Ages 2-12</GuestNote>
        </ChildrenRow>
        <GuestQuantityContainer>
          <MinusButtonChildren name="children" guestCount={props.guestCount} onClick={props.minusGuest}>-</MinusButtonChildren>{props.guestCount.children}<PlusButtonChildren name="children" guestCount={props.guestCount} maxGuestCount={props.maxGuestCount} onClick={props.plusGuest}>+</PlusButtonChildren>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestRow>
        <ChildrenRow>
          <div>Infants</div>
          <GuestNote>Under 2</GuestNote>
        </ChildrenRow>
        <GuestQuantityContainer>
          <MinusButtonInfants name="infants" guestCount={props.guestCount} onClick={props.minusGuest}>-</MinusButtonInfants>{props.guestCount.infants}<PlusButtonInfants name="infants" guestCount={props.guestCount} onClick={props.plusGuest}>+</PlusButtonInfants>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestNote>
        {props.maxGuestCount} guests maximum. Infants don't count <br/>towards number of guests
      </GuestNote>
      <GuestCloseButton onClick={props.displayGuestPickerOnClick}>Close</GuestCloseButton>
    </ShowGuestPicker>
  )
}

export default GuestPicker