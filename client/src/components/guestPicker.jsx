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
  top: 175px;
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
const MinusButton = styled.button`
  border: 1px solid #E8E8E8;
  border-radius: 50%;
  color: #E8E8E8;
  background-color: none;
  background: none;
`;
const PlusButton = styled.button`
  background: none;
  border-radius: 50%;
  border: 1px solid grey;
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
`;
const GuestPicker = (props) => {
  return (
    <ShowGuestPicker isGuestDropdownDisplay={props.isGuestDropdownDisplay}>
      <GuestRow>
        <div>Adults</div>
        <GuestQuantityContainer>
          <MinusButton>-</MinusButton>2<PlusButton>+</PlusButton>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestRow>
        <ChildrenRow>
          <div>Children</div>
          <GuestNote>Ages 2-12</GuestNote>
        </ChildrenRow>
        <GuestQuantityContainer>
          <MinusButton>-</MinusButton>0<PlusButton>+</PlusButton>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestRow>
        <ChildrenRow>
          <div>Infants</div>
          <GuestNote>Under 2</GuestNote>
        </ChildrenRow>
        <GuestQuantityContainer>
          <MinusButton>-</MinusButton>0<PlusButton>+</PlusButton>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestNote>
        Infants don't count <br/>towards number of guests
      </GuestNote>
      <GuestCloseButton onClick={props.displayGuestPickerOnClick}>Close</GuestCloseButton>
    </ShowGuestPicker>
  )
}

export default GuestPicker