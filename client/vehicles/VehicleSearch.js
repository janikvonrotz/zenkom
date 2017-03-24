import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { VehicleList } from './index'
import { connect } from 'react-redux'
import { insertVehicle, setVehicleFilter, resetListLimit, increaseListLimit,
  setListLimit } from '../actions'

class VehicleSearch extends React.Component {

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(resetListLimit())
    dispatch(setVehicleFilter(''))
  }

  insert(){
    let { dispatch } = this.props
    dispatch(insertVehicle())
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setVehicleFilter(filter.getValue()))
  }

  increaseLimit(){
    let { dispatch } = this.props
    dispatch(increaseListLimit())
  }

  setLimit(limit){
    let { dispatch } = this.props
    dispatch(setListLimit(limit))
  }

  render() {
    let { i18n } = this.props

    return <Card>
      <CardText>

        <TextField
        style={{ float: 'right' }}
        floatingLabelText={ i18n.button.search }
        ref="filter"
        onChange={this.updateFilter.bind(this)} />

        <br /><br />

        <RaisedButton
        onTouchTap={ this.insert.bind(this) }
        label={ i18n.button.add_vehicle }
        primary={true} />

        <br /><br />

        <VehicleList />

        <RaisedButton
        onTouchTap={ this.increaseLimit.bind(this) }
        label={ i18n.button.load_more }
        primary={ true } />
        <p onTouchTap={ this.setLimit.bind(this, 'all') }>{ i18n.button.show_all }</p>

      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(VehicleSearch)
