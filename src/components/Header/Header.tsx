//Imports

//Components
import MenuMobile from "./components/MenuMobile";

export default function Header() {
    return (
        <header className="max-w-7xl mx-auto h-32 px-8 bg-blue-500 flex justify-between items-center">
            <h1 className="text-3xl text-white font-extrabold shadow-xl tracking-widest">
                NextZoddCode
            </h1>

            <MenuMobile />

            <div className="hidden lg:flex lg:gap-4">
                <span className="text-white text-xl">Usuário</span>
                <button className="text-white text-xl">Sair</button>
            </div>
        </header>
    );
}
