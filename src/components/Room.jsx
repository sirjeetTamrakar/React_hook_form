import React, {useState, useEffect, useRef} from "react";
import {Controller, useForm, useFieldArray} from "react-hook-form";
import axios from "axios";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const Room = () => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const [countries, setCountries] = useState(null)
	const [selected, setSelected] = useState('')
	const [search, setSearch] = useState('')
	const [show, setShow] = useState(false)
	const [toggle, setToggle] = useState(false)
	const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();

	const showRef = useRef()
	
	const {fields, append, remove} = useFieldArray({
		control,
		name: "rooms",
	});

	 useEffect(() => {
		const checkIfClickedOutside = e => {
			if (show && showRef.current && !showRef.current.contains(e.target)) {
				setShow(false)
			}
			}
				document.addEventListener("mousedown", checkIfClickedOutside)
			return () => {
				document.removeEventListener("mousedown", checkIfClickedOutside)
			}
	 }, [show])
	
	
    const Submit = data => {
            axios.post("http://localhost:8080/room", data);
            console.log(data);
			reset();
	};
	

    useEffect(() => {
			axios.get("http://localhost:8080/countries")
				.then(res => setCountries(res.data));
	}, []);
    
    const handleCountryChange = (country) =>
    {
        setSearch(country)
	}
	return (
		<form ref={showRef} onSubmit={handleSubmit(Submit)} className='room_details' >

			<input
				className='select_field'
				type='text'
				onChange={e => (setSearch(e.target.value), setValue("country", e.target.value))}
				placeholder='Search...'
				value={search}
				name='country'
				autoComplete='off'
			/>
			<div className='countries'>
				{countries &&
					countries
						.filter(country => {
							if (search === "") {
								return null;
							} else if (
								country.name.toLowerCase().includes(search.toLowerCase())
							) {
								return country;
							}
						})
						.map(country => {
							return (
								<div className='show_option' key={country.name} onClick={() => (handleCountryChange(country.name), setValue('country',country.name))} >
									{country.name}
								</div>
							);
						})}
			</div>
			<Controller control={control} name='date' defaultValue={new Date()} render={({ field }) => (<DateRangePicker placeholderText='Select date' onChange={date => field.onChange(date)} value={field.value} minDate={new Date()} className='date' /> )} />
			<button type='button' onClick={() => setShow(!show)}>{show?`Hide`:`Show`} Rooms</button>

			{show ? (
				<>
					{fields.map((field, index) => (
						<div key={field.id} className='main_Container'>
							<div className='container'>
								<label htmlFor='adult' name='adult'>
									Adult:
								</label>
								<input className='number_input' type='number' {...register(`rooms[${index}].adult`, {valueAsNumber: true})} defaultValue={1} />
							</div>
							<div className='container'>
								<label htmlFor='child' name='child'>
									Child:
								</label>
								<input className='number_input' type='number' {...register(`rooms[${index}].child`, {valueAsNumber: true})} defaultValue={1} />
							</div>
							<button type='button' className='remove_room' onClick={() => remove(index)} > Remove Room </button>
						</div>
					))}
					<button type='button' onClick={() => append({})} className='add_room'> Add Room </button>
				</>
			) : null}
			<button type='submit' className='final_button'> Submit </button>
		</form>
	);
}
export default Room
