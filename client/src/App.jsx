import React, { Component } from 'react'

import axios from 'axios'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/DeleteRounded'
import TextField from '@material-ui/core/TextField'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			error: false,
			input: '',
			toDoList: []
		}

		this.handleChange = this.handleChange.bind(this)
		this.addToDo = this.addToDo.bind(this)
		this.handleCheck = this.handleCheck.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		this.setState({
			loading: true
		}, () => {
			axios.get('/api/hello')
			.then(res => {
				this.setState({
					loading: false,
					toDoList: res.data.toDoList
				})
			})
			.catch(() => {
				this.setState({
					loading: false,
					error: true
				})
			})
		})
	}

	handleChange(event) {
		this.setState({
			input: event.target.value
		})
	}

	addToDo() {
		const { input } = this.state

		this.setState({
			loading: true,
			input: ''
		}, () => {
			axios.post('/api/add', { toDo: input })
			.then(res => {
				this.setState({
					loading: false,
					toDoList: res.data.toDoList
				})
			})
			.catch(() => {
				this.setState({
					loading: false,
					error: true
				})
			})
		})
	}

	handleCheck(index) {
		this.setState({
			loading: true
		}, () => {
			axios.post('/api/check', { index: index })
			.then(res => {
				this.setState({
					loading: false,
					toDoList: res.data.toDoList
				})
			})
			.catch(() => {
				this.setState({
					loading: false,
					error: true
				})
			})
		})
	}

	handleDelete(index) {
		this.setState({
			loading: true
		}, () => {
			axios.post('/api/delete', { index: index })
			.then(res => {
				this.setState({
					loading: false,
					toDoList: res.data.toDoList
				})
			})
			.catch(() => {
				this.setState({
					loading: false,
					error: true
				})
			})
		})
	}

	render() {
		const { loading, error, input, toDoList } = this.state

		if (loading) return <LinearProgress />

		if (error) return <div>There was an error.</div>

		return (
			<Grid container spacing={24} style={{ textAlign: 'center' }}>
				<Grid item xs={12}>
					<header>
						<h1>DvLyon's Betoni Solutions' Test</h1>
					</header>
				</Grid>
				<Grid item xs={12}>
					<List>
						{toDoList.map((value, index) => {
							return (
								<ListItem
									key={index}
									role={undefined}
									dense
									button
									onClick={() => this.handleCheck(index)}
								>
									<Checkbox
										checked={value.checked}
										tabIndex={-1}
										disableRipple
									/>
									<ListItemText primary={value.toDo} />
									<ListItemSecondaryAction>
										<IconButton aria-label="Comments" onClick={() => this.handleDelete(index)}>
											<CommentIcon />
										</IconButton>
									</ListItemSecondaryAction>
									<ListItemSecondaryAction>
										<IconButton aria-label="Comments" onClick={() => this.handleDelete(index)}>
											<CommentIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)
						})}
					</List>
				</Grid>
				<Grid item xs={12}>
					<TextField
						value={input}
						onChange={this.handleChange}
						margin="normal"
					/>
					{' '}
					<Button variant="outlined" color="primary" onClick={this.addToDo}>
						Add
					</Button>
				</Grid>
			</Grid>
		)
	}
}

export default App