import React, {useState, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const Room = () => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const [countries, setCountries] = useState(null)
    const [selected, setSelected] = useState('')
	const [rooms, setRooms] = useState([{id:1, adult:1, child:1, ref_id:Math.random()*1000}])
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
    
    const Submit = data => {
            axios.post("http://localhost:8080/room", data);
            console.log(data, rooms);
			reset();
	};

    useEffect(() => {
			axios
				.get("http://localhost:8080/countries")
				.then(res => setCountries(res.data));
	}, []);
    
    const handleChange = (e) =>
    {
        setSelected(e.target.value)
	}

	const AddRoom = (e) =>
	{
		e.preventDefault();
		let no_of_rooms = rooms.length
		setRooms([...rooms, {id:no_of_rooms+1, adult:1, child:1, ref_id:Math.random()*1000}])
	}

	const SubRoom = (roomID, e) =>
	{
		e.preventDefault()
		let newRooms = [...rooms]
		{setRooms(newRooms.filter((room) => room.id !== roomID))}
	}
	

    const handleSubAdult =(roomID, e) =>
	{
		e.preventDefault()
		let newRooms = [...rooms]
		{
			newRooms.map((newRoom) =>
			{
				if (newRoom.id === roomID)
				{
					newRoom.adult = newRoom.adult - 1;
				}
			})
			
		}
		setRooms(newRooms);
    }
	const handleAddAdult = (roomID, e) =>
	{
			e.preventDefault()
			let newRooms = [...rooms];
			{
				newRooms.map(newRoom => {
					if (newRoom.id === roomID) {
						newRoom.adult = newRoom.adult + 1;
					}
				});
		}
		setRooms(newRooms)
	};
	const handleSubChild = (roomID, e) =>
	{
		e.preventDefault()
		let newRooms = [...rooms];
		{
			newRooms.map(newRoom => {
				if (newRoom.id === roomID) {
					newRoom.child = newRoom.child - 1;
				}
			});
		}
		setRooms(newRooms);
	};
	const handleAddChild = (roomID, e) =>
	{
		e.preventDefault()
		let newRooms = [...rooms];
		
			newRooms.map(newRoom => {
				if (newRoom.id === roomID) {
					newRoom.child = newRoom.child + 1;
				}
			});
		setRooms(newRooms);
	};

	return (
		<form onSubmit={handleSubmit(Submit)} className='room_details'>
			<select
				className='select_field'
				{...register("country")}
				onChange={handleChange}
			>
				{countries &&
					countries.map(country => {
						return (
							<option
								className='show_option'
								value={country.name}
								key={country.name}
							>
								{country.name}
							</option>
						);
					})}
			</select>
			<Controller
				control={control}
				name='date'
				render={({field}) => (
					<DateRangePicker
						placeholderText='Select date'
						onChange={date => field.onChange(date)}
						value={field.value}
						minDate={new Date()}
					/>
				)}
			/>
			<div className='room_adult_child'>
				{rooms.map(room => (
					<div key={room.ref_id} className='underline'>
						<h3>Room {room.id}</h3>
						<div className='adult'>
							<button onClick={e => handleSubAdult(room.id, e)}>-</button>
							<p>Adult: {room.adult}</p>
							<button onClick={e => handleAddAdult(room.id, e)}>+</button>
						</div>
						<div className='child'>
							<button onClick={e => handleSubChild(room.id, e)}>-</button>
							<p>Child: {room.child}</p>
							<button onClick={e => handleAddChild(room.id, e)}>+</button>
						</div>
						<button onClick={e => SubRoom(room.id, e)} className='remove_room'>
							Remove Room
						</button>
					</div>
				))}
			</div>
			<button onClick={e => AddRoom(e)}>Add Room</button>

			<button type='submit' className='final_button'>
				Submit
			</button>
		</form>
	);
}
export default Room
