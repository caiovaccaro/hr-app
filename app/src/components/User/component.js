import React from "react";
import CommentsComponent from "../Comments";
import ButtonComponent from '../ui/Button';
import InputComponent from '../ui/Input';
import InputGroup from "../ui/InputGroup";
import InputLabel from "../ui/InputLabel";
import { Redirect } from "react-router-dom";
import './style.css';

export default class UserComponent extends React.Component {
  state = {
    imagePreview: ''
  };

  handleFileSelection(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.setState({
        imagePreview: e.target.result,
        file: file
      });
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  render() {
    return (
      <React.Fragment>
        <div className={'UserComponentPictureContainer'}>
          <div
            className={'UserComponentPicture'}
            style={{
              backgroundImage: `url(${
                this.props.picture ? this.props.picture :
                this.state.imagePreview
              })`
            }}
            onClick={() => {
              let input = document.getElementById("fileinput");
              input.click();
            }}
          />
          <input
            type="file"
            id="fileinput"
            style={{ display: "none" }}
            onChange={this.handleFileSelection.bind(this)}
          />
          <ButtonComponent value='Atualizar' onClick={this.props.handleFileInputChange.bind(null, this.state.file)} />
        </div>
        <div className={'UserComponentFormContainer'}>
          <InputGroup>
            <InputLabel label="Nome" />
            <InputComponent
              type={'text'}
              name={'name'}
              placeholder={'Nome'}
              value={this.props.name}
              onChange={this.props.handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel label="Email" />
            <InputComponent
              type={'email'}
              name={'email'}
              placeholder={'Email'}
              value={this.props.email}
              onChange={this.props.handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel label="Data de admissão" />
            <InputComponent
              type={'date'}
              name={'admission_date'}
              placeholder={'Data de admissão'}
              value={this.props.admission_date}
              onChange={this.props.handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel label="Cargo" />
            <InputComponent
              type={'text'}
              name={'job_title'}
              placeholder={'Cargo'}
              value={this.props.job_title}
              onChange={this.props.handleInputChange}
            />
          </InputGroup>
          <div className={'UserComponentFormBottomContainer'}>
            <ButtonComponent
              value={this.props.id ? 'Salvar' : 'Criar'}
              onClick={this.props.id ? this.props.updateUser : this.props.createUser}
              />
            {this.props.userCreated ? (
              <Redirect push to={{
                pathname: "/"
              }} />
            ) : (
              false
            )}
          </div>
        </div>
        {this.props.id &&
          <CommentsComponent
            comments={this.props.comments}
            createComment={this.props.createComment}
          />
        }
      </React.Fragment>
    )
  }
}
