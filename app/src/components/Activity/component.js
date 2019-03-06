import React from 'react';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import './style.css';

@inject("store")
@observer
class ActivityComponent extends React.Component {
	render() {
		return (
			<React.Fragment>
        {this.props.store.activityStore.activities.length > 0 &&
          <React.Fragment>
            <div className={'ActivityComponentTitle'}>Atividades</div>
            <ul>
              {this.props.store.activityStore.activities.map((activity) => {
                return (
                  <li className={'ActivityComponentListItem'}>
										<Link to={'/user/' + activity.id}>
											<p className={'ActivityComponentListItemDate'}>Dia {activity.date}</p>
											<div className={'ActivityComponentListItemPicture'}
												style={{
													backgroundImage: `url(${activity.picture})`
												}}
											/>
											<div
												className={'ActivityComponentListItemContainer'}
												style={{
													height: activity.value ? 'initial' : '63px',
												  display: activity.value ? 'block' : 'flex',
													paddingTop: activity.value ? '15px' : 0
												}}
											>
												<p className={'ActivityComponentListItemName'}>{activity.name}</p>
												{activity.value &&
													<p className={'ActivityComponentListItemValue'}>"{activity.value}"</p>
												}
											</div>
										</Link>
                  </li>
                )
              })}
            </ul>
          </React.Fragment>
        }
			</React.Fragment>
		);
	}
}

export default ActivityComponent;
