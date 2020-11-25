import React from 'react'
import CheckInDate from './checkInDate.jsx'
import CheckOutDate from './checkOutDate.jsx'
import CalendarTable from './calendarTable.jsx'
import styled from 'styled-components'
import moment from 'moment'

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
  right: -15px;
  font-size: 12px;
  width: 600px;
  padding: 16px 0px 16px;
  cursor: default;
`;
const CalendarHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 25px;
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
  background: none;
  border: none;
  text-decoration: underline;
  padding: 5px 15px 5px;
  outline: none;
  cursor: pointer;
  &: hover {
    background: #f7f7f7;
    border-radius: 12px;
  }
`;
const CloseButton = styled.button`
  color: white;
  background: black;
  border-radius: 8px;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
`;

const Calendar = (props) => {
  return (
    <ShowCalendar isCalendarDisplay={props.isCalendarDisplay}>
      <CalendarHead>
        <HeaderCalendar>
          <div>
            <SelectDates>{props.checkOutValue ? (props.daysSelected > 1 ? `${props.daysSelected} nights` : `${props.daysSelected} night`) : 'Select dates'}</SelectDates>
            <SelectedDateRange>{props.checkOutValue ? `${moment(props.checkInValue).format('MMM D, YYYY')} - ${moment(props.checkOutValue).format('MMM D, YYYY')}`: `Minimum stay: 1 night`}</SelectedDateRange>
          </div>
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