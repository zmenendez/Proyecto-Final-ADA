import React from 'react';
import PropTypes from 'prop-types';
import { useEvents } from '../context/EventsContext';
import EventCard from './EventCard';

export default function EventList({ events }) {
    const { dispatch } = useEvents();

    const handleDelete = id => dispatch({ type: 'DELETE_EVENT', payload: id });
    const handleToggle = id => dispatch({ type: 'TOGGLE_REMINDER', payload: id });

    return (
        <>
            {events.map(event => (
                <EventCard
                    key={event.id}
                    event={event}
                    onDelete={handleDelete}
                    onToggleReminder={handleToggle}
                />
            ))}
        </>
    );
}

EventList.propTypes = {
    events: PropTypes.array.isRequired,
};

