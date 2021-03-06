import NotificationList from './NotificationList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Notifications } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    filter: state.notificationFilter,
    limit: state.listLimit
  }
}
export default connect(mapStateToProps)(createContainer(({ filter, limit }) => {
  let subscription = Meteor.subscribe('notifications.list', filter, limit)
  return {
    notifications: Notifications.find({}, { sort: { created_at: -1 } }).fetch(),
    loading: !subscription.ready(),
  }
}, NotificationList))
