import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <h2>Art gallery</h2>
            <div className={styles.headerRight}>
                <div className={styles.switch}>
                    <label htmlFor="favorite">Show only favorite</label>
                    <input id="favorite" type="checkbox" className="switch"></input>
                </div>
                <input className={styles.input} placeholder="Search for picture..." />
            </div>
        </header>
    )
}

export default Header
