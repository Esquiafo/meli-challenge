# This import is necessary to handle DB connection Postgres
import psycopg2
# The package recommended for reading packets
from scapy.all import sniff, IP

# DB Connection
conn = psycopg2.connect(
    dbname='my_database',
    user='postgres',
    password='mysecretpassword',
    host='meli-db',
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
        size = packet.sprintf("%IP.len%")

        # Define IPs to filter out
        local_ips = ('172.18.0.1', '172.18.0.2')

        # Validate if any of these local IPs exist; if matched, do nothing and exit the function
        if origin_ip in local_ips or dst_ip in local_ips:
            return

        # Create Query that matches table in DB
        insert_query = '''
        INSERT INTO packets (protocol, source_ip, destination_ip, size)
        VALUES (%s, %s, %s, %s);
        '''

        # Inject query with values into DB
        cursor.execute(insert_query, (protocol, origin_ip, dst_ip, size))
        conn.commit()

# Start capturing on the specified interface (eth0 in this case)
sniff(iface="eth0", prn=process_packet, store=0)
