import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'
import CalendarTable from './calendarTable.jsx'
import styled from 'styled-components'

const ShowCalendar = styled.div`
  display: ${props => props.isCalendarDisplay ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  z-index: 1;
  border-radius: 16px;
  box-shadow: lightgrey 0px 6px 16px;
  border: 1px solid lightgrey;
  background-color: white;
  top: 50px;
  left: 0;
  font-size: 12px;
  width: 600px;
  margin-left: -85%;
  padding: 16px 0px 16px;
  cursor: default;
`;
const CalendarHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`;
const HeaderCalendar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 20px;
`;
const SelectDates = styled.div`
  font-weight: 600;
  font-size: 20px;
`;
const SelectedDateRange = styled.div`
  font-size: 14px;
  font-weight: 200;
`;
const CalendarBookingContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  border: 1px solid darkgrey;
  border-radius: 12px;
  margin-left: 22%;
`;
const CalendarButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 32px;
`;
const ClearButton = styled.button`
  background-color: none;
  background: none;
  border: none;
  text-decoration: underline;
  padding-right: 15px;
`;
const CloseButton = styled.button`
  color: white;
  background: black;
  border-radius: 8px;
  padding: 5px 10px;
`;

const Calendar = (props) => {
  return (
    <ShowCalendar isCalendarDisplay={props.isCalendarDisplay}>
      <CalendarHead>
        <HeaderCalendar>
          <SelectDates>Select dates</SelectDates>
          <SelectedDateRange>Minimum stay: 2 nights</SelectedDateRange>
        </HeaderCalendar>
        <CalendarBookingContainer>
          <CheckInDate
            checkInValue={props.checkInValue}
            checkInChange={props.checkInChange}
          />
          <CheckOutDate
            checkOutValue={props.checkOutValue}
            checkOutChange={props.checkOutChange}
          />
        </CalendarBookingContainer>
      </CalendarHead>
      <CalendarTable
        updateBookingDates={props.updateBookingDates}
        datesData={props.datesData}
        currentCheckInInput={props.currentCheckInInput}
        currentCheckOutInput={props.currentCheckOutInput}
      />
      <CalendarButtons>
        <ClearButton onClick={props.clearDates}>Clear dates</ClearButton>
        <CloseButton onClick={props.hidePopUps}>Close</CloseButton>
      </CalendarButtons>
      </ShowCalendar>
  )
}

export default Calendar