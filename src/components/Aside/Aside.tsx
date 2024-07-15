//Imports

//Components
import MenuIcon from "../Header/components/MenuIcon";
import MenuTitle from "../Header/components/MenuTitle";
import LinkItem from "../Header/components/LinkItem";
import DivItem from "../Header/components/DivItem";
import { FaUser, FaBox } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";

//Shadc-ui
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

export default function Aside() {
    return (
        <aside className="hidden lg:flex flex-col gap-8 w-1/5 border-4 border-violet-700 ">
            <div className="text-center mt-4">
                <span className="text-2xl text-violet-500 tracking-widest font-bold">
                    Menu
                </span>
            </div>
            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-violet-500 px-4 bg-zinc-100">
                            <MenuIcon icon={FaUser} />
                            <MenuTitle>Usuários</MenuTitle>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <DivItem>
                                <LinkItem href="/users/search">
                                    Buscar Usuários
                                </LinkItem>
                                <LinkItem href="/users/register">
                                    Adicionar Usuários
                                </LinkItem>
                                <LinkItem href="/users/visitor">
                                    Registrar Visitante
                                </LinkItem>
                            </DivItem>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-violet-500 px-4 bg-zinc-100">
                            <MenuIcon icon={FaBox} />
                            <MenuTitle>Encomendas</MenuTitle>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <DivItem>
                                <LinkItem href="/encomendas/register">
                                    Adicionar Encomenda
                                </LinkItem>
                                <LinkItem href="/encomendas/search">
                                    Buscar Encomenda
                                </LinkItem>
                            </DivItem>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-violet-500 px-4 bg-zinc-100">
                            <MenuIcon icon={BsBoxSeamFill} />
                            <MenuTitle>Achados e Perdidos</MenuTitle>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <DivItem>
                                <LinkItem href="/encomendas/register">
                                    Adicionar Objeto
                                </LinkItem>
                                <LinkItem href="/encomendas/search">
                                    Buscar Objeto
                                </LinkItem>
                            </DivItem>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </aside>
    );
}
