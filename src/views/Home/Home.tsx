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
    const [ wrong, setWrong ] = useState( 0 );
    const [ correct, setCorrect ] = useState( 0 );

    useEffect( ()=>
    {
        //Fetch a random new pokémon
        random().then( ( data ) =>
        {
            setPokemon( data );
        } )
        .catch( ( error ) =>
        {
            console.log("Error cargando pokemon: ", error);
        })
        //Create local persist high score
        localStorage.getItem('Correct answers')==null && localStorage.setItem( 'Correct answers', JSON.stringify(0) );
        localStorage.getItem('Wrong answers')==null && localStorage.setItem( 'Wrong answers', JSON.stringify(0) );
        //Set local counter
        setCorrect(Number(localStorage.getItem('Correct answers')));
        setWrong(Number(localStorage.getItem('Wrong answers')));
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
                let previous: number = parseInt( localStorage.getItem('Correct answers') || '0' );
                localStorage.setItem('Correct answers', JSON.stringify(previous + 1) );
                setCorrect(Number(localStorage.getItem('Correct answers')));
                alert('Correct!');
            }
            else
            {
                setShow(false);
                let previous: number = parseInt( localStorage.getItem('Wrong answers') || '0' );
                localStorage.setItem('Wrong answers', JSON.stringify(previous + 1) );
                setWrong(Number(localStorage.getItem('Wrong answers')));
            alert('Try again! ♪');
        }
    }

    const restartScore = () =>
    {
        localStorage.setItem('Correct answers', JSON.stringify(0));
        localStorage.setItem('Wrong answers', JSON.stringify(0));
        setCorrect( 0 );
        setWrong( 0 );
    }

    return(
        <main>

            {show && <Confetti numberOfPieces={250} gravity={2.1} recycle={false} />}

            <div className={styles.pokedex}>

                <img src={Pokedex} />
                <img src={pokemon.image} className={ show ? styles.pokemon : styles.blockedImage }/>

                {!show && <input className={styles.text} onChange={(e) => setName(e.target.value)} value={name}   />}
                {show && <input disabled className={styles.disabledText} value={name} />}
                <button
                className={styles.button} onClick={() => compare( pokemon.name, name.toLowerCase() )}> Send! </button>
                { show && <button className={styles.button} onClick={() => { setShow(false); setAgain(!again); setName(''); } }> AGAIN! </button>}

                <p className={styles.correct}> Correct answers </p>
                <h4 className={styles.correctNumber}> {correct} </h4>

                <button className={styles.restart} onClick={ restartScore }> RESTART </button>

                <p className={styles.wrong}> Wrong answers </p>
                <h4 className={styles.wrongNumber}> {wrong} </h4>

            </div>
            
                <button className={styles.cheat} onClick={()=> alert(`Shh, truquito: ${pokemon.name}`)}> Hidden cheat </button>

        </main>
    )
}