import React, { useContext } from 'react';
import { Text, Box, ResponsiveContext } from 'grommet';

const MAX_AMOUNT_EVENTS = 3; //da cambiare

type Props = {
  events: EventInfo[];
  hasPast: boolean;
  notAvailable: boolean; //da cambiare
};

const Events = ({ events, hasPast }: Props) => {
  const size = useContext(ResponsiveContext);
  const isPhone = size === 'small';
  let notAvailable = false;
  return (
    <Box
      gap={isPhone ? 'small' : 'xsmall'}
      pad="none"
      direction="column"
      fill="horizontal"
      margin="none"
    >
      {events
        .sort((a, b) => {
          //DA CAMBIARE
          if (a.eventName < b.eventName) {
            return -1;
          }
          if (a.eventName > b.eventName) {
            return 1;
          }
          return 0;
        })
        .slice(0, isPhone ? 99 : MAX_AMOUNT_EVENTS)
        .map((event) => {
          //da cambiare
          if (event.eventName === 'ALL DAY') {
            notAvailable = true;
          }

          return (
            <Box key={event.id}>
              <Box
                round="xsmall"
                background={
                  hasPast
                    ? 'calendar-past-event-background'
                    : 'calendar-event-background'
                }
                pad={notAvailable ? '47px 2px' : '0.02px 2px'} //da cambiare
              >
                <Text
                  size="small"
                  weight="bold"
                  truncate
                  color={
                    hasPast ? 'calendar-past-event-text' : 'calendar-event-text'
                  }
                  a11yTitle="Event name"
                >
                  {/*da cambiare*/}
                  {notAvailable ? "N/A for all day" : event.eventName}
                </Text>
              </Box>
            </Box>
          );
        })}

      {events.length > MAX_AMOUNT_EVENTS && (
        <Text size="small" truncate weight="bold">
          {`And ${events.length - MAX_AMOUNT_EVENTS} more ...`}
        </Text>
      )}
    </Box>
  );
};

export default Events;
