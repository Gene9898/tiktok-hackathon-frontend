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
            stompClient.subscribe("/topic/private", function (greeting) {
                console.log("received",greeting);
                setMessage(greeting.body);
            });
        });
    }

    
    
    useEffect(() => {
        connect()
    },[token])

    return (
        <div>
            <div>{message}</div>
            <button
                onClick={() => {
                    console.log(token)
                    console.log("checking",token)
                    stompClient.send(
                        "/app/sendMessage/" + token,
                        {},
                        "testingtesting123"
                    );
                }}
            >
                Send report
            </button>
        </div>
    );
}
