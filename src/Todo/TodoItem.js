import React, {useContext} from 'react'
import PropTypes, { object } from 'prop-types'
import Context from '../context'

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem({todo, index, onChange}){
    const {removeToDo} = useContext(Context)
    const classes = []

    if (todo.completed){
        classes.push('done')
    }

    return <li style={styles.li}>
        <span className={classes.join(' ')}>
            <input type='checkbox'
            style = {styles.input}
            checked = {todo.completed}
            onChange={() => onChange(todo.id)}/>
            <strong>{index+1}</strong>
            {todo.title}
        </span>

        <button className='rm' onClick={removeToDo.bind(null, todo.id)}>&times;</button>
        
        </li>
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem