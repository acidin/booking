import React, {Component} from 'react'
import Datetime from 'react-datetime'

class EventAdd extends Component {

    handleSubmit(e) {
        const title = e.target.value.trim()
        if (e.which === 13) {
            this.props.onSave(title)
        }
    }

    render() {
        return (
            <section>
                <Datetime />
                <Datetime />
                <input
                    type="text"
                    onKeyDown={this.handleSubmit.bind(this)}
                />

            </section>


        )

    }
}

export default EventAdd