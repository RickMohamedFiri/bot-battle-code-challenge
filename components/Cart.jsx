import styles from '../styles/Home.module.css';

const Cart = ({cartList, removeitem}) => {



    return ( 
        <>
        <div className={styles.cart}>
                
                <div className={styles.cartList}>
                    {cartList.length >  0 ?  cartList.map((bot, i)=>{
                        return (
                            <button className={styles.li} key={i}
                                onClick={()=>{removeitem(i)}}>
                                <img className={styles.botImg}src={bot.avatar_url} alt="" />
                                {bot.name} 
                                <p className={styles.catchphrase}>{bot.catchphrase}</p>
                                <div className={styles.botdetails}>
                                    <p>health: {bot.health}</p>
                                    <p>armor: {bot.armor}</p>
                                    <p>Health: {bot.health}</p>
                                </div>
                            </button>
                            
                        )
                    })
                    :<h2 className={styles.carth2}>No robots selected</h2>

                    }
                </div>
                
            </div>
        </>
     );
}
 
export default Cart;