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
    const [rooms, setRooms] = useState(null);
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(1);
    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm();
    const arr= [1]
    
    const Submit = data => {
            axios.post("http://localhost:8080/room", data);
            console.log(data);
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

    const handleSubAdult = (e) =>
    {
        e.preventDefault()
        setAdult(adult-1)
    }
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
            {arr.map((a) => (
			<div key={a} className='room_adult_child'>
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
            ))}

			<button type='submit' className='final_button'>
				Submit
			</button>
		</form>
	);
}
export default Room
