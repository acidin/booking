import React, {Component} from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'

class EventAdd extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dateFrom:  moment(),
            dateTo: moment()
        }
    };


    handleSubmit = (e) =>{
        const text = e.target.value.trim()
        let dateFrom = this.state.dateFrom
        let dateTo = this.state.dateTo
        if (e.which === 13) {
            this.props.onSave(text, dateFrom, dateTo)
        }
    };


    handleChangeDateFrom = (value) =>  {
        this.setState({dateFrom: value})
    };

    handleChangeDateTo = (value) =>  {
        this.setState({dateTo: value})
    };


    render() {
        return (
            <section>
                <Datetime
                    onChange={this.handleChangeDateFrom}
                />
                <Datetime
                    onChange={this.handleChangeDateTo}
                />
                <input
                    type="text"
                    onKeyDown={this.handleSubmit}
                />

            </section>


        )

    }
}


export default EventAdd