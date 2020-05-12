import React, {Component} from "react";
import {withAuth} from "../Auth";
import axios from "axios";
import {Table} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const StorageList = ({storages}) => {
    let arr = [];

    for (let i=0; i<storages.length; i++) {
        arr[i] = <tr key={i}><td>{i+1}</td><td>{storages[i].name}</td><td>{storages[i].adress}</td><td>{storages[i].category}</td></tr>
    }

    return arr;
};


class Storage extends Component {
    state = {
        isFetching: false,
        category: localStorage.getItem('category'),
        list: '',
        add: {
            name: '',
            adress: '',
            category: localStorage.getItem('category')
        },
        deleteItem: '',
    };

    handleChange = event => {
        this.setState({ add: { ...this.state.add, [event.target.name]: event.target.value} });
    };

    handleChangeDel = event => {
        this.setState({ deleteItem: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();

        if(event.target.hasAttribute('data-del')) {
            this.callAPI({"name": this.state.deleteItem}, 'delStorage');
            this.setState({deleteItem: ''});
        } else {
            this.callAPI({"data": this.state.add},'addStorage');
            this.setState({ add: { ...this.state.add, name: '', adress: ''} });
        }
    };

    callAPI = (data, url) => {
        const u =  'http://localhost:3001/storageList/' + url;

        axios.post(u, data)
            .then((response) => {
                console.log(response.data);
                // this.fetchStorageList();
                window.location.reload();
            })
            .catch(error => {
                console.log("Server responded >> ", error);
            });

    };

    fetchStorageList = () => {
        this.setState({...this.state, isFetching: true});

        axios.post('http://localhost:3001/storageList/getStorage', {category: this.state.category})
            .then(resp => this.setState({list: JSON.parse(resp.data),
                isFetching: false}))
            .catch(e => console.log(e));
    };

    componentDidMount() {
        this.fetchStorageList()
    }

    render () {
        return (
            <div className="container-fluid">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <div className="form-group col-md-4">
                            <label htmlFor="name-add">Name</label>
                            <input id="name-add"
                                   name="name"
                                   value={this.state.add.name}
                                   onChange={this.handleChange}
                                   className="form-control"
                                   type="text"
                                   required/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="adress">Address</label>
                            <input id="adress"
                                   name="adress"
                                   value={this.state.add.adress}
                                   onChange={this.handleChange}
                                   className="form-control"
                                   type="text"
                                   required/>
                        </div>
                        <div className="form-group col-md-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={this.state.add.category} onChange={this.handleChange}>
                                <option>{this.state.add.category}</option>
                            </Form.Control>
                        </div>
                        <button className="btn btn-info" type="submit">Add</button>
                    </Form.Row>
                </Form>
                <Table striped bordered hover>
                    <thead><tr><th>№</th><th>Name</th><th>Adress</th><th>Category</th></tr></thead>
                    <tbody>
                        <StorageList storages={this.state.list} />
                    </tbody>
                </Table>
                <Form onSubmit={this.handleSubmit} className="form-delete" data-del>
                    <Form.Row>
                        <div className="form-group col-md-4">
                            <label htmlFor="name-del">Name of storage for delete</label>
                            <input id="name-del"
                                   name="delName"
                                   value={this.state.deleteItem}
                                   onChange={this.handleChangeDel}
                                   className="form-control"
                                   type="text"
                                   autoComplete="off"
                                   required/>
                        </div>
                        <button className="btn btn-outline-danger" type="submit">Delete</button>
                    </Form.Row>
                </Form>
                <p>{this.state.isFetching ? 'Fetching data...' : ''}</p>
            </div>
        )
    }
}

export default withAuth(Storage);
