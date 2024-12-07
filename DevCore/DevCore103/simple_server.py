import socket

def start_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_socket.bind(('0.0.0.0', 8080))
    server_socket.listen(5)
    print("Server is running on port 8080...")
    while True:
        client_socket, client_address = server_socket.accept()
        print(f"Connection from {client_address} received")
        request = client_socket.recv(1024).decode('utf-8')
        print(f"Request received:\n{request}")
        response = (
            "HTTP/1.1 200 OK\r\n"
            "Content-Type: text/plain\r\n"
            "Content-Length: 13\r\n"
            "Connection: close\r\n"
            "\r\n"
            "Hello, World!"
        )
        client_socket.sendall(response.encode('utf-8'))
        client_socket.close()

        
if __name__ == "__main__":
    start_server()
