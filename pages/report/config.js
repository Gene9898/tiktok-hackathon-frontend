// import SockJsClient from "react-stomp";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
let stompClient;

import { useSelector } from "react-redux";
import { getToken } from "@/store/slices/tokenSlice";



export default function SockConfig() {
    const token = useSelector(getToken);

    const [message, setMessage] = useState("You server message here.");


    const connect = async () => {
        var sock = new SockJS("http://localhost:8082/ws?token=" + token);
        stompClient = Stomp.over(sock);
        sock.onopen = function () {
            console.log("open");
        };
        stompClient.connect({}, function (frame) {
            console.log("Connected: " + frame);
            setTimeout(function() {
                //your code here
               }, 2000);
            stompClient.subscribe("/topic/banks", function (greeting) {
                console.log("received",greeting);
                setMessage(greeting.body);
            });
        });
    }

    
    
    useEffect(() => {
        if (token){
            connect()
        }
    },[token])

    return (
        <div>
            <div>{message}</div>
            <button
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg sm:text-lg text-xs font-semibold transition duration-300 ease-in-out"
                onClick={() => {
                    console.log(token)
                    stompClient.send(
                        "/app/report",
                        {},
                        JSON.stringify({
                            token: token,
                            bank: "{}",
                            description: "Help me",
                        })
                    );
                }}
            >
                Submit Report
            </button>
        </div>
    );
}
