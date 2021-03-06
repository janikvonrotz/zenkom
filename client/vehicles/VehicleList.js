import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { Link } from 'react-router'
import { setHeaderTitle, setListSort } from '../actions'

class VehicleList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.vehicles))
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setListSort(null))
  }

  updateSort(sort) {
    let { dispatch } = this.props
    dispatch(setListSort(sort))
  }

  render() {
    let { vehicles, loading, i18n } = this.props

    let headers = [
      'number',
      'status',
      'type'
    ]

    return <div>
      { loading ? <CircularProgress /> : <div style={{ width: 40, height: 40 }} /> }
      <Table>
        <TableHeader>
          <TableRow>
            { headers.map((header) => {
              return <TableHeaderColumn
              onClick={ this.updateSort.bind(this, header)}
              key={ header }>
                { i18n.label[header] }
              </TableHeaderColumn>
            }) }
          </TableRow>
        </TableHeader>
        <TableBody>
          { vehicles.map((vehicle) => {
            return <TableRow key={ vehicle._id }>
              <TableRowColumn><Link to={ `/vehicle/${vehicle._id}/edit` }>
                { vehicle.number }
              </Link></TableRowColumn>
              <TableRowColumn>{ i18n.option[vehicle.status] }</TableRowColumn>
              <TableRowColumn>{ vehicle.type }</TableRowColumn>
            </TableRow>
          }) }
        </TableBody>
        <TableFooter>
          <TableRow>
          { headers.map((header) => {
            return <TableHeaderColumn
            onClick={ this.updateSort.bind(this, header)}
            key={ header }>
              { i18n.label[header] }
            </TableHeaderColumn>
          }) }
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  }
}

export default VehicleList
