"use client"

import { useEffect, useState } from "react"

type WebSocketMessage = {
  type: string
  data: any
}

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const [error, setError] = useState<Event | null>(null)

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket(url)

    // Connection opened
    ws.addEventListener("open", () => {
      setIsConnected(true)
      setError(null)
    })

    // Listen for messages
    ws.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data)
        setLastMessage(message)
      } catch (err) {
        console.error("Error parsing WebSocket message:", err)
      }
    })

    // Listen for errors
    ws.addEventListener("error", (event) => {
      setError(event)
      setIsConnected(false)
    })

    // Connection closed
    ws.addEventListener("close", () => {
      setIsConnected(false)
    })

    setSocket(ws)

    // Clean up on unmount
    return () => {
      ws.close()
    }
  }, [url])

  // Function to send messages
  const sendMessage = (message: WebSocketMessage) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message))
    }
  }

  return { isConnected, lastMessage, error, sendMessage }
}

