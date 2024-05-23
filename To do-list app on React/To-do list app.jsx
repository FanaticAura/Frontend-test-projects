// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";

function TasksManager(){

    const [tasks, setTasks] = useState(['Купить продукты', 'Помыть полы', 'Начать новую жизнь']);
    const [newTask, setNewTask] = useState('');

    function handleInputChange(e){
        setNewTask(e.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ''){
            setTasks(t => [...t, newTask]);
            setNewTask('');
        }
    }

    function removeTask(index){
        const update = tasks.filter((_, i) => i !== index);
        setTasks(update);
    }

    function moveTaskUp(index){
        if(index > 0){
            const ascend = [...tasks];
            [ascend[index], ascend[index - 1]] = [ascend[index - 1], ascend[index]];
            setTasks(ascend);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const descend = [...tasks];
            [descend[index], descend[index + 1]] = [descend[index + 1], descend[index]];
            setTasks(descend);
        }
    }

    return(
        <div className="to-do-list">
            <h1>Делай то, что необходимо делать сначала</h1>
            
            <div>
                <input type="text" placeholder="Вот прям точно запиши" value={newTask} onChange={handleInputChange}/>
                <button className="add-button" onClick={addTask}>Добавить✅</button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button className="delete-button" onClick={() => removeTask(index)}>Удалить❌</button>
                    <button className="move-button" onClick={() => moveTaskUp(index)}>Вверх🔼</button>
                    <button className="move-button" onClick={() => moveTaskDown(index)}>Вниз🔽</button>
                </li>)}
            </ol>
        </div>
    )
}

export default TasksManager