import React, {useState, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const Room = () => {
    const [value, onChange] = useState([new Date().getHours(), new Date().toLocaleDateString()]);
    const [countries, setCountries] = useState(null)
    const [selected, setSelected] = useState('')
    const { register, handleSubmit, formState: { errors }, reset, control} = useForm();
    
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
					/>
				)}
			/>
			<button type='submit' className='final_button'>
				Submit
			</button>
		</form>
	);
}
export default Room
