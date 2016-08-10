import React, { Component, PropTypes } from 'react'

import BigCalendar from 'react-big-calendar';

import moment from 'moment';

import '../less/styles.less';
import '../less/prism.less';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class Calendar extends Component {


    handleSelectEvent =(event) => {

        console.log(event)
        this.props.deleteEvent(event.id)
    }

    render() {
        return (
            <div>
                <BigCalendar
                    defaultView='week'
                    events={this.props.events}
                    defaultDate={new Date()}
                    views={['week']}
                    selectable
                    onSelectEvent={this.handleSelectEvent}
                />
            </div>
        )
    }
}

Calendar.propTypes = {
    deleteEvent: PropTypes.func.isRequired
}

export default Calendar


