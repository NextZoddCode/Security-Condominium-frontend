//Components
import DivItem from "./DivItem";
import LinkItem from "./LinkItem";
import MenuIcon from "./MenuIcon";
import MenuTitle from "./MenuTitle";
import { FaUser, FaBox, FaClock } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";
import { RiMenu3Fill } from "react-icons/ri";
import { IoDocumentTextSharp } from "react-icons/io5";

//Shadcn-ui imports
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet";
import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
} from "../../ui/accordion";

export default function MenuMobile() {
    return (
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild className="border-4 border-white">
                    <div
                        style={{
                            boxShadow: "2px 3px 30px white",
                        }}
                        className="border-2 border-white rounded drop-shadow-2xl"
                    >
                        <MenuIcon
                            icon={RiMenu3Fill}
                            className="cursor-pointer size-9 text-white border-2 border-violet-500 rounded bg-violet-500"
                        />
                    </div>
                </SheetTrigger>
                <SheetContent className="bg-white">
                    <SheetHeader className="mb-10">
                        <SheetTitle className="text-violet-500 font-bold text-2xl">
                            Menu
                        </SheetTitle>
                    </SheetHeader>
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
                                    <LinkItem href="/packages/register">
                                        Adicionar Encomenda
                                    </LinkItem>
                                    <LinkItem href="/packages">
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
                                    <LinkItem href="/losts/register">
                                        Adicionar Objeto
                                    </LinkItem>
                                    <LinkItem href="/losts">
                                        Buscar Objeto
                                    </LinkItem>
                                </DivItem>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-violet-500 px-4 bg-zinc-100">
                                <MenuIcon icon={FaClock} />
                                <MenuTitle>Agendar horários</MenuTitle>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                <DivItem>
                                    <LinkItem href="/schedule">
                                        Agendar
                                    </LinkItem>
                                    <LinkItem href="/schedule/search">
                                        Buscar
                                    </LinkItem>
                                </DivItem>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger className="text-violet-500 px-4 bg-zinc-100">
                                <MenuIcon icon={IoDocumentTextSharp} />
                                <MenuTitle>Relatórios</MenuTitle>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                <DivItem>
                                    <LinkItem href="/reports">
                                        Buscar relatórios
                                    </LinkItem>
                                </DivItem>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SheetContent>
            </Sheet>
        </div>
    );
}
