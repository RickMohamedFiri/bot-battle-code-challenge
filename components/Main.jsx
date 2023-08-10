import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import Cart from './Cart';

const Main = () => {
    let [itemList, setItemList] = useState([]);
    let [cartList, setCartList] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    
    const fetchTodos = () => {
        fetch('http://localhost:5500/bots')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setItemList(data))
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }

    const addBot = (id, itemName, avatar_url, catchphrase, health, armor, damage) => {
        // Check if the item is already in the cartList by its ID
        const isItemInCart = cartList.some(item => item.id === id);

        // If the item is not already in the cartList, add it
        if (!isItemInCart) {
            const itemData = {
                id: id,
                name: itemName,
                avatar_url: avatar_url,
                catchphrase: catchphrase,
                health: health,
                armor: armor,
                damage: damage,
            };
            setCartList(prevCartList => [...prevCartList, itemData]);
        }
    }

    const removeitem = (whichItem) => {
        let tempCart = cartList.filter((item, index) => index !== whichItem);
        setCartList(tempCart);
    }

    return (
        <>
            <div className={styles.main}>
            <Cart cartList={cartList} removeitem={removeitem} />
                <div className={styles.items}>
                    <div className={styles.list}>
                        {itemList.length > 0 ? itemList.map((bot, i) => (
                            <button className={styles.li} key={i}
                                onClick={() => addBot(bot.id, bot.name, bot.avatar_url, bot.catchphrase, bot.health, bot.armor, bot.damage)}>
                                <img className={styles.botImg}src={bot.avatar_url} alt="" />
                                {bot.name} 
                                <p className={styles.catchphrase}>{bot.catchphrase}</p>
                                <div className={styles.botdetails}>
                                    <p>health: {bot.health}</p>
                                    <p>amor: {bot.armor}</p>
                                    <p>damage: {bot.damage}</p>
                                </div>
                            </button>
                        )) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
