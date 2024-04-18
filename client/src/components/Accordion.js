import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { useUpdate } from "../utils/Context";
import axios from "axios";
import { Buffer } from "buffer";
import Popup from "reactjs-popup";
import AddMembers from "./AddMembers";
import noImg from "../assets/noImg.png"

const Accordion = ({ title, data, boardId, type }) => {
    const [accordionOpen, setAccordionOpen] = useState(false)
    var name = ""
    var cover = ""
    var image = ""


    return (
        <div className="py-2">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between w-full"
            >
                <span>{title}</span>
                <svg
                className="fill-gray-800 shrink-0 self-center justify-center"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                >
                <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center transition duration-200 ease-out ${
                    accordionOpen && "!rotate-180"
                    }`}
                />
                <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                    accordionOpen && "!rotate-180"
                    }`}
                />
                </svg>
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                accordionOpen
                    ? "grid-rows-[1fr] opacity-100 h-content"
                    : "grid-rows-[0fr] opacity-0 h-1"
                }`}
            >
                <div>
                    {Object.keys(data).map((i, j) => {
                        if (data[i].cover !== undefined) {
                            cover = Buffer.from(data[i].cover.data.data, "binary").toString('base64')
                        }
                        else {
                                if (data[i]["image"] !== undefined) {
                                    image = data[i]["image"]
                                }
                                else {
                                    image = noImg
                                }
                        }
                        if (data[i]["title"] !== undefined) {
                            name = data[i]["title"]
                        }
                        else {
                            name = data[i]["firstName"] + " " + data[i]["lastName"]
                        }
                        let id = data[i]._id
                        return (
                            <div className="mt-2 overflow-hidden w-full flex justify-start" key={j}>
                                {
                                    cover
                                    ? <img src={"data:image/jpg;base64,"+cover} className="h-8 w-8 self-center justify-center"/>
                                    : <img src={image} className="h-8 w-8 self-center justify-center"/>
                                } 
                                <a href={`/board/${id}`} className="p-3 ml-2 justify-center self-center">{name}</a>
                            </div>
                        )
                    })}
                </div>
                {/* {!cover &&
                    <div>
                        <Popup 
                            contentStyle={{width: "50%", position: "absolute", marginTop: "-20%",marginLeft: "50%", justifySelf: "center", alignContent: "center", height: "fit-content", opacity: "90%"}}
                            trigger={<span><button className='ml-2 text-center text-sm leading-9 tracking-tight text-gray-800 hover:text-orange-400 self-center justify-center'>Add {title}</button></span>} 
                            position="center-right"
                            >
                            <AddMembers boardId={boardId}/>
                        </Popup>
                    </div>
                } */}
            </div>
        </div>
    );
};

export default Accordion;