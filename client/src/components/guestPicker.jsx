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
  width: 280px;
  top: 175px;
  right: 25px;
  font-size: 12px;
  cursor: default;
  padding: 10px;
`;
const GuestName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const GuestAges = styled.div`
  font-size: 12px;
`;
const GuestRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;
const GuestQuantityContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 15px 30px;
  grid-template-rows: 30px;
  column-gap: 15px;
  justify-items: center;
  align-items: center;
  align-self: center;
  place-self: center;
  font-size: 16px;
`;
const ChildrenRow = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;
const GuestNote = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  padding: 12px 0 12px 12px;
`;
const Button = styled.button`
  border: 1px solid grey;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 10px;
  border-radius: 100%;
  background: none;
  outline: none;
  font-size: 16px;
  color: grey;
`;
const MinusImage = styled.svg`
  display: block;
  fill: none;
  height: 12px;
  width: 12px;
  stroke: currentcolor;
  stroke-width: 5.33333;
  overflow: visible;
`;
const PlusImage = styled.svg`
  display: block;
  fill: none;
  height: 12px;
  width: 12px;
  stroke: currentcolor;
  stroke-width: 5.33333;
  overflow: visible;
`;
const MinusButtonAdult = styled(Button)`
  border: ${props => {if (props.guestCount.adults === 1) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
  &: hover {
    border: ${props => {if (props.guestCount.adults > 1) {return '1px solid black;'}}};
    color: ${props => {if (props.guestCount.adults > 1) {return 'black;'}}};
    cursor: ${props => {if (props.guestCount.adults === 1) {return 'not-allowed;'}}};
  }
`;
const MinusButtonChildren = styled(Button)`
  border: ${props => {if (props.guestCount.children === 0) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
  &: hover {
    border: ${props => {if (props.guestCount.children > 0) {return '1px solid black;'}}};
    color: ${props => {if (props.guestCount.children > 0) {return 'black;'}}};
    cursor: ${props => {if (props.guestCount.children === 0) {return 'not-allowed;'}}};
  }
`;
const MinusButtonInfants = styled(Button)`
  border: ${props => {if (props.guestCount.infants === 0) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
  &: hover {
    border: ${props => {if (props.guestCount.infants > 0) {return '1px solid black;'}}};
    color: ${props => {if (props.guestCount.infants > 0) {return 'black;'}}};
    cursor: ${props => {if (props.guestCount.infants === 0) {return 'not-allowed;'}}};
  }
`;
const PlusButtonAdults = styled(Button)`
  border: ${props => {if (props.guestCount.adults + props.guestCount.children === props.maxGuestCount) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
  &: hover {
    border: ${props => {if (props.guestCount.adults + props.guestCount.children !== props.maxGuestCount) {return '1px solid black;'}}};
    color: ${props => {if (props.guestCount.adults + props.guestCount.children !== props.maxGuestCount) {return 'black;'}}};
    cursor: ${props => {if (props.guestCount.adults + props.guestCount.children === props.maxGuestCount) {return 'not-allowed;'}}};
  }
`;
const PlusButtonChildren = styled(Button)`
  border: ${props => {if (props.guestCount.adults + props.guestCount.children === props.maxGuestCount) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
  &: hover {
    border: ${props => {if (props.guestCount.adults + props.guestCount.children !== props.maxGuestCount) {return '1px solid black;'}}};
    color: ${props => {if (props.guestCount.adults + props.guestCount.children !== props.maxGuestCount) {return 'black;'}}};
    cursor: ${props => {if (props.guestCount.adults + props.guestCount.children === props.maxGuestCount) {return 'not-allowed;'}}};
  }
`;
const PlusButtonInfants= styled(Button)`
  border: ${props => {if (props.guestCount.infants === 5) {return '1px solid #E8E8E8;'}}}
  color: #E8E8E8;
  &: hover {
    border: ${props => {if (props.guestCount.infants < 5) {return '1px solid black;'}}};
    color: ${props => {if (props.guestCount.infants < 5) {return 'black;'}}};
    cursor: ${props => {if (props.guestCount.infants === 5) {return 'not-allowed;'}}};
  }
`;
const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 12px;
`;
const GuestCloseButton = styled.button`
  display: flex;
  justify-content: flex-end;
  padding: 5px 15px;
  background: none;
  border: none;
  text-decoration: underline;
  outline: none;
  cursor: pointer;
  &: hover {
    background: #f7f7f7;
    border-radius: 12px;
  }
`;
const GuestPicker = (props) => {
  return (
    <ShowGuestPicker isGuestDropdownDisplay={props.isGuestDropdownDisplay}>
      <GuestRow>
        <GuestName>Adults</GuestName>
        <GuestQuantityContainer>
          <MinusButtonAdult name="adults" guestCount={props.guestCount} onClick={props.minusGuest}>
            <MinusImage viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28"/></MinusImage>
            </MinusButtonAdult>{props.guestCount.adults}<PlusButtonAdults name="adults" guestCount={props.guestCount} maxGuestCount={props.maxGuestCount} onClick={props.plusGuest}>
            <PlusImage viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28m-14-14v28"/></PlusImage>
            </PlusButtonAdults>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestRow>
        <ChildrenRow>
          <GuestName>Children</GuestName>
          <GuestAges>Ages 2-12</GuestAges>
        </ChildrenRow>
        <GuestQuantityContainer>
          <MinusButtonChildren name="children" guestCount={props.guestCount} onClick={props.minusGuest}>
            <MinusImage viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28"/></MinusImage>
          </MinusButtonChildren>{props.guestCount.children}<PlusButtonChildren name="children" guestCount={props.guestCount} maxGuestCount={props.maxGuestCount} onClick={props.plusGuest}>
          <PlusImage viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28m-14-14v28"/></PlusImage>
          </PlusButtonChildren>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestRow>
        <ChildrenRow>
          <GuestName>Infants</GuestName>
          <GuestAges>Under 2</GuestAges>
        </ChildrenRow>
        <GuestQuantityContainer>
          <MinusButtonInfants name="infants" guestCount={props.guestCount} onClick={props.minusGuest}>
          <MinusImage viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28"/></MinusImage>
          </MinusButtonInfants>{props.guestCount.infants}<PlusButtonInfants name="infants" guestCount={props.guestCount} onClick={props.plusGuest}>
          <PlusImage viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28m-14-14v28"/></PlusImage>
          </PlusButtonInfants>
        </GuestQuantityContainer>
      </GuestRow>
      <GuestNote>
        {props.maxGuestCount} guests maximum. Infants don't <br/>count towards number of guests
      </GuestNote>
      <CloseButtonContainer>
        <GuestCloseButton onClick={props.displayGuestPickerOnClick}>Close</GuestCloseButton>
      </CloseButtonContainer>
    </ShowGuestPicker>
  )
}

export default GuestPicker