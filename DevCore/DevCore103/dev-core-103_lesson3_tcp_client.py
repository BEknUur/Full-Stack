import socket

def start_client(host='127.0.0.1', port=12345):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))
    print(f"Подключено к серверу {host}:{port}")

    while True:
        message = input("Введите сообщение (или 'exit' для завершения): ")

        client_socket.sendall(message.encode('utf-8'))

        data = client_socket.recv(1024)
        print(f"Ответ от сервера: {data.decode('utf-8')}")

        if message.lower() == "exit":
            break

    client_socket.close()

if __name__ == "__main__":
    start_client()