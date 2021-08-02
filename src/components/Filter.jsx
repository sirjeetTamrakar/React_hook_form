import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = () =>
{
    const [items, setItems] = useState('')
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('')
    const [price, setPrice] = useState('')
    const [order, setOrder] = useState('')
    const [range, setRange] = useState(0)
    const uniqueTags = []

    const fetchData = async () =>
    {
        // const {data} = await axios.get('http://localhost:8080/products')
        const {data} = await axios.get('https://fakestoreapi.com/products')
        setItems(data)
    }

    const handleSelect = (e) => { setSelect(e.target.value) }
    const handlePrice = (e) => { setPrice(e.target.value) }
    const handleOrder = (e) => { setOrder(e.target.value) }
    const handleRange = (e) => { setRange(e.target.value) }

    const sorting = items && items.sort((a, b) =>
    {
        if (order === 'Low to High') { return  a.price - b.price }
        else if (order === 'High to Low') { return b.price - a.price }
        else if (order === 'A-Z' && (a.title < b.title) )
            return -1
        else if (order === 'Z-A' && (a.title > b.title) )
            return -1
        else if(order === '') {return a.id - b.id}
    })

    const filterByCategory = items && items.filter((item) =>
    {
        {
            if (select === '')
            { return item }
            else if (item.category.toLowerCase() === select.toLowerCase())
            { return item }
        }
    })

    const clearFilters = () =>
    {
        setSearch('')
        setSelect('')
        setPrice('')
        setOrder('')
        setRange(0)
    }
    useEffect(() =>
    {
        fetchData()
    }, [])


    return (
        <div className='filter_div'>
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
            <input type='text' style={{fontSize:'1rem'}} placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
            {items && 
                items.map(item => {
                    if (uniqueTags.indexOf(item.category) === -1) {
                        uniqueTags.push(item.category)
                    }
                })
            }
            <select value={select} onChange={handleSelect} style={{fontSize:'1rem', padding:'.11rem'}}>
                <option value='' defaultChecked>Category</option>
                {uniqueTags && uniqueTags.map(item => { return <option key={item} value={item.toUpperCase()} >{item.charAt(0).toUpperCase()+item.slice(1)}</option> })}
            </select>
            <select value={price} onChange={handlePrice} style={{fontSize:'1rem', padding:'.11rem'}}>
                <option value='' defaultChecked>Sort by Price</option>
                <option value='$0 - $100' >$0 - $100</option>
                <option value='$100 - $300'>$100 - $300</option>
                <option value='>$300'>&gt;$300</option>
            </select>
            <select value={order} onChange={handleOrder} style={{fontSize:'1rem', padding:'.11rem'}}>
                <option value='' defaultChecked>Price</option>
                <option value='Low to High' >Low to High</option>
                <option value='High to Low'>High to Low</option>
                <option value='A-Z' >A-Z</option>
                <option value='Z-A'>Z-A</option>
                </select>
                <div>
                    <input type='range' name='range' value={range} onChange={e => setRange(e.target.value)} min='10' max='1000' />
                    <label htmlFor='range'>${range}</label>
                </div>
            <button type='button' onClick={() => clearFilters()} style={{fontSize:'1rem', padding:'.11rem'}}>Reset</button></div>
            <div className='selectors'>
                {select.length ? <div onClick={() => setSelect('')} title='Remove'> {select} </div> : null}
                {price.length ? <div onClick={() => setPrice('')} title='Remove'> {price} </div> : null}
                {order.length ? <div onClick={() => setOrder('')} title='Remove'> {order} </div> : null}
                {range>10 ? <div onClick={() => setRange(0)} title='Remove'> &lt; ${range} </div> : null }
                </div>
            
            <div className='products'>
            {items ? 
                sorting.filter(item =>
                { if (search === '') { return item } else if (item.title.toLowerCase().includes(search.toLowerCase())) { return item } }).filter(item =>
                { if (select === '') { return item } else if (item.category.toLowerCase() === select.toLowerCase()) { return item } }).filter(item =>
                { if (range === 0) { return item } else if (item.price < range) { return item } }).filter(item =>
                {
                    if (price === '') { return item }
                    else if (price === '$0 - $100' && item.price < 100) { return item }
                    else if (price === '$100 - $300' && item.price > 100 && item.price < 300) { return item }
                    else if (price === '>$300' && item.price > 300) { return item }
                })
                .map(item =>
                (
                    
                        <div key={item.id} style={{ borderBottom: '2px solid slateblue' }}>
                            <img src={item.image} style={{ height: '7rem', width: '7rem', margin:'2rem 0' }} alt={item.name} />
                            <h2>{item.title}</h2>
                            <h4>{item.category.charAt(0).toUpperCase()+item.category.slice(1)}</h4>
                            <h2>Price: ${item.price}</h2>
                        </div>
                    
                ))
                : <h1>Loading...</h1>
            }</div>
        </div>
    )
}

export default Filter
