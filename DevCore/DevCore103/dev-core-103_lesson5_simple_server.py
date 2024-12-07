import socket
def check_port(ip,port,filename):
    sock=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    sock.settimeout(1)
    try:
          result=sock.connect_ex((ip,port))
          if result == 0:
                status = f"Port {port} on {ip} is open\n"
          else:
                status = f"Port {port} on {ip} is closed\n"
    except Exception as e:
          status = f"Error checking port {port} on {ip}: {e}\n"
    finally:
         sock.close()

    with open(filename,'a') as file:
        file.write(status)

filename='dev-core-103_lesson5_port_check.txt'

check_port('127.0.0.1',22,filename)
check_port('127.0.0.1',80,filename)
check_port('127.0.0.1',3306,filename)
