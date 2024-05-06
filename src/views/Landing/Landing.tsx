import { Link } from "react-router-dom";

export const Landing = () =>
{

    return(
        <main>
            <div>
                Let's guess a few Pokémon!
            </div>
            <Link to='/home'>
                <button> GO! </button>
            </Link>
        </main>
    )
}