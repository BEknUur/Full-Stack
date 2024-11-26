import socket
import ipaddress

def is_ip_allowed(client_ip):
    allowed_network = ipaddress.ip_network('192.168.0.0/24', strict=False)  
    return ipaddress.ip_address(client_ip) in allowed_network

def start_server(host='127.0.0.1', port=12345):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen(1)
    print(f"Сервер слушает на {host}:{port}")
    
    while True:
        client_socket, address = server_socket.accept()
        print(f"Подключение от {address}")
        
        client_ip = address[0]
        if not is_ip_allowed(client_ip):
            print(f"Подключение отклонено для IP {client_ip}")
            client_socket.sendall(b"Access denied.")
            client_socket.close()
            continue

        while True:
            message = client_socket.recv(1024).decode('utf-8')
            if not message:
                break 

            print(f"Получено сообщение: {message}")

            if message == "Hello":
                response = "Welcome, user!"
            else:
                response = "Unknown message."
            
            client_socket.sendall(response.encode('utf-8'))

            if message.lower() == "exit":
                print("Клиент завершил соединение.")
                break

        client_socket.close()

if __name__ == "__main__":
    start_server()