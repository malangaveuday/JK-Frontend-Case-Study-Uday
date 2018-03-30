import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { storeUsers } from '../../actions'

class Users extends Component {
    state = {
        allUsers: this.props.allUsers,
        showGrid: false,
        sortDirection: 'ASC'
    }

    _columns = [
      { name: 'Firstname', key: 'firstName', sortable: true },
      { name: 'Lastname', key: 'lastName' },
      { name: 'email', key: 'email' },
      { name: 'Gender', key: 'gender' },
      { name: 'Skill', key: 'skill' },
      { name: 'Job Title', key: 'jobTitle' },
      { name: 'Company Name', key: 'companyName' },
      { name: 'University', key: 'university' },
    ];

    componentWillMount() {
        // this.createRows();
        if (this.state.allUsers.length === 0) {
            fetch('https://shielded-headland-24739.herokuapp.com/users')
                .then((resp) => resp.json()) // Transform the data into json
                .then((data) => {
                    // Create and append the li's to the ul
                    console.log('All users', data);
                    const allUsers = data.data;
                    this.props.storeUsers(allUsers)
                    this.setState({ allUsers });
                    let originalRows = this.createRows(allUsers);
                    let rows = originalRows.slice(0);
                    this.state = { originalRows, rows };
                });
        }
    }

    componentDidMount() {
        
    }

    createRows = (allUsers) => {
        let rows = [];
        allUsers.map(user => {
            rows.push({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender: user.gender,
                jobTitle: user.jobTitle,
                companyName: user.companyName,
                university: user.university,
                skill: user.skill
            });
        })
        this._rows = rows;
        this.setState({ showGrid: true })
        return rows;
    };

    rowGetter = (i) => {
        return this._rows[i];
    };

    handleGridSort = (sortColumn) => {
        const sortDirection = this.state.sortDirection || 'ASC';
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                this.setState({ sortDirection: 'DESC' });
                return (a.firstName < b.firstName) ? -1 : 1;
            } else if (sortDirection === 'DESC') {
                this.setState({ sortDirection: 'ASC' });
                return (a.firstName > b.firstName) ? -1 : 1;
            }
        };
        const rows = this.state.rows.sort(comparer);
        this._rows = rows;
        this.setState({ rows, showGrid: true });
    };

    render() {
        console.log('all users in', this.state);
        return (
            <div>
                <label>List of Users</label>
                {
                    this.state.showGrid &&
                    <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        columns={this._columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this._rows.length}
                        minHeight={500}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ userStore }) => {
    return {
        allUsers: userStore.allUsers
    }
}

export default connect(mapStateToProps, { storeUsers })(Users);