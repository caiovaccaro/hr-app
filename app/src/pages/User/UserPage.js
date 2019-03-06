import React from 'react';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import UserComponent from "../../components/User";
import ButtonComponent from '../../components/ui/Button';
import Template from "../../components/ui/Template";
import NotificationSystem from 'react-notification-system';

@inject("store", "actions")
@observer
class UserPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			name: '',
			email: '',
			admission_date: '',
			job_title: '',
			picture: '',
			userCreated: false,
			comments: [],
			originalUser: {}
		};

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

	async getComments() {
		const comments = await this.props.actions.getComments(this.props.match.params.id);

		this.setState({
			comments: comments.comments
		});
	}

	async getData() {
		const user = await this.props.actions.getUser(this.props.match.params.id);
		this.getComments();

		this.setState({
			id: user.id,
			name: user.name,
			email: user.email,
			admission_date: user.admission_date,
			job_title: user.job_title,
			picture: user.photo_url,
			originalUser: user
		});
	}

	async updateUser() {
		const response = await this.props.actions.updateUser(this.state.id, {
			name: this.state.name,
			email: this.state.email,
			admission_date: this.state.admission_date,
			job_title: this.state.job_title,
			photo_url: this.state.picture
		});

		if (response && response.name) {
			console.log("Usuário atualizado.", response);
			this.addNotification('Usuário atualizado com sucesso.', 'success');

			if (this.state.name !== this.state.originalUser.name) {
				this.props.actions.setActivity({
					user: {
						name: this.state.name
					},
					userId: this.state.id,
					userPicture: this.state.picture
				});
			}

			if (this.state.picture !== this.state.originalUser.photo_url) {
				this.props.actions.setActivity({
					user: {
						picture: this.state.picture
					},
					userId: this.state.id,
					userPicture: this.state.picture
				});
			}

			this.getData();
		} else {
			this.addNotification('Não foi possível atualizar o usuário.', 'error');
		}
	}

	async createUser() {
		const response = await this.props.actions.createUser({
			name: this.state.name,
			email: this.state.email,
			admission_date: this.state.admission_date,
			job_title: this.state.job_title,
			photo_url: this.state.picture
		});

		if (response && response.name) {
			console.log("Usuário criado.", response);
			this.addNotification('Usuário criado com sucesso.', 'success');

			setTimeout(() => {
				this.setState({
					userCreated: true
				});
			}, 1500);
		} else {
			this.addNotification('Não foi possível criar o usuário.', 'error');
		}
	}

	async createComment(value) {
		const response = await this.props.actions.createComment({
			user_id: this.state.id,
			value: value
		});

		if (response && response.value) {
			console.log("Comentário criado.", response);
			this.addNotification('Comentário enviado.', 'success');

			this.props.actions.setActivity({
				comment: {
					value: value
				},
				userId: this.state.id,
				userPicture: this.state.picture
			});

			this.getComments();
		} else {
			this.addNotification('Não foi possível criar o comentário.', 'error');
		}
	}

	/**
	 * If there is params.id it is an Edit page,
	 * otherwise a Create page.
	 */
	componentDidMount() {
		if (this.props.match.params.id) {
			this.getData();
		}
	}

	handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	async handleFileInputChange(file) {
		const image = await this.props.actions.uploadImage(file);

		if (image) {
			this.setState({
				picture: image
			});
			this.addNotification('Imagem enviada.', 'success');
		} else {
			this.addNotification('Não foi possível enviar a imagem.', 'error');
		}
	}

	render() {
		return (
			<React.Fragment>
				<NotificationSystem ref={this.notificationSystem} />
				{(this.state.id || !this.props.match.params.id) &&
					<Template
						navigation={
							<Link to={'/'}>
								<ButtonComponent value='Home' />
							</Link>
						}
						main={
							<UserComponent
								id={this.state.id}
								picture={this.state.picture}
								name={this.state.name}
								email={this.state.email}
								admission_date={this.state.admission_date}
								job_title={this.state.job_title}
								comments={this.state.comments}
								handleInputChange={this.handleInputChange.bind(this)}
								handleFileInputChange={this.handleFileInputChange.bind(this)}
								updateUser={this.updateUser.bind(this)}
								createUser={this.createUser.bind(this)}
								createComment={this.createComment.bind(this)}
								addNotification={this.addNotification}
								userCreated={this.state.userCreated}
							/>
						}
					/>
				}
			</React.Fragment>
		);
	}
}

export default UserPage;
