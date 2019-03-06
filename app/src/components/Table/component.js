import React from "react";
import ReactTable from "react-table";
import IconComponent from "../ui/Icon";
import 'react-table/react-table.css';
import './style.css';
import { inject } from "mobx-react";
import { Link } from "react-router-dom";

@inject("actions")
class TableComponent extends React.Component {
  render() {
    return (
      <ReactTable
        data={this.props.data}
        pageSize={10}
        className={'-striped -highlight'}
        columns={[
          {
            Header: "Nome",
            accessor: "name",
            sortable: true,
            filterable: true,
            Cell: ({row, original, value}) => (
              <div>
                <Link to={'/user/' + original.id}>{value}</Link>
              </div>
            )
          },
          {
            Header: "Cargo",
            accessor: "job_title",
            filterable: true,
            sortable: false,
            Cell: ({row, original, value}) => (
              <div>
                <Link to={'/user/' + original.id}>{value}</Link>
              </div>
            )
          },
          {
            Header: "Email",
            accessor: "email",
            filterable: true,
            sortable: false,
            Cell: ({row, original, value}) => (
              <div>
                <Link to={'/user/' + original.id}>{value}</Link>
              </div>
            )
          },
          {
            Header: "Data de admissão",
            accessor: "admission_date",
            sortable: true,
            Cell: ({row, original, value}) => (
              <div style={{
                textAlign: 'center'
              }}>
                <Link to={'/user/' + original.id}>{value}</Link>
              </div>
            )
          },
          {
            Header: "Excluir",
            accessor: "e",
            sortable: false,
            Cell: ({row, original, value}) => {
              return (
                <div className={'TableDeleteIconCell'}>
                  <IconComponent
                    icon='close'
                    onClick={async () => {
                      const response = await this.props.actions.deleteUser(original.id);

                      if (response) {
                        this.props.addNotification('Usuário excluido com sucesso.', 'success');
                      } else {
                        this.props.addNotification('Não foi possível excluir o usuário.', 'error');
                      }
                    }}
                  />
                </div>
              )
            }
          }
        ]}
        previousText={'Anterior'}
        nextText={'Próximo'}
        loadingText={'Carregando...'}
        noDataText={'Nenhum usuário encontrado'}
        pageText={'Página'}
        ofText={'de'}
        rowsText={'linhas'}
        showPageJump={false}
        showPageSizeOptions={false}
        resizable={false}
      />
    );
  }
}

export default TableComponent;
