import React from 'react';
import TableComponent from '../../components/Table';
import ButtonComponent from '../../components/ui/Button';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import Template from "../../components/ui/Template";
import NotificationSystem from 'react-notification-system';

@inject("store", "actions")
@observer
class ListPage extends React.Component {
	constructor(props) {
		super(props);
		this.notificationSystem = React.createRef();
	}

	addNotification = (message, type) => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: type,
      position: 'tr'
    });
  };

	componentDidMount() {
		this.props.actions.getUsersData();
	}

	render() {
		return (
			<React.Fragment>
				<NotificationSystem ref={this.notificationSystem} />
				<Template
					navigation={
						<Link to={'/user/create'}>
							<ButtonComponent value='Criar' />
						</Link>
					}
					main={
						<div style={{
							clear: 'both'
						}}>
							<TableComponent
								data={this.props.store.userStore.users}
								addNotification={this.addNotification}
							/>
						</div>
					}
				/>
			</React.Fragment>
		);
	}
}

export default ListPage;
