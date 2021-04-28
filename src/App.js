import { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const data = [
  {id: '1', name: 'arghun'},
  {id: '2', name: 'sahand'},
  {id: '3', name: 'shahla'}
]


function App() {
  const [characters, updateCharacters] = useState(data);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>
            {(provided) => (
              <ul style={{ listStyle: 'none' }} className='characters' {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map((item, index) => 
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        ref={provided.innerRef}
                        style={{ backgroundColor: 'red', marginBottom: '1rem' }}
                      >
                        {item.name}
                      </li>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
