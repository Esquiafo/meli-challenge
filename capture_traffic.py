# This import is necessary to handle DB connection Postgres
import psycopg2
# The package recommended for reading packets
from scapy.all import sniff, IP

# DB Connection
conn = psycopg2.connect(
    dbname='my_database',
    user='postgres',
    password='mysecretpassword',
    host='localhost',
    port='5432'
)
cursor = conn.cursor()


# Function to save values in DB
def process_packet(packet):
    
    # Validate if IP exist in packet
    if IP in packet:
        origin_ip = packet[IP].src
        dst_ip = packet[IP].dst
        protocol = packet[IP].proto

        # Validate if any of these local IPs exist; if matched, do nothing and exit the function
        if origin_ip in ('192.168.0.62', '127.0.0.1', '192.168.0.1', '192.168.0.255') and dst_ip in ('127.0.0.1', '192.168.0.62', '192.168.0.255', '192.168.0.1'):
            return

        # Build an object to save it into DB
        payload = {
            'protocol': protocol,
            'source_ip': origin_ip,
            'destination_ip': dst_ip
        }

        # Create Query that matchs table in DB
        insert_query = '''
        INSERT INTO packets (protocol, source_ip, destination_ip)
        VALUES (%s, %s, %s);
        '''

        # Inject query with values into DB
        cursor.execute(insert_query, (payload['protocol'], payload['source_ip'], payload['destination_ip']))
        conn.commit()

        # Print in console the new obj that is saved in DB
        print(f"Packet data inserted successfully: {payload}")

# Start capturing
sniff(iface="lo", prn=process_packet, store=0)

