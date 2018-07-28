const express = require('express')

const app = express()
const port = process.env.PORT || 5000

var bodyParser = require('body-parser')
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
 	extended: true
}))

var toDoList = []

app.get('/api/hello', (req, res) => {
	res.send({ toDoList: toDoList })
})

app.post('/api/add', (req, res) => {
	let toDo = req.body.toDo

	toDoList.push({ toDo: toDo, checked: false })

	res.send({ toDoList: toDoList })
})

app.post('/api/check', (req, res) => {
	let index = req.body.index

	if ((index >= 0) && (index < toDoList.length)) toDoList[index].checked = !toDoList[index].checked

	res.send({ toDoList: toDoList })
})

app.post('/api/delete', (req, res) => {
	let index = req.body.index

	if ((index >= 0) && (index < toDoList.length)) toDoList.splice(index, 1)
	
	res.send({ toDoList: toDoList })
})

app.listen(port, () => console.log(`Listening on port ${port}`))