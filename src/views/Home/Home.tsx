import { useEffect, useState } from 'react';
import { random } from '../../api';
import Confetti from 'react-confetti';
import Pokedex from '../../../assets/PokedexNG.png';
import styles from './Home.module.css';

export const Home = () =>
{
    const [ pokemon, setPokemon ] = useState( { id: 0, name: '', image: '' } );
    const [ name, setName ] = useState( '' );
    const [ show, setShow ] = useState( false );
    const [ again, setAgain ] = useState( false );

    useEffect( ()=>
    {
        random().then( ( data ) =>
        {
            setPokemon( data );
        } )
        .catch( ( error ) =>
        {
            console.log("Error cargando pokemon: ", error);
        })
    }, [])

    useEffect( () =>
    {
        random().then( ( data ) =>
            {
                setPokemon( data );
            } )
            .catch( ( error ) =>
            {
                console.log("Error cargando pokemon: ", error);
            })
    },[again])

    const compare = ( correct: string, sent: string ) =>
    {
        if(correct == sent)
        {
            setShow(true);
            alert('Correct!');
        }
        correct != sent && alert('Try again :D');
    }

    return(
        <main>

            {show && <Confetti numberOfPieces={250} gravity={2.1} recycle={false} />}

            <div className={styles.pokedex}>
                <img src={Pokedex}/>
                <img src={pokemon.image} className={ show ? styles.pokemon : styles.blockedImage }/>

                {!show && <input className={styles.text} onChange={(e) => setName(e.target.value)} value={name}   />}
                {show && <input disabled className={styles.disabledText} value={name} />}
                <button
                className={styles.button} onClick={() => compare( pokemon.name, name.toLowerCase() )}> Send! </button>
                { show && <button className={styles.button} onClick={() => { setShow(false); setAgain(!again); setName(''); } }> AGAIN! </button>}
            </div>
            
                <button className={styles.this} onClick={()=> alert(`Shh, truquito: ${pokemon.name}`)}> ShowMe </button>

        </main>
    )
}