
const taskSchema = require('../model/TaskSchema')

const getTask = async (req, res) => {
        try {
        const tasks = await taskSchema.find();
        //console.log(tasks);
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const setTask = async (req, res) => {
    //console.log("save ");
    const newTask = new taskSchema(req.body);
    try {
        if (newTask.title && newTask.description && newTask.status) {
            await newTask.save()
            res.status(200).json({ msg: "Task Added Succesfully" })
            console.log(newTask.title);
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async (req, res) => {
    
    try {
        const taskId = req.params.id;
        const task = taskSchema.findById(taskId);
        if (task) {
            await taskSchema.deleteOne({ _id: taskId })
            res.status(200).json({ msg: "Task Deleted Succesfully" })
        } else {
            res.status(404).json({ msg: "Task not found..!" })
        }
    } catch (error) {
        console.log("delet method")
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const updateTask = req.body;
        console.log(updateTask);
        const taskId = await taskSchema.findById(req.params.id)
        //const found = taskSchema.some(task=> taskId===parseInt)
        //console.log(taskId);

        if (taskId) {
            await taskSchema.findByIdAndUpdate
                (updateTask._id, { title: updateTask.title, description: updateTask.description, dueDate: updateTask.dueDate, status: updateTask.status })
            res.status(200).json({ msg: "Task Updated Succesfully" })
            console.log(updateTask.description);
        } else {
            console.log("update not found");
            res.status(404).json({ msg: "Task not found..!" })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }



}

module.exports = {
    getTask,
    setTask,
    deleteTask,
    updateTask
}