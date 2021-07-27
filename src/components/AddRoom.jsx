import React, {useState} from 'react'

const AddRoom = ({ register }) =>
{
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(1);
    const handleSubAdult = e => {
			e.preventDefault();
			setAdult(adult - 1);
		};
		const handleAddAdult = e => {
			e.preventDefault();
			setAdult(adult + 1);
		};
		const handleSubChild = e => {
			e.preventDefault();
			setChild(child - 1);
		};
		const handleAddChild = e => {
			e.preventDefault();
			setChild(child + 1);
		};
    
    return (
			<div className='room_adult_child'>
				<div className='div'>
					<p>Adult</p>
					<div className='inner_div'>
						<button onClick={handleSubAdult}>-</button>
						<input
							className='number_input'
							type='number'
							{...register("adult", {valueAsNumber: true})}
							name='adult'
							value={adult}
						/>
						<button onClick={handleAddAdult}>+</button>
					</div>
				</div>
				<div className='div'>
					<p>Child</p>
					<div className='inner_div'>
						<button onClick={handleSubChild}>-</button>
						<input
							className='number_input'
							type='number'
							{...register("child", {valueAsNumber: true})}
							name='child'
							value={child}
						/>
						<button onClick={handleAddChild}>+</button>
					</div>
				</div>
			</div>
		);
}

export default AddRoom
